

form.addEventListener("submit", submitForm);

function submitForm(e) {
    const form = document.getElementById("form");
    e.preventDefault();
    const name = document.getElementById("name");
    const file = document.getElementById("file");
    const formData = new FormData();
    formData.append("file", file.files[0]);

    fetch("http://localhost:3000/api/upload", {
        method: 'POST',
        body: formData
    })
        .then((res) => console.log(res.json()))
        .catch((err) => ("Error occured", err));
}
