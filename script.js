//imports header and main sections
const header = document.getElementById('header');
const mainSect = document.getElementById('main');
//console.log(header);

const circleFrst = document.createElement('div');
circleFrst.setAttribute('class', 'circle');
const circleScnd = document.createElement('div');
circleScnd.setAttribute('class', 'circle');
circleScnd.classList.add('circle2');
mainSect.append(circleFrst, circleScnd);

//creates fields and button for logging in
let userInputField = document.createElement('input');
userInputField.setAttribute('class', 'inputField');
userInputField.setAttribute('placeholder', 'Username...')
let pswInputField = document.createElement('input');
pswInputField.setAttribute('class', 'inputField');
pswInputField.setAttribute('type', 'password');
pswInputField.setAttribute('placeholder', 'Password...')


const btnLogIn = document.createElement('button');
btnLogIn.setAttribute('class', 'btnLog');
btnLogIn.textContent = 'Log in';

//creates sign up button
const btnSignUp = document.createElement('button');
btnSignUp.setAttribute('class', 'btnLog btnSignUp');
btnSignUp.textContent = 'Sign up';

//creates field for login inputs & btn
const headDynamic = document.createElement('div');
headDynamic.setAttribute('class', 'inputs');
header.appendChild(headDynamic);

//creates log out button
const btnLogOut = document.createElement('button');
btnLogOut.setAttribute('class', 'btnLog btnLogOut');
btnLogOut.textContent = 'Log out';

//creates dynamic items for main
let welcome = document.createElement('section');
let wcMessage = document.createElement('h1');
wcMessage.setAttribute('class', 'welcome')

//Main contents for creating account (sign up)
let signUpDiv = document.createElement('div');
signUpDiv.setAttribute('class', 'signUpDiv');

const signUpName = document.createElement('input');
const signUpPsw = document.createElement('input');
signUpName.setAttribute('class', 'inputField inputFieldSignUp');
signUpPsw.setAttribute('class', 'inputField inputFieldSignUp');

const btnCreateAccount = document.createElement('button');
btnCreateAccount.setAttribute('class', 'btnLog btnCreate');
btnCreateAccount.textContent = 'Create Account';

const btnCancel = document.createElement('button');
btnCancel.setAttribute('class', 'btnLog btnCreate');
btnCancel.textContent = 'Cancel';

let textUserName = document.createElement('label');
textUserName.setAttribute('for', 'userName');
textUserName.insertAdjacentHTML('beforeend', 'Username:');
let textUserPsw = document.createElement('label');
textUserPsw.setAttribute('for', 'password');
textUserPsw.insertAdjacentHTML('beforeend', 'Password:');

signUpDiv.append(textUserName, textUserPsw, signUpName, textUserPsw, signUpPsw, btnCreateAccount, btnCancel);

mainSect.appendChild(welcome);
welcome.appendChild(wcMessage);

//initial object array with usernames and passwords
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
//array that copies what's in localStorage
let userDataBase;

//checks wether localStorage exists and updates it with array if not
if (localStorage.getItem('userDataBase') == null) {
    localStorage.setItem('userDataBase', JSON.stringify(credentials));
    console.log('finns ej');
}
//copies LS into array
userDataBase = JSON.parse(localStorage.getItem('userDataBase'));
console.log(userDataBase);
//console.log(localStorage.getItem('userDataBase'));

//initial page load checks if user is logged in or not and adds appropriate content
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
    //console.log(userDataBase);
    for (user in userDataBase) {
        //console.log(userDataBase[user].psw);
        if (userDataBase[user].user === userInput && userDataBase[user].psw === pswInput){
            localStorage.setItem('userName', userDataBase[user].user);
            return true;
        } else {
            continue;
        }
    }
}
//Adds logged in main content w personal welcome msg
function mainLogIn() {
    signUpDiv.remove();
    userLog = localStorage.getItem('userName');
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', `Welcome ${userLog}!`);
};
//Adds logged out main w generic welcome msg
function mainLogOut() {
    signUpDiv.remove();
    localStorage.removeItem('userName');
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', 'Welcome visitor!');
};
//Adds error message when username/password is wrong
function mainError() {
    signUpDiv.remove();
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', 'User not recognised. Please check your username and/or password.')
}
//Adds fields for creating new account in main
function mainSignUp(){
    wcMessage.innerHTML = 'Choose username and password for you account.';
    welcome.appendChild(signUpDiv);
}
//Adds confirmation when new account is created
function mainAccCreated() {
    signUpDiv.remove();
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', `Account with created!`);
}
//Adds logged in header w/o log in fields/btn & w log out btn
function headerLogIn() {
    userInputField.remove();
    pswInputField.remove();
    btnLogIn.remove();
    btnSignUp.remove();
    //console.log('header update!');
    headDynamic.appendChild(btnLogOut);
};
//Adds logged out header w log in fields/btn
function headerLogOut() {
    btnLogOut.remove();
    headDynamic.append(userInputField, pswInputField, btnLogIn, btnSignUp);
}
//log in button click
btnLogIn.addEventListener('click', function() {
    // console.log(checkLogIn());
    if (checkLogIn()){
        //console.log('Welcome!');
        mainLogIn();
        headerLogIn();
    } else {
        mainError();
        //console.log('Acces denied!');
    }
});
//log out btn click
btnLogOut.addEventListener('click', function(){
    headerLogOut();
    mainLogOut();
});
//sign out btn click
btnSignUp.addEventListener('click', function(){
    mainSignUp();
});
//cancel button click
btnCancel.addEventListener('click', function(){
    mainLogOut();
});
//create account btn click. Creates account with entered username & psw & pushes object to array & LS. If fields are empty, gives error msg.
btnCreateAccount.addEventListener('click', function(){
    console.log('click');
    if (signUpName.value === '' || signUpPsw.value === '') {
        wcMessage.innerHTML = 'Username and password must be at least one character long each!'
    } else {
        let newUser = {
            user : signUpName.value,
            psw : signUpPsw.value
        }
        userDataBase.push(newUser);
        localStorage.setItem('userDataBase', JSON.stringify(userDataBase));
        console.log(newUser);
        console.log(userDataBase);
        mainAccCreated();
    };
});