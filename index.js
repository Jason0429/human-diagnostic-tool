var cursor = document.querySelector('.cursor');
window.addEventListener('mousemove', cursorMove);

var loginPage = document.querySelector('.login-page');
var diagnosticPage = document.querySelector('.diagnostic-page');
var loginContent = document.querySelector('.login-page-template').innerHTML;
var signUpContent = document.querySelector('.signup-page-template').innerHTML;
var symptomBox = document.querySelector('.symptom-box');
var diagnosticBox = document.querySelector('.diagnostic-box');
var symptomList = document.querySelector('[data-symptom-list]');
var symptomName = document.getElementById('symptom-name');
var input = document.getElementById('symptom-input');
var diagnosticList = document.querySelector('[data-diagnostic-list]');
var bodyParts = document.querySelectorAll('[data-body-part]');
var potentialSymptomsList = document.querySelector('.potential-symptoms-list');
var potentialTitle = document.querySelector('.potential-title');
var personalTitle = document.querySelector('.personal-title');
var information = [];
var currentUserEmail;
var currentScreen;
var potentialSymptoms = [
	{
		name: 'Head',
		symptoms: [
			{
				name: 'Headache',
				description:
					'Headache is pain in any region of the head. May occur on one or both sides of the head or radiate across the head.',
				treatment:
					'Rest in a quiet, dark room. Hot or cold compresses to your head or neck. Massage and small amounts of caffeine.'
			},
			{
				name: 'Vomiting',
				description:
					'Vomiting is the forcible emptying of the stomach in which the stomach has to overcome the pressures.',
				treatment:
					'Drink clear or ice-cold drinks. Eat light, bland foods (such as saltine crackers or plain bread). Avoid fried, greasy, or sweet foods. Eat slowly and eat smaller, more frequent meals.'
			},
			{
				name: 'Dizziness',
				description:
					'Dizziness is a term used to describe a range of sensations, such as feeling faint, woozy, weak or unsteady.',
				treatment:
					'meclizine hydrochloride (Antivert), scopolamine transdermal patch (Transderm-Scop), promethazine hydrochloride (Phenergan), metoclopramide (Reglan), ondansetron (Zofran),'
			}
		]
	},
	{
		name: 'Chest',
		symptoms: [
			{
				name: 'Pain During Exertion',
				description:
					'Pain, pressure, tightness, or other discomfort originating in or radiating to the chest is an indicator of potentially serious cardiovascular disorders',
				treatment:
					'Warm up aching joints and stretch. Refrain from engaging in strenuous activity. Develop good sleeping habits and snack on dark chocolate.'
			},
			{
				name: 'Nausea',
				description: 'Nausea is stomach discomfort and the sensation of wanting to vomit.',
				treatment:
					'Drink clear or ice-cold drinks. Eat light, bland foods (such as saltine crackers or plain bread). Avoid fried, greasy, or sweet foods.'
			},
			{
				name: 'Pressure',
				description:
					'Pressure is the application of force to something by something else in direct contact with it',
				treatment:
					'Eat a healthy diet. Reduce sodium in your diet. Exercise regularly. Cut back on caffeine. Reduce your stress.'
			}
		]
	},
	{
		name: 'Shoulder',
		symptoms: [
			{
				name: 'Weakness',
				description: 'Weakness is the feeling of body fatigue or tiredness.',
				treatment:
					'Turn to your usual activities slowly to avoid prolonging the fatigue. Be sure to drink extra fluids to avoid dehydration. Get extra rest while you are ill. Let your symptoms be your guide.'
			},
			{
				name: 'Swelling',
				description:
					'Body parts swell from injury or inflammation. It can affect a small area or the entire body.',
				treatment:
					'Rest and protect a sore area. Elevate the injured or sore area on pillows while applying ice and any time you are sitting or lying down. A low-sodium diet may help reduce swelling.'
			},
			{
				name: 'Limited Shoulder Movement',
				description:
					'Rotator cuff tears are a common cause of shoulder pain and disability in adults and can seriously inhibit many daily activities',
				treatment:
					'Range-of-motion exercises and, sometimes, numbing medications injected into the joint capsule. Arthroscopic surgery may be indicated to loosen the joint capsule so that it can move more freely.'
			}
		]
	},
	{
		name: 'Stomach',
		symptoms: [
			{
				name: 'Indigestion',
				description:
					'Indigestion is the pain or discomfort in the stomach associated with difficulty in digesting food.',
				treatment:
					'Try not to chew with your mouth open, talk while you chew, or eat too fast. This makes you swallow too much air, which can add to indigestion. Drink beverages after rather than during meals. Avoid late-night eating.'
			},
			{
				name: 'Vomiting',
				description:
					'Vomiting is the forcible emptying of the stomach in which the stomach has to overcome the pressures.',
				treatment:
					'Drink clear or ice-cold drinks. Eat light, bland foods (such as saltine crackers or plain bread). Avoid fried, greasy, or sweet foods.'
			},
			{
				name: 'Unexpected Weight Loss',
				description:
					'Unexplained weight loss is a decrease in body weight, when you did not try to lose the weight on your own.',
				treatment:
					"A good rule of thumb is to see your doctor if you've lost a significant amount — more than 5 percent of your weight — within 6 to 12 months. Remember, not all weight loss is serious."
			}
		]
	},
	{
		name: 'Leg',
		symptoms: [
			{
				name: 'Numbness',
				description: 'Numbness describes a loss of sensation or feeling in a part of your body.',
				treatment:
					'Many of the conditions that cause leg and foot numbness, such as nerve pressure, improve with rest. Icing, heating, and massaging can improve numbness. Epsom salt baths and mental techniques and stress reduction'
			},
			{
				name: 'Itching',
				description:
					'Itching is an uncomfortable sensation in the skin that feels as if something is crawling on the skin and makes the person want to scratch the affected area.',
				treatment:
					'Avoid items or situations that cause you to itch. Moisturize daily. Use creams, lotions or gels that soothe and cool the skin. Avoid scratching whenever possible. Try over-the-counter allergy medicine.'
			},
			{
				name: 'Ulceration of the skin',
				description:
					'An ulcer is a sore on the skin or a mucous membrane, accompanied by the disintegration of tissue.',
				treatment:
					'Treatment is typically to avoid the ulcer getting infected, remove any excess discharge, maintain a moist wound environment, control the edema, and ease pain caused by nerve and tissue damage.'
			}
		]
	}
];

