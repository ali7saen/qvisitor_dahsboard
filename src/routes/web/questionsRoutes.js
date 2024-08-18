const router = require("express").Router();
const {getQuestionPage_get,SaveQuestionsData_get,exportQuestion_post,importQuestion_post, importQuestionPage_get ,getSearchPage_get ,searchForQuestion_post, deleteQuestion_get ,addQuestion_post, addQuestionPage_get, editQuestionPage_get, editQuestion_post} = require("../../controllers/questionsController")
const {uploadExcel} = require("../../services/multerService")
const {validateExcelFile} = require("../../middlewares/multerMiddlewares")
router.get("/", getQuestionPage_get)

router.get("/edit/:id", editQuestionPage_get)
router.post("/edit/:id", editQuestion_post)
router.get("/add", addQuestionPage_get)
router.get("/delete/:id", deleteQuestion_get)
router.post("/add", addQuestion_post)
router.post("/search", searchForQuestion_post)
router.get("/search", getSearchPage_get)

router.get("/export/", exportQuestion_post)

router.get("/import", importQuestionPage_get)
router.post("/import" ,uploadExcel.single("excel_file"), validateExcelFile, importQuestion_post)
router.get("/import/save-data" , SaveQuestionsData_get)


module.exports = router;
