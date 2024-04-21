let name = document.querySelector("#name");
let mobNo = document.querySelector("#mobNo");
let email = document.querySelector("#email");
let course = document.querySelector("#course");
let dob = document.querySelector("#dob");
let tableBody = document.querySelector("#tableBody");
let btnSubmit = document.querySelector("#btnSubmit");

const crudData = JSON.parse(localStorage.getItem("curds")) || [];

let editIndex = null;

// bind data ==================
const bindData = () => {
  let html = "";

  crudData.forEach((item, index) => {
    html += `
                <tr id="curdTR"> 
                     <td>${index + 1}</td>
                     <td>${item.name}</td>
                     <td>${item.dob}</td>
                     <td>${item.mobNo}</td>
                     <td>${item.email}</td>
                     <td>${item.course}</td>
                     <td>
                          <button class="btn btn-secondary" onclick="editData(${index})"><i class="bi bi-pencil-square"></i></button>
                          <button class="btn btn-danger"  onclick="delData(${index})"><i class="bi bi-trash3"></i></button>
                     </td>
                </tr>
               `;
    localStorage.setItem("curds", JSON.stringify(crudData));
  });
  tableBody.innerHTML = html;
};
bindData();

// add crud data =========
const onSubmit = () => {
  btnSubmit.innerHTML = "Submit";
  if (editIndex !== null) {
    crudData[editIndex] = {
      name: name.value,
      dob: dob.value,
      mobNo: mobNo.value,
      email: email.value,
      course: course.value,
    };
    editIndex = null;
  } else {
    const data = {
      name: name.value,
      dob: dob.value,
      mobNo: mobNo.value,
      email: email.value,
      course: course.value,
    };
    crudData.push(data);
  }

  name.value = "";
  dob.value = "";
  mobNo.value = "";
  email.value = "";
  course.value = 0;

  bindData();
};

// delete data crud =======
const delData = (index) => {
  crudData.splice(index, 1);
  bindData();
};

// edit data ===============
const editData = (index) => {
  btnSubmit.innerHTML = "Update";
  name.value = crudData[index].name;
  dob.value = crudData[index].dob;
  mobNo.value = crudData[index].mobNo;
  email.value = crudData[index].email;
  course.value = crudData[index].course;

  editIndex = index;
};

// searh functionality ====
const searchFun = () => {
  let searchInput = document.querySelector("#searchInput").value;
  searchInput = searchInput.toLowerCase();
  let rows = document.querySelectorAll("#tableBody tr");

  rows.forEach(function (row) {
    let cells = row.querySelectorAll("td");
    let found = false;
    cells.forEach(function (cell) {
      if (cell.textContent.toLowerCase().includes(searchInput)) {
        found = true;
      }
    });
    if (found) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
};
