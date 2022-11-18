const newPassword = document.querySelector('.password-input');
const newPasswordDes = document.querySelector('.descripe-input');
const startButton = document.querySelector('.start-button');
const generateButton = document.querySelector('.generate-button');
const descripeArea = document.querySelector('.descripe-area');

const gallowParts = document.querySelectorAll('.gallows-part');
const restartButtonLose = document.querySelector('.restart-lose');
const restartButtonWin = document.querySelector('.restart-win');
const winPopup = document.querySelector('.win');
const losePopup = document.querySelector('.lose');

const enteredPasswordArea = document.querySelector('.enter-password');
const passwordZone = document.querySelector('.password');
const inputLetterBox = document.querySelector('.letter-input');
const inputLetter = document.querySelector('.letter-input input');
const changeButton = document.querySelector('.change-password');
const backButton = document.querySelector('.back');

let lettersArray = [];
const passwordArray = [
	{
		password: 'Kubuś Puchatek',
		descripe: 'Słynny Kuba',
	},
	{
		password: 'Mela',
		descripe: 'Kot',
	},
	{
		password: 'Antarktyda',
		descripe: 'Na jakim kontynencie jest najmniej roślin kwiatowych?',
	},
	{
		password: 'Szafran',
		descripe: 'Najdroższa przyprawa na świecie?',
	},
	{
		password: 'mszyc i czerwców',
		descripe: 'Spadź występująca w miodzie spadziowym to wydalina?',
	},
];

// Draw user password
const startGame = () => {
	if (newPasswordDes.value === '' || newPassword.value === '') {
		newPassword.placeholder = 'Wprowadz hasło!';
		newPasswordDes.placeholder = 'Wprowadz opis hasła!';
	} else {
		descripeArea.textContent = newPasswordDes.value;
		enteredPasswordArea.style.display = 'none';
		descripeArea.style.display = 'flex';

		const newPasswordString = newPassword.value.toUpperCase();
		lettersArray = [...newPasswordString];

		createLettersZone();
		inputLetterBox.style.display = 'flex';
	}
};
// Draw generate password
const generateGame = () => {
	const number = Math.floor(Math.random() * passwordArray.length);
	descripeArea.textContent = passwordArray[number].descripe;

	enteredPasswordArea.style.display = 'none';
	descripeArea.style.display = 'flex';

	const newPasswordString = passwordArray[number].password.toUpperCase();
	lettersArray = [...newPasswordString];

	createLettersZone();
	inputLetterBox.style.display = 'flex';
};

// Create password zone

const createLettersZone = () => {
	lettersArray.forEach((letter) => {
		if (letter === ' ') {
			const letterZone = document.createElement('div');
			letterZone.classList.add('letter-line');

			const newLetter = document.createElement('div');
			newLetter.classList.add('letter');
			newLetter.textContent = letter;

			letterZone.appendChild(newLetter);

			passwordZone.appendChild(letterZone);
		} else {
			const letterZone = document.createElement('div');
			letterZone.classList.add('letter-line');

			const newLetter = document.createElement('div');
			newLetter.classList.add('letter');
			newLetter.textContent = letter;

			const newLine = document.createElement('div');
			newLine.classList.add('line');

			letterZone.appendChild(newLetter);
			letterZone.appendChild(newLine);

			passwordZone.appendChild(letterZone);
		}
	});
	lettersArray.forEach(() => {
		const index = lettersArray.indexOf(' ');
		if (index !== -1) {
			lettersArray.splice(index, 1);
		}
	});
};

// Check if array cointains input letter

const checkArray = () => {
	if (lettersArray.includes(inputLetter.value.toUpperCase())) {
		showLetters();
	} else {
		drawGallow();
	}
};
// Show password letters and popup if win

const showLetters = () => {
	const passwordLetters = document.querySelectorAll('.letter');
	const inputLetterTransfromed = inputLetter.value.toUpperCase();
	inputLetter.value = '';
	passwordLetters.forEach((letter) => {
		if (letter.textContent === inputLetterTransfromed) {
			letter.classList.add('show');
			letter.classList.add('show-animation');
			const index = lettersArray.indexOf(letter.textContent);
			if (index !== -1) {
				lettersArray.splice(index, 1);
			}
		}
		if (lettersArray.length === 0) {
			winPopup.classList.add('show');
			inputLetter.disabled = true;
		}
	});
};

const drawGallow = () => {
	for (part of gallowParts) {
		const data = part.getAttribute('data-opacity');

		if (data === '0') {
			part.style.opacity = '1';
			part.setAttribute('data-opacity', '1');
			part.classList.add('show-animation')
			inputLetter.value = '';
			losePopup.style.display = 'flex';
			return;
		}
	}
};

const test = () => {
	if (inputLetter.value.length === 0) {
		return;
	} else {
		checkArray();
	}
};

const restart = () => {
	gallowParts.forEach((part) => {
		part.style.opacity = '0';
		part.classList.remove('show-animation')
		part.setAttribute('data-opacity', '0');
	});
	winPopup.classList.remove('show');
	losePopup.style.display = 'none';
	inputLetter.disabled = false;
	passwordZone.textContent = '';
	inputLetterBox.style.display = 'none';
	enteredPasswordArea.style.display = 'flex';
	descripeArea.style.display = 'none';
	newPasswordDes.value = '';
	newPassword.value = '';
	newPassword.placeholder = '';
	newPasswordDes.placeholder = '';
};

inputLetter.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		test();
	}
});
startButton.addEventListener('click', startGame);
generateButton.addEventListener('click', generateGame);
changeButton.addEventListener('click', restart);
changeButton.addEventListener('click', generateGame);
backButton.addEventListener('click', restart);
restartButtonLose.addEventListener('click', restart);
restartButtonWin.addEventListener('click', restart);
