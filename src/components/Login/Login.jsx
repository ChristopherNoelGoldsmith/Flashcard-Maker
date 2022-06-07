import styles from './Login.module.css';
import Card from '../UI/Card';
import Input from '../UI/Input';
import Button from '../UI/Button';
import AlertMessage from '../UI/AlertMessage';
import { useReducer, useState } from 'react';
import {
  manageServerUsers,
  checkIfUserInServer,
  manageServerData,
} from '../../util/serverStorage';
import { authActions } from '../../store/authentication';
import { useDispatch, useSelector } from 'react-redux';
import { moduleActions } from '../../store/module';

const checkIfUserInfoValid = (info) => {
  if (!info || !info.username || !info.password)
    return { status: false, message: 'An input field is empty!' };
  if (info.username.length < 5)
    return {
      status: false,
      message: 'Username must contain at least 5 characters!',
    };
  if (/\W/gi.test(info.username))
    return {
      status: false,
      message: 'Your name cannot contain special characters!',
    };
  if (info.password.length < 5)
    return {
      status: false,
      message: 'Password must contain at least 5 characters!',
    };
  if (!/\W/gi.test(info.password))
    return {
      status: false,
      message: 'Password must contain at least 1 special character!',
    };
  return {
    status: true,
    message: 'Password must contain at least 1 special character!',
  };
};

const inputReducer = (state, action) => {
  if (action.type === 'PASSWORD') state.password = action.password;
  if (action.type === 'USERNAME') state.username = action.username;
  return {
    username: state.username,
    password: state.password,
  };
};

const Login = (params) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {});
  const [usernameIsValid, setUsernameIsValid] = useState({ status: true });
  const [passwordIsValid, setPasswordIsValid] = useState({ status: true });

  //Redux tools
  const dispatch = useDispatch();

  //

  const usernameHandler = (event) => {
    if (event.target.value.length > 16) return;
    dispatchInput({ type: 'USERNAME', username: event.target.value });
  };

  const passwordHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: 'PASSWORD', password: event.target.value });
  };

  //Handles login attempts that do not match out servers data. invalid usernames/passwords.
  const validation = async (call) => {
    const validUser = checkIfUserInfoValid(inputState);
    if (validUser.status !== true) {
      dispatch(moduleActions.display(validUser));
      return { status: false, message: validUser.message };
    }
    //checks if the account exists on the server

    if (call && call.type === 'SERVER') {
      const userDataIsValid = await checkIfUserInServer({ data: inputState });
      if (!userDataIsValid) {
        setUsernameIsValid({ status: false, message: 'INVALID USERNAME' });
        return { status: false, message: 'User does not exist' };
      }
      if (userDataIsValid.userData.password !== inputState.password) {
        setPasswordIsValid({ status: false, message: 'INVALID PASSWORD' });
        return { status: false, message: 'Invalid password' };
      }
    }

    return { status: true };
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    const isValid = await validation({ type: 'SERVER' });
    if (!isValid.status) return dispatchInput(moduleActions.display(isValid));
    dispatch(authActions.login({ username: inputState.username }));
  };

  const createAccountHandler = async (event) => {
    event.preventDefault();
    const isValid = await validation();
    if (!isValid.status) return dispatchInput(moduleActions.display(isValid));

    manageServerUsers({
      type: 'POST',
      data: {
        username: inputState.username,
        password: inputState.password,
      },
    });
  };

  const guestAccountHandler = async (event) => {
    event.preventDefault();
    await manageServerUsers({
      type: 'POST',
      data: {
        username: 'Guest',
        password: '$password',
      },
    });
    dispatch(authActions.login({ username: 'Guest' }));
  };

  return (
    <Card>
      <h1 className={'col-12'}>FLASH IT!</h1>
      <form
        className={'container justify-content-center my-5'}
        onSubmit={loginHandler}
      >
        <figure className="row g-5 mx-5 justify-content-center">
          <AlertMessage
            classToggle={`${!usernameIsValid.status ? 'vis' : ''}`}
            note={usernameIsValid.message}
          />
          <Input
            onChange={usernameHandler}
            value={inputState.username || ''}
            label={'USERNAME'}
          />
          <AlertMessage
            classToggle={`${!passwordIsValid.status ? 'vis' : ''}`}
            note={passwordIsValid.message}
          />
          <Input
            value={inputState.password || ''}
            onChange={passwordHandler}
            label={'PASSWORD'}
            type={'password'}
          />
        </figure>
        <Button label={'LOGIN'} />
        <Button onClick={createAccountHandler} label={'CREATE ACCOUNT'} />
        <Button onClick={guestAccountHandler} label={'GUEST'} />
      </form>
    </Card>
  );
};

export default Login;