function initialize() {
	// localStorage.removeItem('accounts');
	console.log(localStorage);

	// If key('accounts') exists...
	if (localStorage.getItem('accounts') != null) {
		information = JSON.parse(localStorage.getItem('accounts')); //sets array Information to parsed (Returns object) localStorage with key('accounts')
	}

	// Animation
	let overlay = document.querySelector('.overlay');
	let page = document.querySelector('.login-page');
	setTimeout(() => {
		page.classList.add('active');
		overlay.classList.add('active');
	}, 500);

	loginPage.style.animation = 'fadeIn 2s forwards .5s';
	loadLogin();
}

// NewUser class to create user object with name, email, password, and gender info
class NewUser {
	constructor(u, e, p, g, s) {
		this.username = u;
		this.email = e;
		this.password = p;
		this.gender = g;
		this.symptomInfo = s;
	}
}

// Adds eventListeners on loginpage
function refreshListeners() {
	if (currentScreen == 'login') {
		document.getElementById('login-btn').addEventListener('click', verifyLogin);
		document.getElementById('sign-up-btn').addEventListener('click', loadSignUp);
	}

	if (currentScreen == 'signup') {
		document.getElementById('go-back-btn').addEventListener('click', loadLogin);
		document.getElementById('new-signup-btn').addEventListener('click', createNewSignUp);
	}

	if (currentScreen == 'login' || currentScreen == 'signup') {
		let usernameInput = document.getElementById('username');
		let emailInput = document.getElementById('email');
		let passwordInput = document.getElementById('password');
		let inputs = [ usernameInput, emailInput, passwordInput ];

		for (m in inputs) {
			inputs[m].addEventListener('keydown', (e) => {
				if (e.keyCode === 13) {
					if (currentScreen == 'login') verifyLogin();
					else createNewSignUp();
				}
			});
		}
	}

	if (currentScreen == 'diag') {
		let listItems = symptomList.getElementsByTagName('LI');
		for (let i = 0; i < listItems.length; i++) {
			listItems[i].addEventListener('mouseover', (e) => {
				e.target.classList.add('delete-hover');
			});
			listItems[i].addEventListener('mouseleave', (e) => {
				e.target.classList.remove('delete-hover');
			});
			listItems[i].addEventListener('click', removeSymptomFromList);
		}

		let potentialListItems = potentialSymptomsList.getElementsByTagName('LI');
		for (let k = 0; k < potentialListItems.length; k++) {
			potentialListItems[k].addEventListener('click', displayDiagnosticReadout);
		}

		diagnosticBox.addEventListener('mouseover', () => {
			cursor.style.borderColor = '#000';
		});
		diagnosticBox.addEventListener('mouseleave', () => {
			cursor.style.borderColor = '#fff';
		});
		symptomBox.addEventListener('mouseover', () => {
			cursor.style.borderColor = '#000';
		});
		symptomBox.addEventListener('mouseleave', () => {
			cursor.style.borderColor = '#fff';
		});

		for (let i = 0; i < bodyParts.length; i++) {
			// Adds click event onto each body part circle
			bodyParts[i].addEventListener('click', renderSymptomList);

			// Cursor turns white when hovering over circle
			bodyParts[i].addEventListener('mouseover', () => {
				cursor.classList.add('highlight');
			});

			// Cursor turns normal when leaving circle
			bodyParts[i].addEventListener('mouseleave', () => {
				cursor.classList.remove('highlight');
			});
		}

		// Adds click event to clear button
		let clearBtn = document.querySelector('.clear-btn');
		clearBtn.addEventListener('click', clearAllSymptoms);

		// Adds 'Enter' Key event listener onto input box
		input.addEventListener('keydown', (e) => {
			if (e.keyCode === 13) {
				if (input.value == '' || input.value == null) return;
				addSymptomToList(input.value);
			}
		});
	}
}

