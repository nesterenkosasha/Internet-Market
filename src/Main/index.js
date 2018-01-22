import React from 'react'
import './style.scss'
import { Link, browserHistory } from 'react-router'

export default class Main extends React.PureComponent{
    constructor(props){
        super(props)
    }
    handelSignIn = () => {
        browserHistory.push('/login')
    }

    handelSignUp = () => {
        browserHistory.push('/register')
    }

    render(){
        return(
            
                <div className='mainComponentClass'>
                <nav>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <div className="field is-grouped">
                                <p className="control">  
                                    <button 
                                        className="button is-info"
                                        onClick={this.handelSignIn}
                                        >
                                        Sign In
                                    </button>                         
                                </p>
                                <p className="control">      
                                    <button 
                                        className="button is-info"
                                        onClick={this.handelSignUp}
                                        >
                                        Sign Up
                                    </button>                                              
                                </p>
                            </div>
                        </div>
                    </div>             
                </nav>
                <div id='mainTitle'>
                <h1>Candy store</h1>
                </div>
            </div>
        )
    }
} 