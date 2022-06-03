import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import { cardListAction } from '../../store/card-list';

/*
const parseDataReducer = (state, action) => {
    if (action.type === 'CLEAR')
        return { title: state.title, question: '', answer: '' };
    if (action.type === 'TITLE') state.title = action.title;
    if (action.type === 'QUESTION') state.question = action.question;
    if (action.type === 'ANSWER') state.answer = action.answer;
    const cards = {
        question: state.question,
        answer: state.answer,
    };
    return {
        title: state.title,
        cards: cards,
        id: state.title + Math.floor(Math.random() * 1000),
    };
};
*/
const useCardList = () => {

    //    const [cardState, useCardState] = useState();

    const dispatch = useDispatch();
    const cardList = useSelector(store => store.cardList);
    const useCardState = (e) => (dispatch(cardListAction.addCard(e)));

    return [
        cardList,
        useCardState
    ]

};

export default useCardList;