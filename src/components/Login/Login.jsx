import styles from "./Login.module.css";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AlertMessage from "../UI/AlertMessage";
import { useReducer } from "react";
import { manageServerUsers } from "../../util/serverStorage";
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
  console.log(loginStatus);
  const usernameHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: "USERNAME", username: event.target.value });
  };

  const passwordHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: "PASSWORD", password: event.target.value });
  };

  const loginHandler = (event) => {
    event.preventDefault();
    console.log(inputState);
    dispatchLoginStatus(authActions.login({ username: inputState.username }));
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
