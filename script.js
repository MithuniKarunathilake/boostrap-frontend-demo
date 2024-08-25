loadTable();

function loadTable(){
    let stdTable = document.getElementById("tblStudent");

let body = `<tr>
                <th>ID</th>
                <th>Name</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Age</th>
            </tr>`

fetch("http://localhost:8080/get-student")
    .then(res => res.json())
    .then(data => {

        data.forEach(element => {
            console.log(element);
            body += `<tr>
                        <td>${element.id}</td>
                        <td>${element.name}</td>
                        <td>${element.address}</td>
                        <td>${element.gender}</td>
                        <td>${element.age}</td>
                    </tr>`
        });

        stdTable.innerHTML = body;

    })
}

function addStudents() {
    let name = document.getElementById("txtName").value
    let address = document.getElementById("txaAddress").value
    let gender = document.getElementById("txtGender").value
    let age = document.getElementById("txtAge").value


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "name": name,
        "address": address,
        "gender": gender,
        "age": age
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("http://localhost:8080/post-student", requestOptions)
        .then((response) => response.text())
        .then((result) => {
            console.log(result)
            loadTable();
        })
        .catch((error) => console.error(error));
}