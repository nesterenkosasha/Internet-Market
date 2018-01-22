import React from 'react'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import Register from '../User/Register'
import Login from '../User/Login'
import Main from '../Main'
import Order from '../InternetMarket/Order'
import Market from '../InternetMarket/Market'
import { getItem } from "../User/helper.js"


export default class RootRouter extends React.PureComponent {

  isAuth = async() => {
    try{
      const user = await getItem('user')
      if(!user) throw new Error ('Your account is underfined!')
    } catch({message}) {
      console.error(message)
      browserHistory.push('/')
    }
  }

  render() {
    return (
      <Router history={browserHistory}>
        <Route path='/'>
          <IndexRoute component={Main} />
          <Route path='main' component={Main} />
          <Route path='login' component={Login} />
          <Route path='register' component={Register} />
            <Route path='market' onEnter={this.isAuth} component={Market} >
              <Route path='order' component={Order} />
            </Route>
          </Route>
      </Router>
    )
  }
}