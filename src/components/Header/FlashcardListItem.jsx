import Button from '../UI/Button';
import animations from '../../animations.module.css';

const FlashcardListItem = (props) => {
  //console.log(props);
  //Add count of cards contained in saved cards to the JSX below. Use localStorage.length
  return (
    <li className={`${animations['appear-y']} row col-md-5 col-12 mx-3 my-2`}>
      <label onClick={props.loadCard} className="col-9" htmlFor="">
        {props.children}
      </label>
      <Button onClick={props.deleteCard} className="col-3" label="Del"></Button>
    </li>
  );
};

export default FlashcardListItem;
