import React from 'react';
import {useState} from "react";
import {motion} from "framer-motion";
import { IoMdPerson } from "react-icons/io";
import { IoIosKey } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import Homepage from './components/homepage.js'; 
import Full_vault from './components/full_vault';
import './login.css';

// animated emojis on this website
// https://animated-fluent-emoji.vercel.app/

const TextAnimation = () => {
  return <motion.h2
  className='login-heading'
  initial ={{y : 25 , opacity :0}}
  animate ={{y : 0 , opacity :1}}
  transition={{duration : 1, ease : "easeInOut"}}  
  > CollegeTracker <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Eight-Thirty.png" alt="Eight-Thirty" width="50" height="50" /></motion.h2>
}

const TextAnimationSignUp = () => {
  return <motion.h2
  initial ={{y : 25 , opacity :0}}
  animate ={{y : 0 , opacity :1}}
  transition={{duration : 1, ease : "easeInOut"}}  
  > Welcome to CollegeTracker! <img src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Eight-Thirty.png" alt="Eight-Thirty" width="60" height="60" /></motion.h2>
}

const Incorrect = () => {
  return <motion.h3
  initial ={{y : 25 , opacity :0}}
  animate ={{y : 0 , opacity :1}}
  transition={{duration : 0.7, ease : "easeInOut"}}  
  > Incorrect login, please try again. </motion.h3>
}
const SignUpFailed = () => {
  return <motion.h3
  initial ={{y : 25 , opacity :0}}
  animate ={{y : 0 , opacity :1}}
  transition={{duration : 0.7, ease : "easeInOut"}}  
  > Username already exists, please try again. </motion.h3>
}

const SignUpSuccess = () => {
  return <motion.h3
  initial ={{y : 25 , opacity :0}}
  animate ={{y : 0 , opacity :1}}
  transition={{duration : 0.7, ease : "easeInOut"}}  
  > Account created, please login. </motion.h3>
}

function App() {
  return (  
        <div>
          <Login></Login>
        </div>    
  )
}


function SignUp(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [balance, setBalance] = useState('');
  const [email, setEmail] = useState('')
  const [signUpFail, setSignUpFail] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false); // state to toggle between login and sign up

  // This is interesting, trying to understand how to send such information. 
  // https://stackoverflow.com/questions/43965316/for-login-get-or-post

  async function addUser(){
    await fetch(`${process.env.REACT_APP_API_URL}/addStudent`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      
      body: JSON.stringify({username,password,email,balance})
    })
    .then((res) => {
      // function handles response, setting loginState based on query results.
      if(res.status == 401){
        setSignUpFail(true);
        setTimeout(() => {
          setSignUpFail(false);
        }, 2000);
      }
      else{
        setSignUpSuccess(true)
        setTimeout(() => {
          setSignUpSuccess(false)
        }, 2000);
        
      }
    })
    setEmail('')
    setUsername('')
    setPassword('')
    setBalance('')
  }
  if (isSignIn)
    return <Login/>;
  return(
    <div className='split left'>
      <TextAnimation></TextAnimation>
      <div className="inner-login-div">
        <div className='login-forms'>
          <h1>Create an account </h1>
            <h2 className='username-password'>Username <IoMdPerson /></h2>
              <input 
              required
              className= 'logins'
              type = "text"
              value = {username}
              onChange={(event) => setUsername(event.target.value)}
              />
            <h2 className='username-password'> Password <IoIosKey/></h2>
            <input 
              required
              className='logins'
              type = "password"
              value = {password}
              onChange={(event) => setPassword(event.target.value)}
              />
            <h2 className='username-password'> Email <MdEmail/></h2>
            <input 
              className='logins'
              type = "email"
              value = {email}
              onChange={(event) => setEmail(event.target.value)}
              required
              />          
            <h2 className='username-password'> Starting Deposit <TbPigMoney /></h2>
            <input 
              className='logins'
              type = "text"
              value = {balance}
              onChange={(event) => setBalance(event.target.value)}
              />                    
            <p className='sign-up-link'> Already have an account?
            <button className="sign-buttons" onClick={() => setIsSignIn(true)}> Sign In</button> 
            </p>
            {signUpFail ? <h3 className='login-text' style={{textAlign : 'center'}}> <SignUpFailed></SignUpFailed></h3> : null}
            {signUpSuccess ? <h3 className='login-text' style={{textAlign : 'center'}}> <SignUpSuccess></SignUpSuccess></h3> : null}
            <button className='login-button' onClick={addUser}> Sign Up </button>
        </div>
        <div className='split right'>
          <img className='login-image' src='https://www.marketplace.org/wp-content/uploads/2021/04/CM4.png?fit=2500%2C1807' width={1600}></img>
        </div>
      </div>
    </div>
  )
}

function Login(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginState, setLoginState] = useState(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  // state to toggle between login and sign up
  const [isSignUp, setIsSignUp] = useState(false); 
  async function validateUser(){
    await fetch(`${process.env.REACT_APP_API_URL}/verifyUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password})
    })
    .then((res) => {
      // function handles response, setting loginState based on query results.
      if(res.status == 200){
        setLoginState(true);
      }
      else{
        setIncorrectLogin(true);
        setTimeout(() => {
          setIncorrectLogin(false);
        }, 2000);
      }
    })
  }

  if (loginState)
    // TODO: when login successful, return homepage div. 
    return <div>
      <Homepage></Homepage>
      <Full_vault></Full_vault>
    </div>
    
  if (isSignUp)
    return <SignUp/>
  return(
    <div className="split left">
      <TextAnimation></TextAnimation>
      <div className="inner-login-div">
        <h1>Welcome back</h1>
        <p style={{color : 'grey'}}>Please enter your details </p>
        {/* <form> */}
        <h2 className='username-password'>Username <IoMdPerson /></h2>
          <input 
          className= 'logins'
          type = "text"
          value = {username}
          onChange={(event) => setUsername(event.target.value)}
          required
          />
        <h2 className='username-password'> Password <IoIosKey/></h2>
        
        <input 
          className='logins'
          type = "password"
          value = {password}
          required
          onChange={(event) => setPassword(event.target.value)}
          />
          {incorrectLogin ? <h3 className='login-text' style={{textAlign : 'center'}}> <Incorrect></Incorrect></h3> : null}
          <p className='sign-up-link'>Don't have an account? 
            <button className="sign-buttons" onClick={() => setIsSignUp(true)}>Sign Up</button> 
          </p>
          <div className='split right'>
            <img className='login-image' src='https://www.marketplace.org/wp-content/uploads/2021/04/CM4.png?fit=2500%2C1807' width={1400}></img>
          </div>
        <button className='login-button' onClick={validateUser}> Sign In </button>
      </div>
    </div>
  )
}

export default App;
