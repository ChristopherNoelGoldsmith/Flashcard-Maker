import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div className={`row gy-5 gx-5 ${props.className} ${styles["util-card"]}`}>
      {props.children}
    </div>
  );
};

export default Card;
