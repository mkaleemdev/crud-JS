let name = document.querySelector("#name")
let mobNo = document.querySelector("#mobNo")
let email = document.querySelector("#email")
let course = document.querySelector("#course")
let semster = document.querySelector("#semster")
let tableBody = document.querySelector("#tableBody")

const crudData = []


// bind data ==================
const bindData = () => {
    let html = "";

    crudData.forEach((item, index) => {
        html += `
                <tr> 
                     <td>${index + 1}</td>
                     <td>${item.name}</td>
                     <td>${item.mobNo}</td>
                     <td>${item.email}</td>
                     <td>${item.course}</td>
                     <td>${item.semster}</td>
                     <td>
                          <button class="btn btn-secondary" onclick="editData()"><i class="bi bi-pencil-square"></i></button>
                          <button class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal"><i class="bi bi-trash3"></i></button>
                     </td>
                </tr>
               `
    })

    tableBody.innerHTML = html;
}


// add crud data =========
const onSubmit = () => {

    const data = {
        name: name.value,
        mobNo: mobNo.value,
        email: email.value,
        course: course.value,
        semster: semster.value,
    }

    crudData.push(data)

    name.value = ""
    mobNo.value = ""
    email.value = ""
    course.value = 0
    semster.value = 0

    bindData()
}

// delete data crud =======
const delData = (index) =>{
    crudData.splice(index, 1)
    bindData()
}

// edit data ===============
const editData = () =>{

}