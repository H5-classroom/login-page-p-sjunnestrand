const header = document.getElementById('header');
const mainSect = document.getElementById('main');
//console.log(header);

//creates fields and button for logging in
let userInputField = document.createElement('input');
let pswInputField = document.createElement('input');
pswInputField.setAttribute('class', 'inputField');
userInputField.setAttribute('class', 'inputField');

const btnLogIn = document.createElement('button');
btnLogIn.setAttribute('class', 'btnLog');
btnLogIn.textContent = 'Log in';

const headDynamic = document.getElementById('headDynamic');

headDynamic.append(userInputField, pswInputField, btnLogIn);

const btnLogOut = document.createElement('button');
btnLogOut.setAttribute('class', 'btnLog btnLogOut');
btnLogOut.textContent = 'Log out';


//creates dynamic items for main
let welcome = document.createElement('section');
let wcMessage = document.createElement('h1');
wcMessage.setAttribute('class', 'welcome')

//wcMessage.insertAdjacentHTML('beforeend', 'Welcome visitor!');
mainSect.appendChild(welcome);
welcome.appendChild(wcMessage);

//object array with usernames and passwords
let credentials = [
    {
        user : 'janne',
        psw : 'test'
    },
    {
        user : 'petter',
        psw : 'password'
    },
    {
        user : 'gordon',
        psw : 'freeman'
    },
];
//initial page load checks if user is logged in or not
let userLog = localStorage.getItem('userName');
//console.log(userLog);
if (userLog !== null) {
    mainLogIn();
    headerLogIn();
} else {
    mainLogOut();
    headerLogOut();
};
//Function to validate username and password on button click. Adds username to local storage if correct.
function checkLogIn() {
    let userInput = userInputField.value;
    let pswInput = pswInputField.value;
    //console.log(credentials);
    for (cred in credentials) {
        //console.log(credentials[cred].psw);
        if (credentials[cred].user === userInput && credentials[cred].psw === pswInput){
            localStorage.setItem('userName', credentials[cred].user);
            //userName = localStorage.getItem('userName');
            return true;
        } else {
            //console.log(cred);
            continue;
        }
    }
}
//Adds logged in main w personal welcome msg
function mainLogIn() {
    userLog = localStorage.getItem('userName');
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', `Welcome ${userLog}!`);
};
//Adds logged out main w generic welcome msg
function mainLogOut() {
    localStorage.clear();
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', 'Welcome visitor!');
};
//Adds logged in header w/o log in fields/btn & w log out btn
function headerLogIn() {
    userInputField.remove();
    pswInputField.remove();
    btnLogIn.remove();
    //console.log('header update!');
    headDynamic.appendChild(btnLogOut);
};
//Adds logged out header w log in fields/btn
function headerLogOut() {
    btnLogOut.remove();
    headDynamic.append(userInputField, pswInputField, btnLogIn);
}
//log in button click
btnLogIn.addEventListener('click', function() {
   // console.log(checkLogIn());
    if (checkLogIn()){
        //console.log('Welcome!');
        mainLogIn();
        headerLogIn();
    } else {
        //console.log('Acces denied!');
    }
});
//log out btn click
btnLogOut.addEventListener('click', function(){
    headerLogOut();
    mainLogOut();
});