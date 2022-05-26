import styles from "./App.module.css";
import MainDisplay from "./components/MainDisplay/MainDisplay";
//import NavMenu from "./components/Header/NavMenu";
import Login from "./components/Login/Login";
import { useSelector } from "react-redux";

function App() {
  const loginStatus = useSelector((state) => state.auth.isAuthenticated);
  console.log(loginStatus);
  return (
    <section
      className={`container d-flex justify-content-center align-items-center`}
    >
      {!loginStatus && <Login />}

      {loginStatus && <MainDisplay />}
    </section>
  );
}

export default App;
