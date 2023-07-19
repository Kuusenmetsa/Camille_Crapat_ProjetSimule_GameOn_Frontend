// Variables
// DOM
const modalForm = document.getElementById('modal-form'); // form
const modalConfirm = document.getElementById('modal-confirm'); // confirm
const modalOpenBtn = document.querySelectorAll('.modal-btn');
const modalCloseBtn = document.querySelectorAll('.close');
const modals = document.querySelectorAll('.bground');
const confirmCloseBtn = document.getElementById('btn-close');
const formData = document.querySelectorAll('.formData');
const form = document.querySelectorAll('form');

// Regex
const regexName = /^[-a-zA-ZàâäéèêëïîôöùûüçÂ]{2,}$/;
const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const regexNb = /^[0-9]+$/;

//Event
// launch open modal event
modalOpenBtn.forEach((btn) => btn.addEventListener('click', () => launchModal(modalForm)));

// launch close modal event
modalCloseBtn.forEach((btn) => btn.addEventListener('click', () => closeModal(modals)));

// launch submit form eventS
form.forEach((submit) =>
	submit.addEventListener('submit', function (e) {
		e.preventDefault();
		checkInputs('submit');
	})
);

// launch change input event
formData.forEach((input) =>
	input.addEventListener('change', (e) => {
		e.preventDefault();
		checkInputs();
	})
);

// launch close confirm modal event
confirmCloseBtn.addEventListener('click', (e) => closeModal(modalConfirm));

// function

// launch modal form
function launchModal(elements) {
	if (elements && elements.length > 1) {
		elements.forEach((element) => (element.style.display = 'block'));
	} else {
		elements.style.display = 'block';
	}
}

//close modal form
function closeModal(elements) {
	if (elements && elements.length > 1) {
		elements.forEach((element) => (element.style.display = 'none'));
	} else {
		elements.style.display = 'none';
	}
}

function checkInputs(type = null) {
	const firstName = checkInput('input', 'first', '.first', regexName);
	const lastName = checkInput('input', 'last', '.last', regexName);
	const email = checkInput('input', 'email', '.email', regexMail);
	const birthdate = checkInput('input', 'birthdate', '.birthdate', regexDate);
	const quantity = checkInput('input', 'quantity', '.quantity', regexNb);
	const location = checkInput('multipleChecked');
	const terms = checkInput('simpleChecked');

	if (type === 'submit' && firstName && lastName && email && birthdate && quantity && location && terms) {
		closeModal(modalForm);
		launchModal(modalConfirm);
	}
}

function checkInput(type, id = '', className = '', regex = '') {
	if (type === 'input') {
		if (document.getElementById(id).value === '' || !regex.test(document.getElementById(id).value)) {
			addError(className);
			return false;
		} else {
			delError(className);
			return true;
		}
	} else if (type === 'simpleChecked') {
		if (!document.getElementById('checkbox1').checked) {
			addError('.checkbox1');
			return false;
		} else {
			delError('.checkbox1');
			return true;
		}
	} else if (type === 'multipleChecked') {
		if (
			!document.getElementById('location1').checked &&
			!document.getElementById('location2').checked &&
			!document.getElementById('location3').checked &&
			!document.getElementById('location4').checked &&
			!document.getElementById('location5').checked &&
			!document.getElementById('location6').checked
		) {
			addError('.location');
			return false;
		} else {
			delError('.location');
			return true;
		}
	} else {
		console.log('Une erreur dans le typage de la fonction checkInput est survenu');
		return false;
	}

	function addError(className) {
		document.querySelector(className).setAttribute('data-error-visible', 'true');
	}
	function delError(className) {
		document.querySelector(className).setAttribute('data-error-visible', 'false');
	}
}
