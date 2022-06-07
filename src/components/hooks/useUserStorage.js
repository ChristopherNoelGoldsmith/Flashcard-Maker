import { manageServerData } from "../../util/serverStorage";
import { cardListAction } from "../../store/card-list";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";


const useUserStorage = () => {
  const dispatch = useDispatch();
  const loginStatus = useSelector(store => store.auth);


  return useEffect(() => {
    const loadData = async () => {
      const loadedFromServerFlashcardList = await manageServerData({
        type: 'GETALL',
        username: loginStatus.username,
      });
      if (!loadedFromServerFlashcardList.length) return dispatch(cardListAction.loadList([]));
      ;

      dispatch(cardListAction.loadList(loadedFromServerFlashcardList));
    };
    loadData();
  }, [loginStatus.username, dispatch]);
}

export default useUserStorage;