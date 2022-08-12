const agreePrecautions = document.getElementById("agreePrecautions");
const reserveBtn = document.getElementById("reserveBtn");
const returnBtn = document.getElementById("returnBtn");
const modal_return = document.getElementById("modal-return");
const agreeRetrun = document.getElementById("return-agree");

const date = new Date();
let reserveDay = 0;

function handleAgree(){
    reserveBtn.style.backgroundColor = "#e0e0e0";
    reserveBtn.innerText = "예약대기중"
    returnDay = date.getDay() + 7;
}

function handleReturn(){
    const day = date.getDay();
    const dDay = returnDay - day;
    modal_return.innerText = `${dDay}일 남았습니다. 반납하시겠습니까?`
}

function handleReturnAgree(){
    reserveBtn.style.backgroundColor = "#68CDC1";
    reserveBtn.innerText = "예약하기"
}

agreePrecautions.addEventListener("click", handleAgree);

agreeRetrun.addEventListener("click", handleReturnAgree);

returnBtn.addEventListener("click", handleReturn);