
import { useContext, useState } from 'react';
import {UserContext} from '../../App';
import { useHistory, useLocation } from "react-router-dom";

import {initializeLoginFramework,handleGoogleSignIn,handleSignOut,handleFbSignIn, createUserWithEmailAndPassword, signInWithEmailAndPassword}  from '../Login/loginManager';



function Login() {

  const [newUser,setNewUser]=useState(false);

  const [user,setUser]=useState({
    isSignIn:false,
    newUser:false,
    name:'',
    email:'',
    password:'',
    photo:'',
    error:'',
    success:false

  });

  initializeLoginFramework();

 const [loggedInUser,setLoggedInUser]=useContext(UserContext);

 const location=useLocation();

 const history=useHistory();
 let { from } = location.state || { from : { pathname: "/"}};

 
  const googleSignIn=()=>{
    handleGoogleSignIn()
    .then(res=>{
      handleResponse(res,true);
    })
  }

const signOut=()=>{
  handleSignOut()
  .then(res=>{
    handleResponse(res,false);
  })
}

const fbSignIn=()=>{
  handleFbSignIn()
  .then(res=>{
    handleResponse(res,true);
  })
}
  
const handleResponse=(res,redirect)=>{
  setUser(res);
  setLoggedInUser(res);
  if(redirect){
    history.replace(from);
  }

}

  const handleBlur=(e)=>{
   let isFieldValid;

    if(e.target.name==='email'){
      isFieldValid=/\S+@\S+\.\S+/.test(e.target.value);
       
    }
    if(e.target.name==='name'){
      isFieldValid=true;
       
    }
    if(e.target.name==='password'){
     const isPasswordValid=e.target.value.length > 6;
     const passwordHasNumber=/\d{1}/.test(e.target.value);
     isFieldValid=isPasswordValid && passwordHasNumber;
    }

    if(isFieldValid){
      const newUserInfo={...user};
      newUserInfo[e.target.name]=e.target.value;
      setUser(newUserInfo);
    }
  }


  const handleSubmit=(e)=>{

  if(newUser && user.email && user.password){
     createUserWithEmailAndPassword(user.name,user.email,user.password)
     .then(res=>{
      handleResponse(res,true);
     })
  }

 if(!newUser && user.email && user.password){
   signInWithEmailAndPassword(user.email,user.password)
   .then(res=>{
    handleResponse(res,true);
 })
 

  }
  e.preventDefault();
  }

 

 
 

  return (
    <div style={{textAlign:'center'}}>
      {
        user.isSignIn ?
         <button onClick={signOut} >Sign out</button> : 
         <button onClick={googleSignIn} >Sign In</button>
         } 

         <br />

         <button onClick={fbSignIn}>Sign In Using Facebook</button>
      {
      user.isSignIn && <div>
        <h2>Welcome, {user.name}</h2>
        <p>Your Email: {user.email}</p>
        <img src={user.photo} alt="" />
      </div>
       }  

        
      <h1>Our Own Authentication System</h1>

      <input type="checkbox" name="newUser" id="" onChange={()=>setNewUser(!newUser)} />
      <label htmlFor="newUser">New User SignUp</label>

     <form onSubmit={handleSubmit}>

    {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder="your name" />}
      <br />
     <input type="text" name='email' onBlur={handleBlur} placeholder="your email address" required/>
      <br />
      <input type="password" name='password' onBlur={handleBlur} id="" placeholder="your password" required/>
      <br />
      <input type="submit" value={newUser ? 'Sign Up' : "Sign In"} />

     </form>
     <p style={{color:'red'}}>{user.error}</p>
     {user.success && <p style={{color:'green'}}>User {newUser ?'Created' : 'Logged In' } Successfully</p>}
    </div>
  );
      };


export default Login;