// Loads Login Screen
function loadLogin() {
	loginPage.innerHTML = loginContent;
	currentScreen = 'login';
	refreshListeners();
}

// Loads Sign Up Screen
function loadSignUp() {
	loginPage.innerHTML = signUpContent;
	currentScreen = 'signup';
	refreshListeners();
}

// Checks if account matches account info in LocalStorage
function verifyLogin() {
	console.log('Verifying login...');

	let username = document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;

	for (i in information) {
		if (
			information[i].username == username &&
			information[i].email == email &&
			information[i].password == password
		) {
			currentUserEmail = email;
			return loadDiagnostic(information[i].gender, username);
		}
	}
	let wrongLogin = document.querySelector('.wrong-login');
	return (wrongLogin.style.visibility = 'visible');
}

// Creates new sign up, adds to localStorage, displays login screen
function createNewSignUp() {
	let username = document.getElementById('username').value;
	let email = document.getElementById('email').value;
	let password = document.getElementById('password').value;
	let gender;
	let inputs = [ username, email, password, gender ];

	// Assigns gender to gender
	let choice = document.getElementsByName('gender');
	for (i in choice) {
		if (choice[i].checked) gender = choice[i].value;
	}

	// Checks if any fields were left empty
	for (k in inputs) {
		if (inputs[k] == '' || gender == undefined) {
			return alert('Please fill out all fields');
		}
	}

	// Checks if account with same email was created
	for (j in information) {
		if (information[j].email == email) {
			return alert(
				'Account with this email already exists. Please create an new account with a different email.'
			);
		}
	}

	let newUser = new NewUser(username, email, password, gender, [
		{
			name: 'Head',
			listContent: ''
		},
		{
			name: 'Chest',
			listContent: ''
		},
		{
			name: 'Shoulder',
			listContent: ''
		},
		{
			name: 'Stomach',
			listContent: ''
		},
		{
			name: 'Leg',
			listContent: ''
		}
	]);

	information.push(newUser); // Pushes newUser info into information array with current LocalStorage objects
	saveToLocalStorage();
	console.log(localStorage.getItem('accounts'));

	// Clears inputs
	username.value = null;
	password.value = null;
	email.value = null;

	// Loads Login Screen
	loadLogin();
}

// Loads the diagnostic screen
function loadDiagnostic(gender, name) {
	currentScreen = 'diag';

	let img = document.getElementById(gender);
	loginPage.style.display = 'none'; // Login Screen disappears
	diagnosticPage.style.display = 'block'; // Diagnostic Page Appears
	img.style.display = 'block'; // Shows the image corresponding to gender
	cursor.style.borderColor = '#fff'; //Changes Cursor Color to white

	let patientName = document.getElementById('patient-name');
	patientName.innerHTML = `<span>Patient Name:   </span><span style="color: #8B0000">${name}</span>`; // Displays User's Name

	input.style.display = 'none';

	refreshListeners();
}

// Adds the symptom typed into input to the body part list
function addSymptomToList(value) {
	let selectedPart = symptomName.innerText; // Selected Body Part Name
	let newSymptom = document.createElement('LI'); // Creates new list item
	newSymptom.innerText = '• ' + value; // sets innerText of new list item
	symptomList.appendChild(newSymptom); // appends new list item onto symptom list
	getSymptomInfo(selectedPart).listContent = symptomList.innerHTML; // Sets the listContent of that body part to the current innerHTML of symptomList
	saveToLocalStorage();

	input.value = null; // Clears input field
	refreshListeners();
}

