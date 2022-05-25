// !start of date picker
// config for date picker
config = {
	dateFormat: "d/m/Y",
};

// display datepicker at class .date
flatpickr(".date", config);
// !end of date picker

// get all the needed variables
const form = document.querySelector("#form");
const datePawn = document.querySelector(".date");
const moneyPawn = document.querySelector(".money");
const daysPawn = document.querySelector(".totaldays");
const normalRate = document.querySelector(".rate_normal");
const discountRate = document.querySelector(".rate_discount");
const today = new Date();
const res = document.querySelector(".res");
const res1 = document.querySelector(".res1");
const res2 = document.querySelector(".res2");

// convert input number
moneyPawn.addEventListener("focus", () => {
	moneyPawn.value = "";
	moneyPawn.type = "number";
});

moneyPawn.addEventListener("focusout", () => {
	const val = parseInt(moneyPawn.value);
	const newVal = val.toLocaleString();
	moneyPawn.type = "text";
	if (moneyPawn.value == "") return;
	insertVal(moneyPawn, newVal);
});

// immediately show total pawn days back
datePawn.addEventListener("change", () => {
	const newDatePawn = new Date(formatDate(datePawn.value));
	const songaycam = today.getTime() - newDatePawn.getTime();
	const result = Math.ceil(songaycam / (1000 * 3600 * 24));
	insertVal(daysPawn, result);
});

// !Event on submit
form.addEventListener("submit", e => {
	e.preventDefault();
	const newMoney = moneyPawn.value.replaceAll(",", "");
	const newTotalDays = getDaysOfMonth(datePawn.value);
	const pawnDays = daysPawn.value;
	const normalRate1 = Math.round(((newMoney * 0.05) / newTotalDays) * pawnDays);
	const discountRate1 = Math.round((newMoney / 1000000) * 1500 * pawnDays);
	if (discountRate1 == 0) return;
	//
	insertVal(normalRate, normalRate1.toLocaleString());
	insertVal(discountRate, discountRate1.toLocaleString());
	//
	const equal = (parseInt(newMoney) + parseInt(normalRate1)).toLocaleString();

	res.remove();
	res1.textContent = `BT: ${(parseInt(newMoney) + parseInt(normalRate1)).toLocaleString()}`;
	res2.textContent = `Quen: ${(parseInt(newMoney) + parseInt(discountRate1)).toLocaleString()}`;
});

// reformat the date to month/day/year
function formatDate(date) {
	const [day, month, year] = date.split("/");
	const newDate = `${month}/${day}/${year}`;
	return newDate;
}

// get numbers of days
function getDaysOfMonth(date) {
	const [day, month, year] = date.split("/");
	const newDate = new Date(year, month, 0).getDate();
	return newDate;
}

// insert date back to the field
function insertVal(element, value) {
	element.value = value;
}