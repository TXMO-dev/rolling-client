import React from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import HomePage from './pages/homepage/home.pages';
import LoginPage from './pages/loginpage/login.pages';
import RegisterPage from './pages/registerpage/register.pages';  
import DashboardPage from './pages/Dashboard/dashboard.pages';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/client';
import ForgotPage from './pages/forgotpage/forgot.pages';
import ResetPage from './pages/resetpage/reset.pages';  

const IS_LOGGED_IN = gql`
  query IsUserLoggedIn{
    isLoggedin @client
  }
`


const App = () => {
  const {data} = useQuery(IS_LOGGED_IN);
  return (
    <div>
      <Switch>
          <Route exact path='/' render={(props) => data.isLoggedin ? <Redirect to = '/dashboard'/>:<HomePage {...props}/>}/>
          <Route exact path='/login' render={(props) => data.isLoggedin ? <Redirect to = '/dashboard'/>:<LoginPage {...props}/>} />
          <Route exact path='/register' render={(props) => data.isLoggedin ? <Redirect to = '/dashboard'/>:<RegisterPage {...props}/>} />
          <Route exact path='/forgotpassword' render={(props) => data.isLoggedin ? <Redirect to = '/dashboard'/>:<ForgotPage {...props}/>} />
          <Route exact path='/forgotpassword/:resetToken' render={(props) => data.isLoggedin ? <Redirect to = '/dashboard'/>:<ResetPage {...props}/>} /> 
          <Route path='/dashboard' component={DashboardPage} />     
      </Switch>
    </div>
  );
}

export default App;
  