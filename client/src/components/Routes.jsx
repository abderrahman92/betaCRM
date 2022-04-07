import React from 'react'

import { Route, Switch } from 'react-router-dom'

import Dashboard from '../pages/Dashboard'
import Societes from '../pages/Customers'
import Register from '../pages/Register'
import Login from '../pages/Login'

const Routes = () => {
    return (
        <Switch>
            <Route path='/' exact component={Dashboard}/>
            <Route path='/Societes' component={Societes}/>
            <Route path='/register' component={Register}/>
            <Route path='/Login' component={Login}/>
        </Switch>
    )
}

export default Routes
