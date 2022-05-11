import Button from "../UI/Button";
const FlashcardListItem = (props) => {
  //console.log(props);
  //Add count of cards contained in saved cards to the JSX below. Use localStorage.length
  return (
    <li className="row col-md-5 col-12 justify-content-center mx-3 my-2">
      <label onClick={props.loadCard} className="col-8" htmlFor="">
        {props.children}
      </label>
      <Button onClick={props.deleteCard} className="col-4" label="Del"></Button>
    </li>
  );
};

export default FlashcardListItem;
