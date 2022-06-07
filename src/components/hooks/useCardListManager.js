import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useReducer, useState } from 'react';
import { cardListAction } from '../../store/card-list';

const useCardList = () => {
    const dispatch = useDispatch();
    const cardList = useSelector(store => store.cardList);
    const useCardState = (e) => (dispatch(cardListAction.addCard(e)));

    return [
        cardList,
        useCardState
    ]

};

export default useCardList;