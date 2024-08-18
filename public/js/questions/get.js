let question_id_to_delete = "";
const box_error = document.getElementById("box-error");
const spinner = document.getElementById("spinner");
console.log(spinner);

function setQuestionIdToDelete(question_id) {
    question_id_to_delete = question_id;
}

function deleteThisQuestion() {
    spinner.classList.remove("hide");

    fetch(`/questions/delete/${question_id_to_delete}`, {
        method: "GET"
    }).then((response) => response.json())
        .then(res => {
            if (res.message) {
                spinner.classList.add("hide");
                box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${res.message}</div>`;
            } else {
                window.location.assign("/questions")
            }
        })
        .catch(error => {
            spinner.classList.add("hide");
            box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${error.message}</div>`;
        });
}