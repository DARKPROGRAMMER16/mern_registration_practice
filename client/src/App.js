import React, { createContext, Fragment, useReducer } from 'react'
import { Route,Switch } from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Login from './components/Login'
import Signup from './components/Signup'
import Error404 from './components/Error404';
import Logout from './components/Logout';

import {reducer, initialState} from './reducer/UseReducer';


// 1.create context
export const UserContext = createContext();

const Routing = () => {
  return (
    <Switch>
      <Route exact path='/'>
        <Home/>
      </Route>

      <Route path='/aboutus'>
        <About/>
      </Route>

      <Route path='/contact'>
        <Contact/>
      </Route>

      <Route path='/login'>
        <Login/>
      </Route>

      <Route path='/signup'>
        <Signup/>
      </Route>

      <Route path='/logout'>
        <Logout/>
      </Route>

      <Route>
        <Error404/>
      </Route>
    </Switch>
  )
}

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <Fragment>
      <UserContext.Provider value={{state,dispatch}}>
        <Navbar/>
        <Routing/>
      </UserContext.Provider>


    </Fragment>
  )
}

export default App
