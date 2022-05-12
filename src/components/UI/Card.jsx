import styles from "./Card.module.css";

const Card = (props) => {
  return (
    <div
      className={`row gx-1 gy-1 gy-md-5 gx-md-5 justify-content-center ${props.className} ${styles["util-card"]}`}
    >
      {props.children}
    </div>
  );
};

export default Card;
