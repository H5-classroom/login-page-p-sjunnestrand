const header = document.getElementById('header');
console.log(header);

//creates fields and button for logging in
let userInputField = document.createElement('input');
let pswInputField = document.createElement('input');
pswInputField.setAttribute('class', 'inputField');
userInputField.setAttribute('class', 'inputField');

const btnLogIn = document.createElement('button');
btnLogIn.setAttribute('class', 'btnLogIn');
btnLogIn.textContent = 'Log in';

const headDynamic = document.getElementById('headDynamic');

headDynamic.append(userInputField, pswInputField, btnLogIn);

//array object with usernames and passwords
let credentials = [
    {
        'user' : 'janne',
        'psw' : 'test'
    },
    {
        'user' : 'petter',
        'psw' : 'password'
    },
    {
        'user' : 'gordon',
        'psw' : 'freeman'
    }
];

//Click on button to validate username and password
btnLogIn.addEventListener('click', function (){
    //console.log(credentials.user[2]);
    let userInput = userInputField.value;
    let pswInput = pswInputField.value;
    //console.log(userInput, pswInput);
    for (cred in credentials.user) {
        console.log(credentials.user[cred]);
        if (credentials.user[cred] === userInput){
            for (cred in credentials.psw){
                if (credentials.psw[cred] === pswInput){
                    console.log('hello!');
                    break;
                }
            } 
            break; 
        } else { 
            console.log('no!');
            }
        }
});



