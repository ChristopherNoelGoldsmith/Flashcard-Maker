import styles from "./Login.module.css";
import Card from "../UI/Card";
import Input from "../UI/Input";
import Button from "../UI/Button";
import AlertMessage from "../UI/AlertMessage";
import { useReducer } from "react";

const inputReducer = (state, action) => {
  console.log(state, action);
  if (action.type === "PASSWORD") state.password = action.password;
  if (action.type === "USERNAME") state.username = action.username;
  return {
    username: state.username,
    password: state.password,
  };
};

const Login = (params) => {
  const [inputState, dispatchInput] = useReducer(inputReducer, {});

  const usernameHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: "USERNAME", username: event.target.value });
  };

  const passwordHandler = (event) => {
    if (event.target.value.length > 10) return;
    dispatchInput({ type: "PASSWORD", password: event.target.value });
  };

  const loginHandler = () => {};

  return (
    <Card>
      <form className={"m-5 gy-3"} action="">
        <Input
          onChange={usernameHandler}
          value={inputState.username}
          label={"USERNAME"}
        />
        <Input
          value={inputState.password}
          onChange={passwordHandler}
          label={"PASSWORD"}
          type={"password"}
        />
        <Button label={"LOGIN"} />
      </form>
    </Card>
  );
};

export default Login;
