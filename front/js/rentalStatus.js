window.onload = function () {
  renderTable("table", serverData);

  let reservedList = [];

  function saveReserve() {
    localStorage.setItem("reserve", JSON.stringify(reservedList));
  }

  function deleteReserve(event) {
    const li = event.target.parentElement;
    li.remove();
    reservedList = reservedList.filter((reserve) => reserve !== parseInt(li));
    saveReserve();
  }

  submitBtn.addEventListener("click", deleteReserve);

  const date = new Date();
  const returnBtn = document.getElementById("returnBtn");

  let dDay = 0;
  function handleReturn() {
    const day = date.getDay();
    dDay = returnDay - day;
    modal_return.innerText = `1일 남았습니다. 반납하시겠습니까?`;
  }

  returnBtn.addEventListener("click", handleReturn);
};

const modal_return = document.getElementById("modal-return");
const agreeRetrun = document.getElementById("return-agree");
// const dDay = document.getElementById("dDay");
const today = document.getElementById("today");
const submitBtn = document.getElementById("submitBtn");

function getClock() {
  const date = new Date();
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  today.innerText = `today ${year}.${month}.${day}`;
}

getClock();
setInterval(getClock, 1000);

var serverData = [
  { goods: "우산", quantity: "1", dDay: "1" },
  { goods: "양말", quantity: "2", dDay: "2" },
  { goods: "신발", quantity: "1", dDay: "3" },
];

function toDOM(row) {
  var tr = "";
  tr += "<tr>";
  tr += '  <td id="rowList">' + row.goods + "</td>";
  tr += "  <td>" + row.quantity + "</td>";
  tr += '  <td id="rowList">' + "D-" + row.dDay + "</td>";
  tr +=
    '  <td id="rowList">' +
    `<button
    type="button"
    id="returnBtn"
    class="btn"
    style="background-color: #e0e0e0"
    data-bs-toggle="modal"
    data-bs-target="#returnModal"
  >
    반납하기
  </button>` +
    "</td>";
  tr += "</tr>";
  return tr;
}

function toModal(row) {
  return `
  <div class="modal fade" id="sendMessageModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Return</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form>
          <div>이용하시는데 불편한 점이 있었다면 후기를 남겨주세요.<div>
          <div class="mb-3">
            <label for="message-text" class="col-form-label">불편한점:</label>
            <textarea class="form-control" id="message-text"></textarea>
          </div>
        </form>
      </div>
      <div class="modal-footer">
      <button id="submitBtn" type="button" class="btn" style="background-color: #68CDC1">submit</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">close</button>
      </div>
    </div>
  </div>
</div>`;
}

function renderTable(id, serverDataList) {
  let size = serverDataList.length;
  let trList = "";
  let modalList = "";
  for (let i = 0; i < size; i++) {
    trList += toDOM(serverDataList[i]);
    modalList += toModal(serverDataList[i]);
  }
  document.querySelector("#" + id + " tbody").innerHTML = trList;
  document.querySelector("#modalDiv").innerHTML = modalList;
}
