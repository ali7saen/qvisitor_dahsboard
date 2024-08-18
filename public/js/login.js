const loginForm = document.getElementById("login-form");
const username = document.getElementById("username");
const password = document.getElementById("password");
const box_error = document.getElementById("box-error")
const spinner = document.getElementById("spinner");

loginForm.onsubmit = async (e) => {
    e.preventDefault();

    box_error.innerHTML = ``;

    spinner.classList.remove("hide")


    const loginData = JSON.stringify({
        username: username.value,
        password: password.value
    })


    
    fetch("/auth/login", {
        method: "POST",
        body: loginData,
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => response.json())
        .then(data => {
            if (data.message) {
                spinner.classList.add("hide");
                box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${data.message}</div>`;
            } else {
                window.location.assign("/questions")
            }
        })
        .catch(error => {
            spinner.classList.add("hide");
            box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${error.message}</div>`;
        });
}
