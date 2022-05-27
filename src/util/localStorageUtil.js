//workoaround do to an [object Object] error.  FIX!!!!
const convertToCleanData = (cardState) => {
  const { title, key, question, answer } = cardState;
  return {
    title,
    key,
    cards: [
      {
        question,
        answer,
      },
    ],
  };
};

export const getLocalStorageKeys = () => {
  //runs a for loop on they keys in local storage to obtain all keys of the flashcard data
  let navList = [];
  for (let i = 0; i < localStorage.length; i++) {
    navList = [localStorage.key(i), ...navList];
  }

  return navList;
};

export const loadFlashcardList = (event) => {
  //Obtains the flashcard list form lovalstorage through a string,
  //destructures the data then returns it.
  if (!localStorage.getItem(event)) return false;
  let flashcard = localStorage.getItem(event);
  flashcard = JSON.parse(flashcard);
  return flashcard;
};

export const manageLocalStorage = (params) => {
  const { data } = params;
  console.log(params);
  //GET--------------------------------
  if (params.type === "GET") {
    //Obtains the flashcard list form lovalstorage through a string,
    //destructures the data then returns it.
    if (!localStorage.getItem(params.target)) return false;
    let flashcard = localStorage.getItem(params.target);
    flashcard = JSON.parse(flashcard);
    return flashcard;
  }

  //FOR WRITING DATA IN LOCALSTORAGE
  //PATCH--------------------------------
  if (params.type === "PATCH") {
    console.log(data);

    //if the the post is not in local storage the below function handles it and adds it
    if (!localStorage.getItem(data.title)) {
      return localStorage.setItem(data.title, JSON.stringify([data]));
    }

    return localStorage.setItem(data.title, JSON.stringify([data]));
  }

  //POST--------------------------------
  if (params.type === "POST") {
    const formatedData = convertToCleanData(data);

    console.log(formatedData);
    //if the the post is not in local storage the below function handles it and adds it
    if (!localStorage.getItem(data.title)) {
      return localStorage.setItem(data.title, JSON.stringify(formatedData));
    }
    const [newCards] = formatedData.cards;
    const json = localStorage.getItem(data.title);
    const savedFlashcards = JSON.parse(json);

    console.log(data);
    console.log(newCards);
    console.log(savedFlashcards);

    return localStorage.setItem(
      data.title,
      JSON.stringify({
        title: data.title,
        cards: [newCards, ...savedFlashcards.cards],
        key: data.key,
      })
    );
  }
};
