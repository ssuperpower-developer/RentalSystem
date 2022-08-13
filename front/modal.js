const returnBtn = document.getElementById("returnBtn");
const modal_return = document.getElementById("modal-return");
const agreeRetrun = document.getElementById("return-agree");
const dDay = document.getElementById("dDay");
const today = document.getElementById("today");


function getClock(){
    const date = new Date();
    const year = String(date.getFullYear())
    const month = String(date.getMonth()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    today.innerText = (`today ${year}.${month}.${day}`);
}

getClock();
setInterval(getClock, 1000);


var serverData = [
    {no:1, goods:'우산', number: '5'},
    {no:2, goods:'양말', number: '2'},
    {no:3, goods:'신발', number: '2'},
        // {no:4, goods:'드라이기', number: '1'},
        // {no:5, goods:'고데기', number: '2'}
    ];
    
    function toDOM(row) {
    var tr = '';
    tr += '<tr>';
    tr += '  <td>' + row.no + '</td>';
    tr += '  <td id="rowList">' + row.goods + '</td>';
    tr += '  <td id="rowList">' + row.number + '</td>';
    tr += '  <td id="rowList">' + `<button type="button" id="reserveBtn${row.no}" class="btn" style="background-color: #68CDC1;"data-bs-toggle="modal" data-bs-target="#reserveModal${row.no}">예약하기</button>` + '</td>';
    tr += '</tr>';
    return tr;
}

function toModal(row){
    return `<div class="modal fade" id="reserveModal${row.no}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modal-title" id="ModalLabel">Precautions for Rental</h5>
    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
    1. 기간 내 반납하세요<br>
          2. 안하면 불이익 있습니다<br>
          3. 소중히 다뤄주세요<br>
          <br>
          Do You Agree?
          </div>
          <div class="modal-footer">
          <button type="button" id="agreePrecautions${row.no}" class="btn" style="background-color: #68CDC1;"data-bs-dismiss="modal">YES</button>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">NO</button>
          </div>
          </div>
          </div>
          </div>`;
        }

function renderTable(id, serverDataList){
    var size = serverDataList.length;
    var trList = '';
    var modalList = '';
    for(var i=0; i<size; i++) {
        trList += toDOM(serverDataList[i]);
        modalList += toModal(serverDataList[i]);
    }
    document.querySelector('#' + id + ' tbody').innerHTML = trList;
    document.querySelector('#modalDiv').innerHTML = modalList;
}

window.onload = function () {
    renderTable("table", serverData);
    const agreePrecautions1 = document.getElementById("agreePrecautions1");
    const agreePrecautions2 = document.getElementById("agreePrecautions2");
    const agreePrecautions3 = document.getElementById("agreePrecautions3");
    const reserveBtn1 = document.getElementById("reserveBtn1");
    const reserveBtn2 = document.getElementById("reserveBtn2");
    const reserveBtn3 = document.getElementById("reserveBtn3");


    const date = new Date();
    let reserveDay1 = 0;

    function handleAgree1(){
        reserveBtn1.style.backgroundColor = "#e0e0e0";
        reserveBtn1.innerText = "예약대기중"
        returnDay1 = date.getDay() + 7;
    }

    function handleAgree2(){
        reserveBtn2.style.backgroundColor = "#e0e0e0";
        reserveBtn2.innerText = "예약대기중"
        returnDay1 = date.getDay() + 7;
    }

    function handleAgree3(){
        reserveBtn3.style.backgroundColor = "#e0e0e0";
        reserveBtn3.innerText = "예약대기중"
        returnDay1 = date.getDay() + 7;
    }

    function handleReturn(){
        const day = date.getDay();
        const dDay = returnDay1 - day;
        modal_return.innerText = `${dDay}일 남았습니다. 반납하시겠습니까?`
    }

    function handleReturnAgree(){
        reserveBtn1.style.backgroundColor = "#68CDC1";
        reserveBtn1.innerText = "예약하기"
    }

    agreePrecautions1.addEventListener("click", handleAgree1);

    agreePrecautions2.addEventListener("click", handleAgree2);

    agreePrecautions3.addEventListener("click", handleAgree3);

    agreeRetrun.addEventListener("click", handleReturnAgree);

    returnBtn.addEventListener("click", handleReturn);

};