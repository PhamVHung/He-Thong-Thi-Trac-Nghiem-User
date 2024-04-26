//-------------------------------TRANG BÀI TẬP------------------------------------
function showPractice() {
  hideAllSections();
  document.getElementById("guidance").style.display = "block";
  document.getElementById("ques-nav").style.display = "block";
}

function showMidtermExam() {
  hideAllSections();
  document.getElementById("guidance").style.display = "block";
  document.getElementById("ques-nav-GK").style.display = "block";
}

function showFinalExam() {
  hideAllSections();
  document.getElementById("guidance").style.display = "block";
  document.getElementById("ques-nav-CK").style.display = "block";
}

function showResults() {
  hideAllSections();
  document.getElementById("history").style.display = "block";
}

function showRanking() {
  hideAllSections();
  document.getElementById("ranking").style.display = "block";
}

function hideAllSections() {
  document.getElementById("ques-nav").style.display = "none";
  document.getElementById("ques-nav-GK").style.display = "none";
  document.getElementById("ques-nav-CK").style.display = "none";
  document.getElementById("history").style.display = "none";
  document.getElementById("ranking").style.display = "none";
  document.getElementById("guidance").style.display = "none";
}

// Thêm dữ liệu mẫu cho bài tập luyện đề

const type_60 = 60
const type_50 = 50
const type_45 = 45
const type_20 = 20
const practiceExamLink = "/pages/exam/practice/pracice.html"
const midTermExamLink = "/pages/exam/mid_term/midterm.html"
const finalExamLink = "/pages/exam/final/final.html";
const readyLink = '/pages/exam/begin/begin.html'

const practiceData = [
  { number: 1, code: "LD001", title: "Bài tập 1", time: `${type_60}`},
  { number: 2, code: "LD002", title: "Bài tập 2", time: `${type_60}`},
  { number: 3, code: "LD003", title: "Bài tập 3", time: `${type_50}`},
  { number: 4, code: "LD004", title: "Bài tập 4", time: `${type_60}`},
  { number: 5, code: "LD005", title: "Bài tập 5", time: `${type_45}`},
  { number: 6, code: "LD006", title: "Bài tập 6", time: `${type_20}`},
  { number: 7, code: "LD007", title: "Bài tập 7", time: `${type_45}`},
  { number: 8, code: "LD008", title: "Bài tập 8", time: `${type_20}`},
  { number: 9, code: "LD009", title: "Bài tập 9", time: `${type_45}`},
];

// module.exports = {practiceData}

const practiceTableBody = document.querySelector("#ques-nav tbody");

practiceData.forEach((item) => {
  const row = practiceTableBody.insertRow();
  row.insertCell(0).textContent = item.number;
  row.insertCell(1).innerHTML = `<a href="${readyLink}">${item.code}</a>`;
  row.insertCell(2).innerHTML = `<a href="${readyLink}">${item.title}</a>`;
  row.insertCell(3).textContent = item.time + " phút";
});


// Thêm dữ liệu mẫu cho kiểm tra giữa kỳ
const practiceDataGK = [
  { number: 1, code: "GK001", title: "Kiểm tra 1", time: `${type_45}` },
  { number: 2, code: "GK002", title: "Kiểm tra 2", time: `${type_45}` },
  { number: 3, code: "GK003", title: "Kiểm tra 3", time: `${type_45}` },
  { number: 4, code: "GK004", title: "Kiểm tra 4", time: `${type_45}` },
  { number: 5, code: "GK005", title: "Kiểm tra 5", time: `${type_45}` },
];

const practiceTableBodyGK = document.querySelector("#ques-nav-GK tbody");

practiceDataGK.forEach((item) => {
  const row = practiceTableBodyGK.insertRow();
  row.insertCell(0).textContent = item.number;
  row.insertCell(1).innerHTML = `<a href="${readyLink}">${item.code}</a>`;
  row.insertCell(2).innerHTML = `<a href="${readyLink}">${item.title}</a>`;
  row.insertCell(3).textContent = item.time + " phút";
});

// Thêm dữ liệu mẫu cho kiểm tra cuối kỳ
const practiceDataCK = [
  { number: 1, code: "CK001", title: "Kiểm tra cuối kỳ", time: `${type_60}` },
];

const practiceTableBodyCK = document.querySelector("#ques-nav-CK tbody");

practiceDataCK.forEach((item) => {
  const row = practiceTableBodyCK.insertRow();
  row.insertCell(0).textContent = item.number;
  row.insertCell(1).innerHTML = `<a href="${readyLink}">${item.code}</a>`;
  row.insertCell(2).innerHTML = `<a href="${readyLink}">${item.title}</a>`;
  row.insertCell(3).textContent = item.time + " phút";
});

// Thêm dữ liệu mẫu cho history
const historyData = [
  {
    number: 1,
    code: "LD001",
    title: "Bài tập 1",
    type: "Luyện tập",
    time: `${type_60}`,
    result: "9.2",
  },
  {
    number: 2,
    code: "LD002",
    title: "Bài tập 2",
    type: "Luyện tập",
    time: `${type_60}`,
    result: "8.6",
  },
  {
    number: 3,
    code: "GK001",
    title: "Kiểm tra 1",
    type: "Kiểm tra giữa kỳ",
    time: `${type_60}`,
    result: "8.8",
  },
  {
    number: 4,
    code: "GK002",
    title: "Kiểm tra 2",
    type: "Kiểm tra giữa kỳ",
    time: `${type_60}`,
    result: "9.0",
  },
  {
    number: 5,
    code: "CK001",
    title: "Kiểm tra cuối kỳ",
    type: "Kiểm tra cuối kỳ",
    time: `${type_60}`,
    result: "9.8",
  },
];

