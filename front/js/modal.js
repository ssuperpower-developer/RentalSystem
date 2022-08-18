window.onload = function () {
  const today = document.getElementById("today");

  // 달력 설정
  $.datepicker.setDefaults({
    dateFormat: "yy-mm-dd",
    prevText: "이전 달",
    nextText: "다음 달",
    monthNames: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    monthNamesShort: [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ],
    dayNames: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesShort: ["일", "월", "화", "수", "목", "금", "토"],
    dayNamesMin: ["일", "월", "화", "수", "목", "금", "토"],
    showMonthAfterYear: true,
    yearSuffix: "년",
  });

  // 현재 날짜 보여주기
  function getClock() {
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    today.innerText = `today ${year}.${month}.${day}`;
  }

  // 1초마다 새로고침
  getClock();
  setInterval(getClock, 1000);

  var serverData = [
    { no: 1, goods: "우산", quantity: "5" },
    { no: 2, goods: "양말", quantity: "2" },
    { no: 3, goods: "신발", quantity: "2" },
    // {no:4, goods:'드라이기', quantity: '1'},
    // {no:5, goods:'고데기', quantity: '2'}
  ];

  // 외부데이터 받아와 리스트 생성
  function toDOM(row) {
    var tr = "";
    tr += "<tr>";
    tr += "  <td>" + row.no + "</td>";
    tr += '  <td id="rowList">' + row.goods + "</td>";
    tr += '  <td id="rowList">' + row.quantity + "</td>";
    tr +=
      '  <td id="rowList">' +
      `<button type="button" id="reserveBtn${row.no}" class="btn" style="background-color: #68CDC1;"data-bs-toggle="modal" data-bs-target="#reserveModal${row.no}">예약하기</button>` +
      "</td>";
    tr += "</tr>";
    return tr;
  }

  // // 예약한거 application에 reserve 배열에 저장
  // function saveReserve() {
  //   localStorage.setItem("reserve", JSON.stringify(reservedList));
  // }

  // 날짜 지정 modal
  function chooseReserveDateModal(row) {
    return `
  <div
    class="modal fade"
    id="reserveModal${row.no}"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Precautions for Rental</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          1. 연체 시 1일당 1천 원 연체료가 부과됩니다<br />
          2. 대학원생은 대여가 불가능 합니다<br />
          3. 공지를 읽지 않아 생기는 불이익은 책임지지 않습니다<br />
          4. 문의 사항이나 신고접수는 아래 Notice 창을 이용해주세요<br />
          <br />
          Do You Agree?
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn"
            style="background-color: #68cdc1"
            data-bs-toggle="modal"
            data-bs-target="#chooseReserveDate${row.no}"
          >
            YES
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="chooseReserveDate${row.no}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel">Choose the Date</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div id="selectDate">
            빌릴 날짜 : <input type="text" id="borrowDate${row.no}" placeholder="빌릴 날짜">
            ~ 
            <input type="text" id="returnDate${row.no}" placeholder="반납 날짜"> <br>
            <br>
          </div>
          <div id="selectQuantity">
            <p>수량 선택: 
            <select id="quantity${row.no}">
            </select>
          </div>
        </div>
        <div class="modal-footer">
        <button
          type="button"
          class="btn"
          style="background-color: #68cdc1"
          data-bs-toggle="modal"
          data-bs-target="#reserveNotice${row.no}"
        >
          YES
        </button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
        </div>
      </div>
    </div>
</div>
<div
    class="modal fade"
    id="reserveNotice${row.no}"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="ModalLabel" style="color: #FF000F"><strong>NOTICE</strong></h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <span id="returnDateModal${row.no}"></span> <br />
          2. 대여 시 학생증을 맡겨주셔야 합니다.<br />
          3. 보증금 1만 원이 필요합니다.(이거는 물품마다 다름)<br />
          4. 연장은 반납예정일 이전에만 신청이 가능합니다.<br />
          <br />
          Do You Agree?
        </div>
        <div class="modal-footer">
          <button
            id="confirmationDate${row.no}"
            type="button"
            class="btn"
            style="background-color: #68cdc1"
            data-bs-toggle="modal"
          >
            Reserve
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            NO
          </button>
        </div>
      </div>
    </div>
  </div>
`;
  }

  function returnScript(row) {
    return `
          const confirmationDate${row.no} = document.getElementById("confirmationDate${row.no}");
          const reserveBtn${row.no} = document.getElementById("reserveBtn${row.no}");

          function handleAgree${row.no}() {
            reserveBtn${row.no}.style.backgroundColor = "#e0e0e0";
            reserveBtn${row.no}.innerText = "예약대기중";
            returnDay1 = date.getDay() + 7;
            reservedList.push("${row.no}");
            localStorage.setItem("reserve", JSON.stringify(reservedList));
          }

          confirmationDate${row.no}.addEventListener("click", handleAgree${row.no});


          $("#borrowDate${row.no}").datepicker({
            minDate: 0,
            onClose: function(selectedDate){
              $("#returnDate${row.no}").datepicker("option", "minDate", selectedDate);
              
              let date = $(this).datepicker('getDate');
              date.setDate(date.getDate() + 3);
              $("#returnDate${row.no}").datepicker("option", "maxDate", date);
            }
          })

          $("#returnDate${row.no}").datepicker({
            onClose: function(selectedDate){
              $("#borrowDate${row.no}").datepicker("option", "maxDate", selectedDate);
              let selected = $(this).val();
              let month = selected.substr(5, 2);
              let day = selected.substr(8, 2);
              document.getElementById("returnDateModal${row.no}").innerHTML = "1. " + month + "월" + day + "일 까지 반납해주셔야 합니다."
            }
          })

          for(let i = 1; i <= ${row.quantity}; i++){
            $("#quantity${row.no}").append('<option value="${row.no}">' + i + "개" + '</option>')
          }
    `;
  }

  // 날짜 지정 modal 창 여러개 만들기
  function renderTable(id, serverDataList) {
    let size = serverDataList.length;
    let trList = "";
    let modalList = "";
    let scriptList = "";
    for (let i = 0; i < size; i++) {
      trList += toDOM(serverDataList[i]);
      modalList += chooseReserveDateModal(serverDataList[i]);
      scriptList += returnScript(serverDataList[i]);
    }
    document.querySelector("#" + id + " tbody").innerHTML = trList;
    document.querySelector("#modalDiv").innerHTML = modalList;
    document.querySelector("#returnScript").innerHTML = scriptList;
  }
  renderTable("table", serverData);
};
