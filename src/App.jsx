import styles from "./App.module.css";
import MainDisplay from "./components/MainDisplay/MainDisplay";
//import NavMenu from "./components/Header/NavMenu";

function App() {
  return (
    <section
      className={`container d-flex justify-content-center align-items-center`}
    >
      <MainDisplay />
    </section>
  );
}

export default App;