const historyTableBody = document.querySelector("#history tbody");

historyData.forEach((item) => {
  const row = historyTableBody.insertRow();
  row.insertCell(0).textContent = item.number;
  row.insertCell(1).textContent = item.code;
  row.insertCell(2).textContent = item.title;
  row.insertCell(3).textContent = item.type;
  row.insertCell(4).textContent = item.time + " phút";
  row.insertCell(5).textContent = item.result;
});

// Thêm dữ liệu mẫu cho ranking
const rankingData = [
  {
    number: 1,
    account: "B21DCCN001",
    name: "Võ Nguyên Giáp",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "9.8",
    noEx: "10",
  },
  {
    number: 2,
    account: "B21DCCN002",
    name: "Trần Quốc Tuấn",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "9.4",
    noEx: "9",
  },
  {
    number: 3,
    account: "B21DCCN003",
    name: "Lý Thường Kiệt",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "9.2",
    noEx: "7",
  },
  {
    number: 4,
    account: "B21DCCN004",
    name: "Văn Tiến Dũng",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "9.0",
    noEx: "6",
  },
  {
    number: 5,
    account: "B21DCCN005",
    name: "Lê Trọng Tấn",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "9.0",
    noEx: "6",
  },
  {
    number: 6,
    account: "B21DCCN006",
    name: "Nguyễn Chí Thanh",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "8.8",
    noEx: "6",
  },
  {
    number: 7,
    account: "B21DCCN007",
    name: "Nguyễn Huệ",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "8.8",
    noEx: "5",
  },
  {
    number: 8,
    account: "B21DCCN008",
    name: "Ngô Quyền",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "8.8",
    noEx: "5",
  },
  {
    number: 9,
    account: "B21DCCN009",
    name: "Phùng Hưng",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "8.6",
    noEx: "5",
  },
  {
    number: 10,
    account: "B21DCCN010",
    name: "Lê Đức Anh",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "8.6",
    noEx: "5",
  },
  {
    number: 11,
    account: "B21DCCN011",
    name: "Đinh Bộ Lĩnh",
    Subject: "CNXHKH",
    class: "E21CQCN03-B",
    type: "luyện tập",
    result: "8.4",
    noEx: "5",
  },
];

const rankingTableBody = document.querySelector("#ranking tbody");

rankingData.forEach((item) => {
  const row = rankingTableBody.insertRow();
  row.insertCell(0).textContent = item.number;
  row.insertCell(1).textContent = item.account;
  row.insertCell(2).textContent = item.name;
  row.insertCell(3).textContent = item.Subject;
  row.insertCell(4).textContent = item.class;
  row.insertCell(5).textContent = item.type;
  row.insertCell(6).textContent = item.result;
  row.insertCell(7).textContent = item.noEx;
});


function search(event, sectionId) {
  event.preventDefault(); // Prevent form submission

  const searchBar = document.querySelector(`#${sectionId} .ques-nav-form input[name="s"]`);
  const searchTerm = searchBar.value.toLowerCase().trim();

  let data;
  let tableBody;

  switch (sectionId) {
    case "ques-nav":
      data = practiceData;
      tableBody = document.querySelector("#ques-nav tbody");
      break;
    case "ques-nav-GK":
      data = practiceDataGK;
      tableBody = document.querySelector("#ques-nav-GK tbody");
      break;
    case "ques-nav-CK":
      data = practiceDataCK;
      tableBody = document.querySelector("#ques-nav-CK tbody");
      break;
    // Add cases for other sections if needed

    default:
      return;
  }

  // Filter the data based on the search term
  const filteredData = data.filter((item) => {
    return (
      item.code.toLowerCase().includes(searchTerm) ||
      item.title.toLowerCase().includes(searchTerm)
    );
  });

  // Clear the table body first
  tableBody.innerHTML = "";

  // Render filtered data
  filteredData.forEach((item) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = item.number;
    row.insertCell(1).textContent = item.code;
    row.insertCell(2).textContent = item.title;
    row.insertCell(3).textContent = item.time + " phút";
  });
}

// Event listener for form submission in the ques-nav section
document.querySelector('#ques-nav .ques-nav-form').addEventListener('submit', (event) => search(event, "ques-nav"));

// Event listener for form submission in the ques-nav-GK section
document.querySelector('#ques-nav-GK .ques-nav-form').addEventListener('submit', (event) => search(event, "ques-nav-GK"));

// Event listener for form submission in the ques-nav-CK section
document.querySelector('#ques-nav-CK .ques-nav-form').addEventListener('submit', (event) => search(event, "ques-nav-CK"));

// You can add similar event listeners for other sections if needed

// Initially render all data
renderData(practiceData);
renderData(practiceDataGK);
renderData(practiceDataCK);
