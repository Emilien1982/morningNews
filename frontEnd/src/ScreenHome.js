import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './App.css';
import {Alert, Input, Button} from 'antd';
import { useDispatch, useSelector } from 'react-redux';

function ScreenHome() {
  const dispatch = useDispatch();

  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');

  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');

  const [isLogin, setIsLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const user = useSelector(state => state.user)
  console.log(user);
  

  const handleSubmitSignUp = async () => {
    
    const response = await fetch(
      '/users/sign-up',
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&passwordFromFront=${signUpPassword}`
      }
    );
    const responseBody = await response.json();
    if (!responseBody.userCreated) {
      //console.log('Something gone wrong: ', responseBody.message);
      setErrorMessage(responseBody.message);
    } else {
      dispatch({
        type: 'addToken',
        token: responseBody.token
      });
      setSignUpUsername('');
      setSignUpEmail('');
      setSignUpPassword('');
      setIsLogin(true);
      setErrorMessage(false);
      //console.log('TOKEN UP: ', responseBody.token);
    }
  }


  const handleSubmitSignIn = async () => {
    
    const response = await fetch(
      '/users/sign-in', 
      {
        method: 'POST',
        headers: {'Content-Type':'application/x-www-form-urlencoded'},
        body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
      }
    );
    const responseBody = await response.json();
    if (!responseBody.loginCorrect) {
      //console.log('Something gone wrong: ', responseBody.message);
      setErrorMessage(responseBody.message);
    } else {
      dispatch({
        type: 'addToken',
        token: responseBody.user.token
      });
      setSignInEmail('');
      setSignInPassword('');
      setErrorMessage(false);
      setIsLogin(true);
      //console.log('TOKEN IN: ', responseBody.user.token);
    }
  }


  return (
    
    <div className="Login-page" >

      { errorMessage && <Alert message={errorMessage} type="error"  showIcon/> }

      <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>

        {isLogin && < Redirect to={`/screensource/${user}`} />}

        {/* SIGN-IN */}

        <div className="Sign">
                
                <Input 
                  className="Login-input" 
                  placeholder="arthur@lacapsule.com" 
                  value={signInEmail}
                  onChange={({target}) => setSignInEmail(target.value)}
                />

                <Input.Password 
                  className="Login-input" 
                  placeholder="password" 
                  value={signInPassword}
                  onChange={({target}) => setSignInPassword(target.value)}
                  onPressEnter={handleSubmitSignIn}
                />

          <Button 
            style={{width:'80px'}}
            type="primary"
            onClick={handleSubmitSignIn}
          >Sign-in</Button>

        </div>

        {/* SIGN-UP */}

        <div className="Sign">
                
          <Input 
            className="Login-input" 
            placeholder="Arthur G" 
            value={signUpUsername}
            onChange={({target}) => setSignUpUsername(target.value)}
          />

          <Input
            className="Login-input"
            placeholder="arthur@lacapsule.com"
            value={signUpEmail}
            onChange={({target}) => setSignUpEmail(target.value)}
          />

          <Input.Password
            className="Login-input"
            placeholder="password"
            value={signUpPassword}
            onChange={({target}) => setSignUpPassword(target.value)}
            onPressEnter={handleSubmitSignUp}
          />
    
          <Button
            style={{width:'80px'}}
            type="primary"
            onClick={handleSubmitSignUp}
          >Sign-up</Button>

        </div>
      </div>
    </div>
  );
}

export default ScreenHome;
