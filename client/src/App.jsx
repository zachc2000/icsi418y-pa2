import { useState } from 'react'
//import heroImg from './assets/hero.png'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
import './App.css'

import Login from './components/Login';
import Signup from './components/Signup'; 

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

    function openSignup() {
      setShowSignup(true); 
      setShowLogin(false);
    }

    function openLogin() {
      setShowLogin(true);
      setShowSignup(false);
    }

    return (
      <>
      <div className="login-container">
        <button onClick={openLogin} disabled={showLogin}>Log In</button>
        <button onClick={openSignup} disabled={showSignup}>Sign Up</button>
    </div>
    <div className="main-content">
      <h1>Welcome!</h1>
      <h2>Please sign in to continue.</h2>
      
      {showSignup && <Signup /> }
      {showLogin && <Login /> }
    </div>  
    </>
  )
}
export default App
