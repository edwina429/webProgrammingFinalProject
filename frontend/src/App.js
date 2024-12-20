import React from 'react';
import {motion} from "framer-motion";
import { IoMdPerson } from "react-icons/io";import {useState} from "react";
import { IoIosKey } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { TbPigMoney } from "react-icons/tb";
import logo from './logo.svg';
import Vault from './components/full_vault';
import './App.css';


// really cool animated emojis on this website
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

// function App() {
//   return (  
//         <div>
//           {/* <SignUp></SignUp> */}
//           <Login></Login>
//           <Vault></Vault>
//         </div>
    
//   )
// }
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if(!isLoggedIn){
    return(
        <div>
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </div>
    );
  }
  return (  
        <div>
          {/* <SignUp></SignUp> */}
          {/*<Login></Login>*/}
          <Vault></Vault>
          <GoalsPage></GoalsPage>
        </div>
    
  ); //right now both are being displayed at the same time!! must create button in GoalsPage to access VaultPage, will do later
}

function Success(){
  return(
    <h1>welcome user</h1>
  )
}

function LoginInSignUp(){
  return(
    <div className='login-sign-up'>
    <button className='login-button'>login</button> <button className='login-button'>sign up</button>
    </div>
  )
}

function SignUp(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [balance, setBalance] = useState('');
  const [email, setEmail] = useState('')
  const [loginState, setLoginState] = useState(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);

  // This is interesting, trying to understand how to send such information. 
  // https://stackoverflow.com/questions/43965316/for-login-get-or-post
  async function addUser(){
    await fetch("https://webprogrammingfinalprojectbeta.onrender.com/addUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password, email, balance})
    })
    setEmail('')
    setUsername('')
    setPassword('')
    setBalance('')
  }

  return(
    <div className="split left">
      {/* <img className = "background-image" 
      src='https://wagner.edu/communications/files/2020/03/MainHall4-1920.jpg'>
      </img> */}
      <div className="inner-login-div">
        {/*     <LoginInSignUp></LoginInSignUp> */}
        <h1 className="login-heading"> <TextAnimationSignUp></TextAnimationSignUp> </h1>
        <div className='login-forms'>

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
            <button className='login-button' onClick={addUser}> Sign Up </button>

        </div>
        <div className='split right'>
          {/* <img className='login-image' src='https://www.marketplace.org/wp-content/uploads/2021/04/CM4.png?fit=2500%2C1807' width={1400}></img> */}
        </div>
      </div>
      {/* <h1>dont have an account? sign up here</h1> */}
    </div>
  )
}

function Login(setIsLoggedIn){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginState, setLoginState] = useState(false);
  const [incorrectLogin, setIncorrectLogin] = useState(false);
  const [signUpPage, setSignUpPage] = useState(false);
  async function validateUser(){
    const verification = await fetch("https://webprogrammingfinalprojectbeta.onrender.com/verifyUser", { //added to verify if user signed in, if yes (look below for further comments)
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    })
    if (verification.ok) { //if verification (login successful), sets this value to true which shows the Vault page
      setIsLoggedIn(true);
    }
    .then((res) => {
      // function handles response, setting loginState based on query results.
      if(res.status == 200){
        setLoginState(true);
      }
      else{
        setIncorrectLogin(true);
      }
    })
  }

  // TODO: when login successful, return homepage div. 
  if (loginState)
    return <Success></Success>
  return(
    <div className="split left">
      <TextAnimation></TextAnimation>
      <div className="inner-login-div">
        {/*     <LoginInSignUp></LoginInSignUp> */}
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
          {incorrectLogin ? <h3 className='logins' style={{textAlign : 'center'}}> <Incorrect></Incorrect></h3> : null}
          <p className='sign-up-link'>Don't have an account? <button className="sign-up-link">Sign Up</button></p>
        <button className='login-button' onClick={validateUser}> Sign In </button>
      </div>
    </div>
  )
}

export default App;
//      depricated for now, goes in App()
        // <Routes>
          
        //   <Route exact path="/" element={<Home></Home>}></Route>
        //   <Route exact path="/goals" element={<Goals></Goals>}></Route>
        //   <Route exact path="/myaccount" element={<Myaccount></Myaccount>}></Route>
        // </Routes>
