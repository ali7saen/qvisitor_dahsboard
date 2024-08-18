const Questions = require("../models/Questions");
const { getAllQuestionsTypes, check_if_data_valid, getAllQuestionsAgeGroups, createExcelFileToExport, extractDataFromExcelFile } = require("../services/questionsService")
const fs = require("fs");
const itemsPerPage = 8;
let dataObj = []
const {logError} = require("../utils/functions")

// api handlers
async function getLatestQuestionUpdate_get(req, res) {
    try {
        const questions = await Questions.find();
        res.status(200).json(questions);
    } catch (error) {
        logError(error, req)
        res.status(500).json({ error: "Internal Server Error" })
    }

}



// web handler
async function getQuestionPage_get(req, res) {
    try {
        const page = Number(req.query.page) || 1;

        const total_items = await Questions.countDocuments();

        const questions = await Questions.find().skip((page - 1) * itemsPerPage).limit(itemsPerPage).sort({ createdAt: "desc" });

        const view_data = {
            title: "لوحة التحكم",
            questions: questions,
            current_page: page,
            has_next_page: itemsPerPage * page < total_items,
            hasPrevPage: page > 1,
            nextPage: page + 1,
            prevPage: page - 1,
            lastPage: Math.ceil(total_items / itemsPerPage)
        }

        res.status(200).render("./index/get", view_data);
    } catch (error) {
        logError(error, req)
        res.status(500).json({ error: "Internal Server Error" })
    }
}

async function editQuestionPage_get(req, res) {
    const id = req.params.id;
    try {
        const question = await Questions.findById(id);
        const questionsTypes = await getAllQuestionsTypes();
        const questionsAgeGroups = await getAllQuestionsAgeGroups();

        const view_data = {
            question: question,
            questionsTypes: questionsTypes,
            questionsAgeGroups: questionsAgeGroups,
            title: "لوحة التحكم | تعديل سؤال"
        }
        res.render("./questions/edit", view_data)
    } catch (error) {
        logError(error, req)
        res.status(400).redirect("/questions")
    }
}

async function editQuestion_post(req, res) {
    const question = req.body;
    const id = req.params.id;
    try {
        await Questions.findByIdAndUpdate(id, question)
        res.status(200).json({})
    } catch (error) {
        logError(error, req)
        res.status(400).json({ message: error.message })
    }
}


async function addQuestionPage_get(req, res) {
    try {
        const questionsTypes = await getAllQuestionsTypes();
        const questionsAgeGroups = await getAllQuestionsAgeGroups();

        const view_data = {
            questionsTypes: questionsTypes,
            questionsAgeGroups: questionsAgeGroups,
            title: "لوحة التحكم | اضافة سؤال"
        }
        res.render("./questions/add", view_data)
    } catch (error) {
        logError(error, req)
        res.status(400).redirect("/questions")
    }
}

async function addQuestion_post(req, res) {
    const question = req.body;
    const error_box = []
    if (question.type == "default") {
        error_box.push("question type is required")
    } else if (question.age_group == "default") {
        error_box.push("age group type is required")
    }

    if (error_box.length == 0) {
        try {
            await Questions.create(question);
            res.status(200).json({})
        } catch (error) {
            logError(error, req)
            res.status(400).json({ message: error.message })
        }
    } else {
        res.status(400).json({ message: error_box[0] })
    }

}

async function deleteQuestion_get(req, res) {
    const id = req.params.id;
    try {
        await Questions.findByIdAndDelete(id);
        res.status(200).json({})
    } catch (error) {
        logError(error, req)
        res.status(400).json({ message: error.message })
    }
}


async function exportQuestion_post(req, res) {
    try {
        const questions = await Questions.find();
        const workbook = createExcelFileToExport(questions);

        // Set headers for the response to download the file
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=questions.xlsx');

        // Write to response
        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        logError(error, req)
        res.status(400).json({ message: error.message })
    }
}


async function searchForQuestion_post(req, res) {
    const token = req.body.token;
    const regex = new RegExp(token, 'i');
    try {
        const questions = await Questions.find({ question: { $regex: regex } }).limit(8);
        if (questions) {
            res.status(200).json(questions);
        } else {
            res.status(400).json({ message: "question not found" });
        }
    } catch (error) {
        logError(error, req)
        res.status(400).json({ message: error.message });
    }
}

async function getSearchPage_get(req, res) {
    try {
        const view_data = {
            title: "لوحة التحكم | البحث عن سؤال"
        }
        res.render("./questions/search", view_data)
    } catch (error) {
        logError(error, req)
        res.status(400).redirect("/questions")
    }
}



async function importQuestion_post(req, res) {
    const excel_file_path = req.body.excel_url;
    const data = await extractDataFromExcelFile(excel_file_path);

    const isDataValid = check_if_data_valid(data)
    if (isDataValid) {
        dataObj = data;
        fs.unlinkSync(excel_file_path)
        res.status(200).json(data);
    }
    else {
        res.status(400).json({ error: "عذرا هنالك مشكلة في تنسيق الملف، يرجى اتباع التنسيق المعتمد" });
    }
    
}


async function importQuestionPage_get(req, res) {
    try {
        const view_data = {
            title: "لوحة التحكم | اضافة ملف اسئلة "
        }
        res.render("./questions/import", view_data)
    } catch (error) {
        logError(error, req)
        res.status(400).redirect("/questions")
    }
}

async function SaveQuestionsData_get(req, res) {
    try {
        await Questions.deleteMany({});
        for (const data of dataObj) {

            if (data.choice_1 == "" || data.choice_1 == " " || data.choice_1 == "غير مرفوع") {
                data.choice_1 = null;
            }

            if (data.choice_2 == "" || data.choice_2 == " " || data.choice_2 == "غير مرفوع") {
                data.choice_2 = null;
            }

            if (data.choice_3 == "" || data.choice_3 == " " || data.choice_3 == "غير مرفوع") {
                data.choice_3 = null;
            }
            
        }
        await Questions.create(dataObj);
        dataObj = [];
        res.status(200).json({});
    } catch (error) {
        logError(error, req)
        res.status(400).json({ message: error.message });
    }
}

module.exports = {
    getLatestQuestionUpdate_get,
    getQuestionPage_get,
    editQuestionPage_get,
    editQuestion_post,
    addQuestionPage_get,
    addQuestion_post,
    deleteQuestion_get,
    exportQuestion_post,
    searchForQuestion_post,
    getSearchPage_get,
    importQuestionPage_get,
    importQuestion_post,
    SaveQuestionsData_get
}