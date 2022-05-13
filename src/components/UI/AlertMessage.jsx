import styles from "./AlertMessage.module.css";
import { useState, useEffect } from "react";

const constructAlert = (text, condition) => {
  const visability = condition ? "vis" : "";

  return (
    <span className={`${styles["comment"]} ${styles[visability]}`}>
      {`${text}`}
    </span>
  );
};

const AlertMessage = (props) => {
  const [alertMessage, setAlert] = useState("");
  useEffect(() => {
    const newAlert = constructAlert(props.note, props.classToggle);
    setAlert(newAlert);

    setTimeout(() => {
      setAlert("");
    }, props.alertDuration || 3000);
  }, [props.note, props.classToggle, props.alertDuration]);
  return <div>{alertMessage}</div>;
};

export default AlertMessage;
