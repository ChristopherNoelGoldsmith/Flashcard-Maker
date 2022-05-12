import Button from "../UI/Button";
const FlashcardListItem = (props) => {
  //console.log(props);
  //Add count of cards contained in saved cards to the JSX below. Use localStorage.length
  return (
    <li className="row col-md-5 col-12 mx-3 my-2">
      <label onClick={props.loadCard} className="col-9" htmlFor="">
        {props.children}
      </label>
      <Button onClick={props.deleteCard} className="col-3" label="Del"></Button>
    </li>
  );
};

export default FlashcardListItem;
