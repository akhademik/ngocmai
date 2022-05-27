// get all the needed variables
const form = document.querySelector("#form");
const datePawn = document.querySelector(".date");
const moneyPawn = document.querySelector(".money");
const daysPawn = document.querySelector(".totaldays");
const normalRate = document.querySelector(".rate_normal");
const discountRate = document.querySelector(".rate_discount");
const today = new Date();
const todayMax = getToday(today);
const res = document.querySelector(".res");
const res1 = document.querySelector(".res1");
const res2 = document.querySelector(".res2");

console.log(datePawn.value);

// convert input number
moneyPawn.addEventListener("focus", () => {
	moneyPawn.value = "";
	moneyPawn.type = "number";
});

moneyPawn.addEventListener("focusout", () => {
	const val = parseInt(moneyPawn.value);
	const newVal = val.toLocaleString("en-US");
	moneyPawn.type = "text";
	if (moneyPawn.value == "") return;
	insertVal(moneyPawn, newVal);
});

// immediately show total pawn days back
datePawn.addEventListener("focus", () => {
	datePawn.max = todayMax;
});

datePawn.addEventListener("change", () => {
	const newDatePawn = new Date(datePawn.value);
	const result = Math.ceil((today - newDatePawn) / (1000 * 3600 * 24));
	insertVal(daysPawn, result);
});

// !Event on submit
form.addEventListener("submit", e => {
	e.preventDefault();
	const newTotalDays = getDaysOfMonth(datePawn.value);
	const newMoney = moneyPawn.value.replaceAll(",", "");
	const pawnDays = daysPawn.value;
	const normalRate1 = Math.round(((newMoney * 0.05) / newTotalDays) * pawnDays);
	const discountRate1 = Math.round((newMoney / 1000000) * 1500 * pawnDays);
	if (discountRate1 == 0) return;
	//
	insertVal(normalRate, normalRate1.toLocaleString("en-US"));
	insertVal(discountRate, discountRate1.toLocaleString("en-US"));
	//
	// const equal = (parseInt(newMoney) + parseInt(normalRate1)).toLocaleString();

	res.remove();
	res1.textContent = `BT: ${(parseInt(newMoney) + parseInt(normalRate1)).toLocaleString(
		"en-US"
	)}`;
	res2.textContent = `Quen: ${(parseInt(newMoney) + parseInt(discountRate1)).toLocaleString(
		"en-US"
	)}`;
});

// get numbers of days
function getDaysOfMonth(date) {
	const dateParse = new Date(date);
	const year = dateParse.getFullYear();
	const month = dateParse.getMonth() + 1;
	const newDate = new Date(year, month, 0).getDate();
	return newDate;
}

// insert date back to the field
function insertVal(element, value) {
	element.value = value;
}

// set max date to today for input
function getToday(today) {
	const day = today.getDate() >= 10 ? today.getDate() : "0" + today.getDate();
	const month = today.getMonth() + 1 >= 10 ? today.getMonth() + 1 : "0" + (today.getMonth() + 1);
	const year = today.getFullYear();
	return `${year}-${month}-${day}`;
}
