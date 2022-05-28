import styles from './App.module.css';
import MainDisplay from './components/MainDisplay/MainDisplay';
//import NavMenu from "./components/Header/NavMenu";
import Login from './components/Login/Login';
import { useSelector } from 'react-redux';
import Module from './components/UI/Module';

function App() {
  const moduleVis = useSelector((state) => state.module);
  const loginStatus = useSelector((state) => state.auth.isAuthenticated);
  return (
    <section
      className={`container d-flex justify-content-center align-items-center`}
    >
      <Module
        className={moduleVis.status && `vis`}
        message={moduleVis.message}
      />

      {!loginStatus && <Login />}

      {loginStatus && <MainDisplay />}
    </section>
  );
}

export default App;
