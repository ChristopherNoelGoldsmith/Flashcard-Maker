import Button from "../UI/Button";
const FlashcardListItem = (props) => {
  //console.log(props);
  //Add count of cards contained in saved cards to the JSX below. Use localStorage.length
  return (
    <li className="row justify-content-center">
      <label className="col-8" htmlFor="">
        {props.children}
      </label>
      <Button onClick={props.onClick} className="col-4" label="Del"></Button>
    </li>
  );
};

export default FlashcardListItem;
