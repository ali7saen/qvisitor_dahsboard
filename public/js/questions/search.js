const searchField = document.getElementById("search-field");
const question_list = document.getElementById("question_list");
let question_id_to_delete = "";
const box_error = document.getElementById("box-error");


searchField.addEventListener("input", () => {
    if (searchField.value.trim() != "") {
        fetch("/questions/search", {
            method: "POST",
            body: JSON.stringify({ token: searchField.value.trim() }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((questions) => {
                question_list.innerHTML = ``;
                for (const questionObj of questions) {
                    question_list.innerHTML += `
                <div class="card question-card" style="width: 18rem;">
                <div class="card-body">
                  <div class="mb-3">
                    <h5 class="card-title">${questionObj.type}</h5>
                    <p class="card-text">${questionObj.question}</p>
                  </div>
                  <div>
                    <div class="text-success-emphasis p-2 rounded-2 mb-2" style="background-color: var(--bs-success-bg-subtle)">${questionObj.choice_1}</div>
                  <div class="card mb-3">
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item">${questionObj.choice_1}</li>
                      <li class="list-group-item">${questionObj.choice_2}</li>
                      <li class="list-group-item">${questionObj.choice_3}</li>
                    </ul>
                  </div>
                  </div>
                  <div class="question_btns">
                    <a href="/questions/edit/${questionObj._id}" class="btn btn-primary btn-sm">تعديل</a>
                    <button onclick="setQuestionIdToDelete('${questionObj._id}')" class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#delete_question">
                      حذف السؤال
                    </button>
                  </div>
                </div>
              </div>
                `;
                }
            });
    }
});


function setQuestionIdToDelete(question_id) {
    question_id_to_delete = question_id;
}

function deleteThisQuestion() {
    fetch(`/questions/delete/${question_id_to_delete}`, {
        method: "GET"
    }).then((response) => response.json())
        .then(res => {
            if (res.message) {
                box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${res.message}</div>`;
            } else {
                window.location.assign("/questions")
            }
        })
        .catch(error => {
            box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${error.message}</div>`;
        });
}
