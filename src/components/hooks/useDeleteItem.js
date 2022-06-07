import { manageServerData } from '../../util/serverStorage';
import { useDispatch, useSelector } from "react-redux";
import { cardListAction } from '../../store/card-list';

const useDeleteItem = () => {
    const loginStatus = useSelector(store => store.auth);
    const cardList = useSelector(store => store.cardList);

    const deleteItem = (params) => {
        if (params.type === "FLASHCARD") {
            manageServerData({ type: 'DELETE', username: loginStatus.username });
            manageServerData({ type: 'PUT', username: loginStatus.username, data: cardList });
        }
    }

    return deleteItem;
}

export default useDeleteItem;