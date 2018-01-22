import React from 'react'
import { Link, browserHistory } from 'react-router'
import ButtonComponent from './components/Button'
import LinkComponent from './components/Link'
import InputComponent from './components/Input'
import { validations } from '../validations.js'
import '../style.scss'
import './style.scss'
import { getItem, setItem } from '../helper.js'

const inputs = [
  {
    inputClass: ['email-input'],
    inputId: 'EMAIL',    
    type: 'text',
    placeholder: 'jsmith@example.org',
    iconClass: ['fa-user'],
    validation: validations.emailIsValid,
    field: 'email'
  },
  {
    inputClass: ['password-input'],
    inputId: 'PASSWORD',
    type: 'password',
    placeholder: '●●●●●●●',
    iconClass: ['fa-lock'],
    validation: validations.passwordIsValid,
    field: 'password'
  }
]

export default class Login extends React.PureComponent{
    constructor(props){
        super(props)
        this.state = {
          errors: {}
        }
    }

    handelLoginClick = async() => {

      const users = await getItem("users").catch(() => Promise.resolve([]))
      console.log(users)

      const { errors, user } = await inputs.reduce(async(acc, {field, inputId, validation}) => {
        const _acc = await acc
        const value = this[inputId].value
        try{
          await validation(value)
          _acc.user[field] = value
          return Promise.resolve(_acc)
        } catch({message}) {
          _acc.errors.push({ [inputId]: message })
          return Promise.resolve(_acc)
        }
      }, Promise.resolve({ errors: [], user: {} }))
      if(errors.length) {
        this.setState(() => {
          const _errors = errors.reduce((acc, error) => {
            if(error) acc = {...acc, ...error}
            return acc
          }, {})
          return { errors: _errors }
        })
      } else {
        const _user = users.find(({email, password}) => email == user.email && password == user.password)
        if(_user) {
          await setItem('user', _user)
          browserHistory.push('/market')
        } else {
          this.setState({
            errors: inputs.reduce((acc, { inputId }) => {
              acc[inputId] = "Is not valid"
              return acc
            }, {})
          })
        }
      }
    }

    handelInputBlur = async(inputId, validation, value) => {
     try{
      await validation(value)
        this.setState(({errors}) => {
          delete errors[inputId]
          return {
            errors: {...errors}
          }
        })
     } catch({message}) {
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
      const isValid = !!Object.keys(errors).length
        return(
            <div>
                <div className="login-wrapper columns">
                  <div className="column is-8 is-hidden-mobile hero-banner">
                    <section className="hero is-fullheight is-dark">
                      <div className="hero-body">
                        <div className="container section">
                          <div className="has-text-right">
                            <h1 className="title is-1">Login</h1> <br />
                            <p className="title is-3">Secure User Account Login</p>
                          </div>
                        </div>
                      </div>
                      <div className="hero-footer">
                        <p className="has-text-centered">Image © Glenn Carstens-Peters via unsplash</p>
                      </div>
                    </section>  
                  </div>
                  <div className="column is-4">
                    <section className="hero is-fullheight">
                      <div className="hero-heading">
                        <div className="section has-text-centered">
                          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma logo" width="150px" />
                        </div>
                      </div>
                      <div className="hero-body">
                        <div className="container">
                          <div className="columns">
                            <div className="column is-8 is-offset-2">
                              <h1 className="avatar has-text-centered section">
                                <img src="https://unsplash.it/128x128" />
                              </h1>
                              <div className="login-form">
                                {
                                  inputs.map(({inputId, isValid, inputClass, type, placeholder, iconClass, validation }, index) => (
                                    <InputComponent 
                                    isValid={errors[inputId]}
                                    handelInputBlur={this.handelInputBlur}
                                    key={index}
                                    inputRef={el => this[inputId] = el}
                                    inputId={inputId}
                                    inputClass={inputClass}
                                    type={type}
                                    placeholder={placeholder}
                                    iconClass={iconClass}
                                    validation={validation}
                                    /> 
                                  ))
                                }
                                <p className="control login">
                                  <ButtonComponent 
                                      isDisabled={isValid}
                                      handelClick={this.handelLoginClick}
                                      buttonClassNames={['button', 'is-success', 'is-outlined', 'is-large', 'is-fullwidth']}
                                      text={'Login'}
                                  />
                                </p>
                              </div>
                              <div className="section forgot-password">
                                <p className="has-text-centered">
                                  <LinkComponent 
                                  href={'/register'}
                                  text={'Log up'}
                                  />
                                  <LinkComponent 
                                  href={'/main'}
                                  text={'Logout'}
                                  />                                                    
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>  
                  </div>
                </div>
            </div>
        )
    }
}