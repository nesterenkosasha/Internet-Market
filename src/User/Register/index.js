import React from 'react'
import { browserHistory } from 'react-router'
import '../style.scss'
import InputComponent from './components/Input'
import ButtonComponent from './components/Button'
import LinkComponent from './components/Link'
import { inputs, links } from './constants.js'
import { setItem, getItem } from '../helper.js'


export default class Register extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
            errors: {}
        }
    }
    handelRegisterClick = async() => {
        const users = await getItem("users").catch(() => Promise.resolve([]))
        const { errors, user} = await inputs.reduce( async(acc, {field, inputId, validation}) => {
            const _acc = await acc
            try{    
                const value = this[inputId].value           
                switch(inputId) {
                    case 'CONFIRM_PASSWORD': {
                        const passwordValue = this['PASSWORD'].value
                        await validation (passwordValue, value)
                        break
                    }
                    default: await validation (value)
                }

                if(field == 'email'){
                    if (users.find(({email}) => email == value)){
                        throw new Error("This email already exists!")
                    }
                }

                if(field) _acc.user[field] = value
                return Promise.resolve(_acc)
            } catch({message}) {
                _acc.errors.push({[inputId]: message})
                return Promise.resolve(_acc)                   
                }
            }, Promise.resolve({ errors: [], user: {} }))
        if(!errors.length) {
            users.push(user)
            await Promise.all([
                setItem('users', users),
                setItem('user', user)
            ])
            browserHistory.push("/market")
        } else {
             this.setState(() => {
            const _errors = errors.reduce((acc, error) => {
                acc = {...acc, ...error}
                return acc
            }, {})
            return {
                errors: _errors
            }
        })
        }  
    }

    handelButtonClickCancel = () => {
        browserHistory.push('/main')
    }


    handelBlur = async (inputId, validation, value) => {
        try{
            switch(inputId) {
                case 'CONFIRM_PASSWORD': {
                    const passwordValue = this['PASSWORD'].value
                    await validation (passwordValue, value)
                    break
                }
                default: {
                    await validation (value)
                }}
                this.setState(({errors}) => {
                    delete errors[inputId]
                    return {
                        errors: {
                            ...errors
                        }
                    }
                })           
        } catch ({ message }) {
            this.setState(({errors}) => ({
                errors: {
                    ...errors,
                    [inputId]: message
                }
            }))
        }
    }
    
    render(){
        const { errors } = this.state
        const disabled = !!Object.keys(errors).length
        return(
            <div>
                <section className="hero is-fullheight is-dark is-bold">
                    <div className="hero-body">
                        <div className="container">
                            <div className="columns is-vcentered">
                                <div className="column is-4 is-offset-4">
                                    <h1 className="title">
                                    Register an Account
                                    </h1>
                                    <div className="box">                                                                           
                                        {
                                            inputs.map(({ label, type, placeholder, inputId, validation }, index) => (
                                                < InputComponent 
                                                key={index}
                                                isValid={!!errors[inputId]}
                                                inputRef={el => this[inputId] = el}
                                                handelBlur={this.handelBlur}
                                                label={label}
                                                type={type}
                                                placeholder={placeholder}
                                                inputId={inputId}
                                                validation={validation}
                                                />
                                            ))
                                        }            
                                        <hr />
                                        <p className='control'>
                                            <ButtonComponent
                                                classButton={['is-primary']} 
                                                text={'Register'}
                                                handelButtonClick={this.handelRegisterClick}
                                                isDisabled={disabled}
                                            />                                           
                                            <ButtonComponent
                                                handelButtonClick={this.handelButtonClickCancel}
                                                classButton={['is-default']}
                                                text={'Cancel'}
                                            />                                                 
                                        </p>
                                    </div>
                                    <p className="has-text-centered">
                                        {
                                            links.map((link, index) => (
                                                <span key={index}>
                                                    < LinkComponent                               
                                                    {...link}
                                                    />
                                                    {
                                                        links.length == index + 1
                                                        ? ''
                                                        : '|'
                                                    }
                                                </span>
                                            ))
                                        }
                                    </p>    
                                </div>
                            </div>    
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
                                                    // try{
                                                    //     switch(inputId) {
                                                    //         case `${CONFIRM_PASSWORD}`: {
                                                    //             const passwordValue = this.PASSWORD.value
                                                    //             console.log(passwordValue)
                                                    //             await validation(passwordValue, value) 
                                                    //             break
                                                    //         } 
                                                    //         default: {
                                                    //             await validation(value)
                                                    //         }
                                                    //     }
                                                    //     console.log("OK", inputId, validation, value)
                                                    //     this.setState(({errors}) => {
                                                    //         console.log(errors)
                                                    //        if(errors.inputId) delete errors.inputId
                                                    //         return {
                                                    //             errors: {...erorrs}
                                                    //         }
                                                    //     })
                                                    // } catch({message}) {
                                                    //     this.setState(({errors}) => ({
                                                    //         errors: {
                                                    //             ...errors,
                                                    //             [inputId]: message
                                                    //         }
                                                    //     }))
                                                    //     console.error(this.state)
                                                    // }