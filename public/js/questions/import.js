const excel_file = document.getElementById("excel_file");
const box_error = document.getElementById("box-error");
const form = document.getElementById("form");
const table_container = document.getElementById("table_container");
const buttons_container = document.getElementById("buttons_container");
const form_container = document.getElementById("form_container");
const spinner = document.getElementById("spinner");


form.onsubmit = (e) => {
    e.preventDefault();

    form_container.classList.remove("hide");
    table_container.classList.remove("show-btns");
    table_container.classList.add("hide");
    buttons_container.classList.add("hide");

    const errors = [];
    if (!excel_file.files.item(0)) {
        errors.push("يجب رفع الملف اولا")
    } else {

        if (excel_file.files.item(0).size >= 3145728) {
            errors.push("حجم الملف المرفوع كبير جدا ، الحجم المسموح اقل من 5MB")
        }
    }

    

    if (errors.length != 0) {
        box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${errors[0]}</div>`;

    } else {

        spinner.classList.remove("hide")
        const formData = new FormData();
        formData.append("excel_file", excel_file.files[0])
        fetch("/questions/import", {
            method: "POST",
            body: formData
        })
        .then((res)=> res.json())
        .then((res)=> {
            if (res.error) {
                spinner.classList.add("hide");
                box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${res.error}</div>`;
            } else {
                table_container.classList.remove("hide");
                table_container.classList.add("show-btns");
                form_container.classList.add("hide");
                buttons_container.classList.remove("hide");
                spinner.classList.add("hide");

                let row = "";
                let counter = 0;
                for (const row_data of res) {
                    counter += 1
                    row += `
                    <tr>
                        <td>${counter}</td>
                        <td>${row_data.question}</td>
                        <td>${row_data.choice_1}</td>
                        <td>${row_data.choice_2}</td>
                        <td>${row_data.choice_3}</td>
                        <td>${row_data.type}</td>
                        <td>${row_data.age_group}</td>
                    </tr>
                    `
                }

                table_container.innerHTML = `
                <table class="table table-dark table-striped">
                    <thead>
                        <tr>
                            <th>ت</th>
                            <th>السؤال</th>
                            <th>الخيار الأول ( الصحيح )</th>
                            <th>الخيار الثاني</th>
                            <th>الخيار الثالث</th>
                            <th>الفئة العمرية</th>
                            <th>فئة السؤال</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${row}
                    </tbody>
                </table>
                `
            }
        })
    }

}


function sendFileData() {
    spinner.classList.remove("hide")
    fetch("/questions/import/save-data", {
        method: "GET"
    })
    .then((res)=> res.json())
    .then((res)=> {
        if (res.message) {
            spinner.classList.add("hide");
            box_error.innerHTML = `<div dir="rtl" class="alert alert-danger" role="alert">${res.message}</div>`;
        } else {
            window.location.assign("/")
        }
    })
}