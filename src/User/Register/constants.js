import { validations } from '../validations.js'

const NAME = 'NAME'
const USERNAME = 'USERNAME'
const EMAIL = 'EMAIL'
const PASSWORD = 'PASSWORD'
const CONFIRM_PASSWORD = 'CONFIRM_PASSWORD'

export const inputs = [
    {
        inputId: NAME,
        label: 'Name',
        type: 'text',
        placeholder: 'John Smith',
        validation: validations.nameIsValid,
        field: 'name'
    },
    {
        inputId: USERNAME,
        label: 'Username',
        type: 'text',
        placeholder: 'jsmith',
        validation: validations.usernameIsValid,
        field: 'username'
    },
    {
        inputId: EMAIL,
        label: 'Email',
        type: 'text',
        placeholder: 'jsmith@example.org',
        validation: validations.emailIsValid,
        field: 'email'
    },
    {
        inputId: PASSWORD,
        label: 'Password',
        type: 'password',
        placeholder: '●●●●●●●',
        validation: validations.passwordIsValid,
        field: 'password'
    },
    {
        inputId: CONFIRM_PASSWORD,
        label: 'Confirm Password',
        type: 'password',
        placeholder: '●●●●●●●',
        validation: validations.confirmPassword
    }
]

export const links = [
    {
        text: 'Login',
        href: '/login'
    }
]

