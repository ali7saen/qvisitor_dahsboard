const Questions = require("../models/Questions");
const ExcelJS = require('exceljs');
const { arraysAreEqual } = require("../utils/functions")
const fs = require('fs');

async function getAllQuestionsTypes () {
    const questions = await Questions.find();

    const questionsTypes = []
    for (const question of questions) {
        if (!questionsTypes.includes(question.type)) {
            questionsTypes.push(question.type);
        }
    }

    return questionsTypes
}


async function getAllQuestionsAgeGroups () {
    const questions = await Questions.find();

    const questionsAgeGroup = []
    for (const question of questions) {
        if (!questionsAgeGroup.includes(question.age_group)) {
            questionsAgeGroup.push(question.age_group);
        }
    }

    return questionsAgeGroup
}


function createExcelFileToExport(data) {
    // Create a new workbook and a worksheet
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Questions');

    // Add columns to the worksheet
    worksheet.columns = [
        { header: 'question', key: 'question', width: 50 },
        { header: 'choice_1', key: 'choice_1', width: 30 },
        { header: 'choice_2', key: 'choice_2', width: 30 },
        { header: 'choice_3', key: 'choice_3', width: 30 },
        { header: 'type', key: 'type', width: 20 },
        { header: 'age_group', key: 'age_group', width: 10 },
    ];

    // Add rows to the worksheet from JSON data
    data.forEach(item => {
        worksheet.addRow(item);
    });
    return workbook;
}


async function extractDataFromExcelFile (filePath) {
    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1); 
    const rows = [];

    worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) {
            // Skip the header row
            return;
        }

        const rowData = {};
        worksheet.getRow(1).eachCell((cell, colNumber) => {
            rowData[cell.value] = row.getCell(colNumber).value;
        });

        rows.push(rowData);
    });

    return rows;
}


function check_if_data_valid(data) {
    // check if columns its correct
    let isDataValid = true;
    const standardKeys = ["question", "choice_1", "choice_2", "choice_3", "type", "age_group"]
    for (const row of data) {
        const rowKeys = Object.keys(row);
        if(!arraysAreEqual(rowKeys, standardKeys)) 
            isDataValid = false
    }

    return isDataValid;
}
module.exports = {
    getAllQuestionsTypes,
    getAllQuestionsAgeGroups,
    createExcelFileToExport,
    extractDataFromExcelFile,
    check_if_data_valid
}