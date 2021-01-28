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

const btnSignUp = document.createElement('button');
btnSignUp.setAttribute('class', 'btnLog btnSignUp');
btnSignUp.textContent = 'Sign up';

const headDynamic = document.getElementById('headDynamic');

const btnLogOut = document.createElement('button');
btnLogOut.setAttribute('class', 'btnLog btnLogOut');
btnLogOut.textContent = 'Log out';

//headDynamic.append(userInputField, pswInputField, btnLogIn, btnSignUp);

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
let userDataBase;

if (localStorage.getItem('userDataBase') == null) {
    localStorage.setItem('userDataBase', JSON.stringify(credentials));
    console.log('finns ej');
} else {
    console.log('finns!');
}
userDataBase = JSON.parse(localStorage.getItem('userDataBase'));
console.log(userDataBase);
//localStorage.setItem('userDataBase', JSON.stringify(credentials));
//console.log(localStorage.getItem('userDataBase'));

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
//Adds logged in main w personal welcome msg
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
    wcMessage.innerHTML = 'Choose username and password for you account';
    welcome.appendChild(signUpDiv);
}
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
btnSignUp.addEventListener('click', function(){
    mainSignUp();
});
btnCancel.addEventListener('click', function(){
    mainLogOut();
});
btnCreateAccount.addEventListener('click', function(){
    console.log('click');
    if (signUpName.value === '' || signUpPsw.value === '') {
        wcMessage.innerHTML = 'Username and password must be at least one charachter long each!'
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