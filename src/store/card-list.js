import { createSlice, current } from "@reduxjs/toolkit";

const initialState = [];

/* --------------
The card which is passed through the action and written to the state should be
formatted as below
-------------------
{
    title: title,
    key: key,
    card: {
        question: question,
        answer: answer
    }
}
--------------------
----------------- */

const cardListSlice = createSlice({
    name: 'card-list',
    initialState: initialState,
    reducers: {

        addCard(state, action) {
            //checks cardList for a list of the name being edited.
            //if that name does not exist it creates it
            //of it does it adds to it.
            const currentState = current(state)
            const cardState = currentState.find(cards => cards.id === action.payload.id);
            //code to add to list
            if (cardState) {
                const updatedCards = [...cardState.cards, action.payload.cards];
                const newList = currentState.map(list => {
                    if (list.id === action.payload.id) {
                        return {
                            id: action.payload.id,
                            title: action.payload.title,
                            cards: updatedCards
                        }
                    };
                    return list;
                })
                return newList
            }


            //code creating another item on the list
            return state = [...currentState, {
                id: action.payload.id,
                title: action.payload.title,
                cards: [action.payload.cards]
            }];
        },
        deleteCard(state, action) {
            //takes the id of the card in state and compares it to the id of the action and removes all matches.
            return state = current(state).filter(cards => {
                if (cards.id !== action.payload.id) return true;
                return false;
            });
        },
        patchCard(state, action) { },
    }
});

const cardListReducer = cardListSlice.reducer;

export const cardListAction = cardListSlice.actions;

export default cardListReducer;