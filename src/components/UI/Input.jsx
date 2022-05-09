import styles from "./Input.module.css";

const Input = (props) => {
  return (
    <figure className="row">
      <label className={`col-xs-12`} htmlFor={`${props.id}`}>
        {props.label}
      </label>
      <input className={`col-xs-12 ${props.className}`} {...props} />
    </figure>
  );
};

export default Input;
