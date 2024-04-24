let name = document.querySelector("#name");
let mobNo = document.querySelector("#mobNo");
let email = document.querySelector("#email");
let course = document.querySelector("#course");
let dob = document.querySelector("#dob");
let tableBody = document.querySelector("#tableBody");
let btnSubmit = document.querySelector("#btnSubmit");

let crudData = JSON.parse(localStorage.getItem("curds")) || [];
let copyData = [...crudData];

let editIndex = null;

// bind data ==================
const bindData = () => {
  let html = "";

  if (copyData.length != 0) {
    copyData.forEach((item, index) => {
      html += `
                  <tr> 
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
      localStorage.setItem("curds", JSON.stringify(copyData));
    });
    tableBody.innerHTML = html;
  } else {
    tableBody.innerHTML = `<p class="text-danger mt-3">Record not found*</p>`;
  }
};
bindData();

// add crud data =========
const onSubmit = () => {
  btnSubmit.innerHTML = "Submit";
  if (editIndex !== null) {
    copyData[editIndex] = {
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
    copyData.push(data);
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
  copyData.splice(index, 1);
  bindData();
};

// edit data ===============
const editData = (index) => {
  btnSubmit.innerHTML = "Update";
  name.value = copyData[index].name;
  dob.value = copyData[index].dob;
  mobNo.value = copyData[index].mobNo;
  email.value = copyData[index].email;
  course.value = copyData[index].course;

  editIndex = index;
};

// searh functionality ====
const searchFun = () => {
  let searchInput = document.querySelector("#searchInput").value;
  searchInput = searchInput.toLowerCase();

  copyData = crudData.filter((item) => {
    return (
      item.name.toLowerCase().includes(searchInput) ||
      item.dob.toLowerCase().includes(searchInput) ||
      item.mobNo.toLowerCase().includes(searchInput) ||
      item.email.toLowerCase().includes(searchInput) ||
      item.course.toLowerCase().includes(searchInput)
    );
  });

  bindData();
};

// pagination =======
const total_recordsTr = document.querySelectorAll("#tableBody tr");
let recordPar_page = 5;
let pageNumber = 1;
const total_records = total_recordsTr.length;
let totalPage = Math.ceil(total_records / recordPar_page);
const recordSize = document.querySelector("#recordSize")

generatePage();
DisplayRecord();
function DisplayRecord() {
  let startIndex = (pageNumber - 1) * recordPar_page;
  let endIndex = startIndex + recordPar_page - 1;
  let statement = "";

  for (let i = startIndex; i <= endIndex && i < total_records; i++) {
    statement += `<tr> ${total_recordsTr[i].innerHTML}</tr>`;
  }
  tableBody.innerHTML = statement;

  document.querySelectorAll(".dynamicActive").forEach((item) => {
    item.classList.remove("active");
  });
  document.querySelector(`#page${pageNumber}`).classList.add("active");

  if (pageNumber == 1) {
    document.querySelector("#prevBtn").parentElement.classList.add("disabled");
  } else {
    document
      .querySelector("#prevBtn")
      .parentElement.classList.remove("disabled");
  }

  if (pageNumber == totalPage) {
    document.querySelector("#nextBtn").parentElement.classList.add("disabled");
  } else {
    document
      .querySelector("#nextBtn")
      .parentElement.classList.remove("disabled");
  }

  document.querySelector("#pageDetail").innerHTML = `Showing ${startIndex + 1} to ${endIndex + 1} of ${total_records}`
}

function generatePage() {
  let prevBtn = `<li class="page-item">
                    <a class="page-link" id="prevBtn" onclick="prevBtn()" href="javascript:void(0);" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                   </a>
                </li>`;
  let nextBtn = ` <li class="page-item">
                      <a class="page-link" id="nextBtn" onclick="nextBtn()" href="javascript:void(0);" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                </li>`;

  let pageButton = "";
  let activeClass = "";
  for (let i = 1; i <= totalPage; i++) {
    if (i == 1) {
      activeClass = "active";
    } else {
      activeClass = "";
    }
    pageButton += `<li class="page-item dynamicActive ${activeClass}" id="page${i}"><a class="page-link" onclick="page(${i})" href="javascript:void(0);">${i}</a></li>`;
  }
  document.querySelector(
    "#pagination"
  ).innerHTML = `${prevBtn} ${pageButton} ${nextBtn}`;
}

// pagination prev Button
const prevBtn = () => {
  pageNumber--;
  DisplayRecord();
};
// pagination next Button
const nextBtn = () => {
  pageNumber++;
  DisplayRecord();
};
// pagination page
const page = (index) => {
  pageNumber = parseInt(index);
  DisplayRecord();
};

recordSize.addEventListener('change', function (e) {
  recordPar_page = parseInt(recordSize.value)
  totalPage = Math.ceil(total_records / recordPar_page);
  pageNumber = 1
  generatePage();
  DisplayRecord();
})