const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const modalCloseBtn = document.getElementById('close');
const formData = document.querySelectorAll('.formData');
const form = document.querySelector('form');

const regexName = /^[-a-zA-ZàâäéèêëïîôöùûüçÂ]{2,}$/;
const regexMail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
const regexDate = /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/;
const regexNb = /^[0-9]+$/;

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

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const firstName = checkInput('input', 'first', '.first', regexName);
	const lastName = checkInput('input', 'last', '.last', regexName);
	const email = checkInput('input', 'email', '.email', regexMail);
	const birthdate = checkInput('input', 'birthdate', '.birthdate', regexDate);
	const quantity = checkInput('input', 'quantity', '.quantity', regexNb);
	const location = checkInput('multipleChecked');
	const terms = checkInput('simpleChecked');

	if (firstName && lastName && email && birthdate && quantity && location && terms) {
		form.style.display = 'none';
	} else {
		formData.forEach((input) =>
			input.addEventListener('change', (e) => {
				e.preventDefault();
				checkInput('input', 'first', '.first', regexName);
				checkInput('input', 'last', '.last', regexName);
				checkInput('input', 'email', '.email', regexMail);
				checkInput('input', 'birthdate', '.birthdate', regexDate);
				checkInput('input', 'quantity', '.quantity', regexNb);
				checkInput('multipleChecked');
				checkInput('simpleChecked');
			})
		);
	}
});

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
