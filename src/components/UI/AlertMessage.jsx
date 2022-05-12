import styles from "./AlertMessage.module.css";

const AlertMessage = (props) => {
  return <span {...props}>{props.children}</span>;
};

export default AlertMessage;
