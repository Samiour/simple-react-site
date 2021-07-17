import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';


export const initializeLoginFramework=()=>{

  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
  }
}

  
export const handleGoogleSignIn=()=>{

  var googlProvider = new firebase.auth.GoogleAuthProvider();

  return firebase.auth()
.signInWithPopup(googlProvider)
.then((res) => {
  
  const{displayName,email,photoURL}=res.user;
  
  const signInUser={
    isSignIn:true,
    name:displayName,
    email:email,
    photo:photoURL,
    success:true
  }
  return signInUser;
 


  
  // ...
}).catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;
  // ...
});


}


export const handleFbSignIn=()=>{

  var fbProvider = new firebase.auth.FacebookAuthProvider();

  return firebase
.auth()
.signInWithPopup(fbProvider)
.then((result) => {
  /** @type {firebase.auth.OAuthCredential} */
  var credential = result.credential;

  // The signed-in user info.
  var user = result.user;
  user.success=true;

  // This gives you a Facebook Access Token. You can use it to access the Facebook API.
  var accessToken = credential.accessToken;
return user;
  // ...
})
.catch((error) => {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // The email of the user's account used.
  var email = error.email;
  // The firebase.auth.AuthCredential type that was used.
  var credential = error.credential;

  // ...
});
}

export const handleSignOut=()=>{
  return firebase.auth().signOut()
  .then(res => {
    // Sign-out successful.
    const SignOutUser={
      isSignIn:false,
      name:'',
      email:'',
      photo:'',
      error:'',
      success:false
    }
    return SignOutUser;
  })
  .catch((error) => {
    // An error happened.
  });

  
}


export const createUserWithEmailAndPassword=(name,email,password)=>{

  return firebase.auth().createUserWithEmailAndPassword(email,password)
  .then(res=> {
    // Signed in 
    const newUserInfo=res.user;
  newUserInfo.error='';
  newUserInfo.success=true;
  updateUserName(name);
  return newUserInfo;
  
  })
  .catch(error => {
    var errorCode = error.code;
    var errorMessage = error.message;
    const newUserInfo={};
  newUserInfo.error=errorMessage;
  newUserInfo.success=false;
  return newUserInfo;
  });
}

export const signInWithEmailAndPassword =(email,password)=>{

  return firebase.auth().signInWithEmailAndPassword(email,password)
  .then(res => {
    // Signed in
    const newUserInfo=res.user;
    newUserInfo.error='';
    newUserInfo.success=true;
    
   return newUserInfo;
    
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    const newUserInfo={};
    newUserInfo.error=errorMessage;
    newUserInfo.success=false;
   return newUserInfo;
  });
}

const updateUserName=(name)=>{

  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name,
    
  })
  .then(res => {
    // Update successful
    // ...
    console.log('User Name updated Successfully');
  })
  .catch(error => {
    // An error occurred
    // ...
    console.log(error);
  });

}