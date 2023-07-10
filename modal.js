function editNav() {
	var x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalCloseBtn = document.getElementById('close');
const formData = document.querySelectorAll('.formData');
const inputFirstName = document.getElementById('first');
const inputLastName = document.getElementById('last');
const inputEmail = document.getElementById('email');
const inputQuantity = document.getElementById('quantity');
const inputLocation1 = document.getElementById('location1');
const inputLocation2 = document.getElementById('location2');
const inputLocation3 = document.getElementById('location3');
const inputLocation4 = document.getElementById('location4');
const inputLocation5 = document.getElementById('location5');
const inputLocation6 = document.getElementById('location6');
const inputCheckbox = document.getElementById('checkbox1');
const btnForm = document.querySelectorAll('.btn-submit');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

//launch close button modal event
modalCloseBtn.addEventListener('click', closeModal);

//launch close modal
function closeModal() {
	modalbg.style.display = 'none';
}

//launch form event
btnForm.forEach((btn) =>
	btn.addEventListener('click', function (e) {
		e.preventDefault();
		checkForm();
	})
);

//launch check form
function checkForm() {
	const regexFirstName = /^[-a-zA-ZàâäéèêëïîôöùûüçÂ]{2,}$/;
	const regexLastName = /^[-a-zA-ZàâäéèêëïîôöùûüçÂ]{2,}$/;
	const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
	const regexNb = /^[0-9]+$/;
	if (inputFirstName.value === '' || inputFirstName.value.lenght >= 2 || !regexFirstName.test(inputFirstName.value)) {
		addError('.first');
	} else if (
		inputLastName.value === '' ||
		inputLastName.value.lenght >= 2 ||
		!regexLastName.test(inputLastName.value)
	) {
		addError('.last');
	} else if (inputEmail.value === '' || !regexMail.test(inputEmail.value)) {
		addError('.email');
	} else if (inputQuantity.value === '' || !regexNb.test(inputQuantity.value)) {
		addError('.quantity');
	} else if (
		!inputLocation1.checked &&
		!inputLocation2.checked &&
		!inputLocation3.checked &&
		!inputLocation4.checked &&
		!inputLocation5.checked &&
		!inputLocation6.checked
	) {
		addError('.location');
	} else if (!inputCheckbox.checked) {
		addError('.checkbox1');
	} else {
		delError();
		closeModal();
	}

	function addError(input) {
		document.querySelector(input).setAttribute('data-error-visible', 'true');
	}
	function delError() {
		document.querySelector('.last').setAttribute('data-error-visible', 'false');
		document.querySelector('.first').setAttribute('data-error-visible', 'false');
		document.querySelector('.email').setAttribute('data-error-visible', 'false');
		document.querySelector('.quantity').setAttribute('data-error-visible', 'false');
		document.querySelector('.location').setAttribute('data-error-visible', 'false');
		document.querySelector('.checkbox1').setAttribute('data-error-visible', 'false');
	}
}
