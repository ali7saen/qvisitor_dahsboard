const Form = document.getElementById("form");
const question = document.getElementById("question");
const choice_1 = document.getElementById("choice_1");
const choice_2 = document.getElementById("choice_2");
const choice_3 = document.getElementById("choice_1");
const age_group = document.getElementById("age_group");
const question_type = document.getElementById("question_type");
const box_error = document.getElementById("box-error")
const question_id = document.getElementById("question_id").value;
const spinner = document.getElementById("spinner");

Form.onsubmit = async (e) => {
    e.preventDefault();

    spinner.classList.remove("hide");

    box_error.innerHTML = ``;

    const questionData = JSON.stringify({
        question: question.value,
        choice_1: choice_1.value,
        choice_2: choice_2.value,
        choice_3: choice_3.value,
        age_group: age_group.value,
        type: question_type.value
    })



    fetch(`/questions/edit/${question_id}`, {
        method: "POST",
        body: questionData,
        headers: {
            "Content-Type": "application/json"
        }
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