// Removes selected symptom from list
function removeSymptomFromList(e) {
	let item = e.target;
	item.classList.add('delete-complete'); // Red delete Animation

	setTimeout(() => {
		item.remove(); // Deletes symptom from list
		let selectedPart = symptomName.innerText; // Selected Body Part Name
		getSymptomInfo(selectedPart).listContent = symptomList.innerHTML; // Saves current listContent to user localStorage
		saveToLocalStorage();
	}, 250);
}

// Displays the Symptom List according to which body part is clicked
function renderSymptomList(e) {
	clearList(potentialSymptomsList);

	// Shows input, potentialSymptomsList, personalSymptomsList, and titles
	input.style.display = 'block';
	potentialSymptomsList.style.display = 'block';
	symptomList.style.display = 'block';
	potentialTitle.style.display = 'block';
	personalTitle.style.display = 'block';

	// Loads personal symptoms
	let selectedPart = e.target.getAttribute('data-body-part');
	symptomName.innerText = selectedPart; // Sets symptom name to selectedPart
	symptomList.innerHTML = getSymptomInfo(selectedPart).listContent; // Sets innerHTML of symptomList to the listContent of that body part

	// Loads Potential Symptoms
	for (i in potentialSymptoms) {
		if (potentialSymptoms[i].name == selectedPart) {
			for (j in potentialSymptoms[i].symptoms) {
				let item = document.createElement('LI');
				item.innerText = '• ' + potentialSymptoms[i].symptoms[j].name;
				potentialSymptomsList.appendChild(item);
			}
		}
	}
	refreshListeners();
}

function saveToLocalStorage() {
	localStorage.setItem('accounts', JSON.stringify(information));
}

function getSymptomInfo(selectedPart) {
	for (i in information) {
		// Loops through information list
		if (information[i].email == currentUserEmail) {
			// Checks if the email property of index information matches currentEmail
			for (j in information[i].symptomInfo) {
				// Loops through symptomInfo property array of the index information
				if (information[i].symptomInfo[j].name == selectedPart) {
					// Checks if the name property of each object in the array equals selectedPart
					let x = information[i].symptomInfo[j];
					return x;
				}
			}
		}
	}
}

function clearList(list) {
	while (list.firstChild) {
		list.removeChild(list.firstChild);
	}
}

// Clears all symptoms
function clearAllSymptoms() {
	for (i in information) {
		if (information[i].email == currentUserEmail) {
			// Checks for user account in localStorage
			for (j in information[i].symptomInfo) {
				information[i].symptomInfo[j].listContent = ''; // Clears all listContent for that user
			}
		}
	}
	symptomName.innerText = 'Please Select a Body Part';
	potentialSymptomsList.style.display = 'none';
	symptomList.style.display = 'none';
	potentialTitle.style.display = 'none';
	personalTitle.style.display = 'none';
	input.style.display = 'none';
	input.value = null;
}

// Displays Diagnostic Readout on left side once potential symptom is clicked
function displayDiagnosticReadout(e) {
	let selectedSymptom = e.target;
	let potentialListItems = potentialSymptomsList.getElementsByTagName('LI');
	for (let i = 0; i < potentialListItems.length; i++) {
		// Removes any other grey bar selector
		if (potentialListItems[i].classList.contains('selected')) {
			potentialListItems[i].classList.remove('selected');
			potentialListItems[i].getElementsByTagName('LI')[0].remove();
		}
	}
	selectedSymptom.classList.add('selected');

	for (k in potentialSymptoms) {
		for (m in potentialSymptoms[k].symptoms) {
			if ('• ' + potentialSymptoms[k].symptoms[m].name == selectedSymptom.innerText) {
				let part = selectedSymptom.innerText;
				let treatment = potentialSymptoms[k].symptoms[m].treatment; // Get the treatment information from object
				let desc = document.createElement('LI');
				let content = `
					<header>Diagnostic Readout: ${part}</header>
					<p>${treatment}</p>
				`;

				desc.innerText = potentialSymptoms[k].symptoms[m].description; // Assigns description from object to the new LI element
				desc.style.fontSize = '.8rem';
				selectedSymptom.appendChild(desc); // Appends desc to selected symptom

				diagnosticList.innerHTML = content; // Diagnostic readout set to content
			}
		}
	}
	refreshListeners();
}

// Circle Cursor movement
function cursorMove(e) {
	cursor.style.top = e.pageY + 'px';
	cursor.style.left = e.pageX + 'px';
}
