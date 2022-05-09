const TextArea = (props) => {
  return (
    <figure className="row">
      <label className="col" htmlFor={props.id}>
        {props.label}
      </label>
      <textarea {...props}></textarea>
    </figure>
  );
};

export default TextArea;
