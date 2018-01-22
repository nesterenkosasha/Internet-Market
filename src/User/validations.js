 const nameIsValid = async function(value) {
    const regExp = /^[A-Z]{1}[a-z]+\s[A-Z]{1}[a-z]+$/
    
    if(!regExp.test(value)) throw new Error('Name is not valid')
} 

 const usernameIsValid = async function(value) {
    const regExp = /^[^\s]{4,}$/i
    
    if(!regExp.test(value)) throw new Error('Username is not valid')
} 

 const emailIsValid = async function(value) {
    const regExp = /^[^\s]+\@[a-z]+\.[a-z]{3,4}$/i
    
    if(!regExp.test(value)) throw new Error('Email is not valid')
} 

 const passwordIsValid = async function(value) {
    const regExp = /^[^\s]{6,}$/i
    
    if(!regExp.test(value)) throw new Error('Password is not valid')
}

const confirmPassword = async function( passwordValue, value) {

    if(passwordValue !== value || !value) throw new Error('You should confirm your password')
}

export const validations = {
    nameIsValid,
    usernameIsValid,
    emailIsValid,
    passwordIsValid,
    confirmPassword
}