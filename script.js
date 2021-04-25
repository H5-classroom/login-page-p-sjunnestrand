// const { stringify } = require("qs");

// LOCAL SERVER
// const fetchAPI = {
//     login : 'http://localhost:3000/login/',
//     subscribe : 'http://localhost:3000/login/subscribe/',
//     createAccount : 'http://localhost:3000/login/createAccount/',
//     loggedIn : 'http://localhost:3000/login/loggedIn/'
// }
// CLOUD SERVER
const fetchAPI = {
    login : 'https://sjunnestrand-login-server.herokuapp.com/login/',
    subscribe : 'https://sjunnestrand-login-server.herokuapp.com/login/subscribe/',
    createAccount : 'https://sjunnestrand-login-server.herokuapp.com/login/createAccount/',
    loggedIn : 'https://sjunnestrand-login-server.herokuapp.com/login/loggedIn/'
}

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
signUpPsw.setAttribute('type', 'password');

const signUpEmail = document.createElement('input');
signUpEmail.setAttribute('class', 'inputField inputFieldSignUp');

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
let textUserEmail = document.createElement('label');
textUserEmail.setAttribute('for', 'email');
textUserEmail.insertAdjacentHTML('beforeend', 'Email:');

const newsLetterSignUpDiv = document.createElement('div');
newsLetterSignUpDiv.classList.add('newsLetterSignUpDiv');
const newsLetterSignUpCheckDiv = document.createElement('div');
newsLetterSignUpCheckDiv.classList.add('newsLetterSignUpCheckDiv');
newsLetterSignUpCheckDiv.insertAdjacentHTML('beforeend', `<input type = "checkbox" id = "newsLetterSignUpCheckBox">`);
const newsLetterSignUpText = document.createElement('div');
newsLetterSignUpText.classList.add('newsLetterSignUpText');
newsLetterSignUpText.innerHTML = 'Sign me up for the Black Mesa newsletter.';

newsLetterSignUpDiv.append(newsLetterSignUpCheckDiv, newsLetterSignUpText);


signUpDiv.append(textUserName, textUserPsw, signUpName, textUserPsw, signUpPsw, textUserEmail, signUpEmail, newsLetterSignUpDiv, btnCreateAccount, btnCancel);

mainSect.appendChild(welcome);
welcome.appendChild(wcMessage);

//initial page load checks if user is logged in or not and adds appropriate content
let userLog = localStorage.getItem('userId');
// console.log(userLog);
if (userLog !== null) {
    loggedInPageLoad(userLog);
} else {
    mainLogOut();
    headerLogOut();
};
//Function to validate username and password on button click. Adds username to local storage if correct.
function checkLogIn() {
    //sends entered values to server
    let userInput = {"user": userInputField.value, "password": pswInputField.value};
    // console.log(userInput);
    fetch(fetchAPI.login , {
        method: 'post',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(userInput)
    })
    //checks answer from server
    .then(res => res.json())
    .then(res => {
        // console.log(res)
        if(res.user == "denied"){
            // console.log("denied!");
            mainError();
        } else {
            // console.log("welcome!");
            // console.log(res);
            mainLogIn(res);
            headerLogIn();
        }
    })
}
//Adds logged in main content w personal welcome msg and adds _id to LS
function mainLogIn(userName) {
    userInputField.value = '';
    pswInputField.value = '';
    signUpDiv.remove();
    localStorage.removeItem('userId');
    localStorage.setItem('userId', userName._id);
    // console.log(localStorage.getItem('userId'));
    // console.log(userName.newsletter);
    wcMessage.innerHTML = '';

    wcMessage.insertAdjacentHTML('beforeend', `<div>Welcome ${userName.user}!</div>
                                <div>${userName.newsletter ? "You are subscribed to the Black Mesa newsletter with email: " + userName.email : "You are NOT subscribed to the Black Mesa newsletter with email: " + userName.email}</div>
                                <button class = "btnLog" id = "newsletterSubBtn">${userName.newsletter ? "Unsubscribe" : "Subscribe"}</button>`);
    document.getElementById('newsletterSubBtn').addEventListener('click', () => {

        let userSubPost = {"user": userName.user, "_id": userName._id, "newsletter": userName.newsletter}
        fetch (fetchAPI.subscribe, {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userSubPost)
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            
            // console.log(localStorage.getItem('userId'));
            mainLogIn(data);
            headerLogIn();
        })
        // console.log(userSubPost);
    });
};
//Adds logged out main w generic welcome msg
function mainLogOut() {
    signUpDiv.remove();
    localStorage.removeItem('userId');
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
    wcMessage.innerHTML = 'Choose username and password for your account.';
    welcome.appendChild(signUpDiv);
    if (document.getElementById('newsLetterSignUpCheckBox').checked == false){
        // console.log('not checked');
    } else {
        // console.log('checked');
    }
}
//Adds confirmation when new account is created
function mainAccCreated(createdUser) {
    signUpDiv.remove();
    wcMessage.innerHTML = '';
    wcMessage.insertAdjacentHTML('beforeend', `Account with username ${createdUser.user} created!`);
    setTimeout(()=>{mainLogIn(createdUser); headerLogIn();}, 1000);
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
    checkLogIn();
});
//log out btn click
btnLogOut.addEventListener('click', function(){
    headerLogOut();
    mainLogOut();
});
//sign out btn click
btnSignUp.addEventListener('click', function(){
    signUpName.value = '';
    signUpPsw.value = '';
    mainSignUp();
});
//cancel button click
btnCancel.addEventListener('click', function(){
    mainLogOut();
});
//create account btn click. Creates account with entered username & psw & pushes object to array & LS. If fields are empty, gives error msg.
btnCreateAccount.addEventListener('click', function(){
    // console.log('click');
    if (signUpName.value === '' || signUpPsw.value === '') {
        wcMessage.innerHTML = 'Username and password must be at least one character long each!'
    } else {
        let newUser = {
            "user" : signUpName.value,
            "password" : signUpPsw.value,
            "email" : signUpEmail.value,
            "newsletter" : document.getElementById('newsLetterSignUpCheckBox').checked
        }
        fetch(fetchAPI.createAccount, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(res => res.json())
        .then(data => {
            if(data == "taken"){
                wcMessage.insertAdjacentHTML('afterbegin', `<div id = "warningMsg">Username not available! Please pick another!</div>`);
            } else {
                // console.log(data);
                mainAccCreated(data);
            }
            
        })
    };
});
function loggedInPageLoad(userIdLS) {
    let userIdPost = {"_id": userIdLS}
    // console.log(userIdPost);
    fetch (fetchAPI.loggedIn, {
        method: 'post',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(userIdPost)
    })
    .then(res => res.json())
    .then(data => {
        // console.log(data);
        // console.log(localStorage.getItem('userId'));
        mainLogIn(data);
        headerLogIn();
    })
}

//http://localhost:3000/
//https://sjunnestrand-login-server.herokuapp.com/

//TODO: clean up code!
//TODO: change fetch-URLs to variable