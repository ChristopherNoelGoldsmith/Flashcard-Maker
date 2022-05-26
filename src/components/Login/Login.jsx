import styles from "./Login.module.css";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AlertMessage from "../UI/AlertMessage";
import { useReducer } from "react";
import {
  manageServerUsers,
  checkIfUserInServer,
} from "../../util/serverStorage";
import store from "../../store";
import { authActions } from "../../store/authentication";
import { useSelector, useDispatch } from "react-redux";

const inputReducer = (state, action) => {
  if (action.type === "PASSWORD") state.password = action.password;
  if (action.type === "USERNAME") state.username = action.username;
  return {
    username: state.username,
    password: state.password,
  };
};

const Login = (params) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {});
  const loginStatus = useSelector((state) => state.auth);
  const dispatchLoginStatus = useDispatch();
  const usernameHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: "USERNAME", username: event.target.value });
  };

  const passwordHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: "PASSWORD", password: event.target.value });
  };

  //Handles login attempts that do not match out servers data. invalid usernames/passwords.
  const validation = async () => {
    const userDataIsValid = await checkIfUserInServer({ data: inputState });
    if (!userDataIsValid) return { status: false, message: "INVALID USERNAME" };
    if (userDataIsValid.userData.password !== inputState.password)
      return { status: false, message: "INVALID PASSWORD" };

    return { status: true };
  };
  const loginHandler = async (event) => {
    event.preventDefault();
    const isValid = await validation();
    if (!isValid.status) return console.log(isValid.message);
    dispatchLoginStatus(authActions.login({ username: inputState.username }));
    console.log(loginStatus);
  };

  const createAccountHandler = (event) => {
    event.preventDefault();
    manageServerUsers({
      type: "POST",
      data: {
        username: inputState.username,
        password: inputState.password,
      },
    });
  };

  return (
    <Card>
      <form className={"m-5 gy-3"} onSubmit={loginHandler}>
        <Input
          onChange={usernameHandler}
          value={inputState.username || ""}
          label={"USERNAME"}
        />
        <Input
          value={inputState.password || ""}
          onChange={passwordHandler}
          label={"PASSWORD"}
          type={"password"}
        />
        <Button label={"LOGIN"} />
        <Button onClick={createAccountHandler} label={"CREATE ACCOUNT"} />
      </form>
    </Card>
  );
};

export default Login;
