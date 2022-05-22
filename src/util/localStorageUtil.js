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

// /*Handles setting cards into the local storage.
// it takes the title printed into the card handler
// and add the question and answers avialable in the cards
// to the titled item in local storage.
// */

// export const localStorageSet = (item) => {
//   if (!localStorage.getItem(item.title))
//     return localStorage.setItem(item.title, JSON.stringify([item]));
//   const json = localStorage.getItem(item.title);
//   const savedFlashcards = JSON.parse(json);
//   console.log(savedFlashcards);
//   const newSave = [item, ...savedFlashcards];
//   return localStorage.setItem(item.title, JSON.stringify(newSave));
// };


export const manageLocalStorage = (params) => {

  const { data } = params;


  if (params.type === 'GET') {
    //Obtains the flashcard list form lovalstorage through a string,
    //destructures the data then returns it.
    if (!localStorage.getItem(params.target)) return false;
    let flashcard = localStorage.getItem(params.target);
    flashcard = JSON.parse(flashcard);
    return flashcard;
  }

  //FOR WRITING DATA IN LOCALSTORAGE
  if (params.type === 'POST') {
    const formatedData = convertToCleanData(data);
    const cards = formatedData;

    if (!localStorage.getItem(data.title)) {

      return localStorage.setItem(data.title, JSON.stringify([cards]));
    }
    const json = localStorage.getItem(data.title);
    const savedFlashcards = JSON.parse(json);
    //Extracts the flashcard object from the users localstorage.
    const selectedFlashcard = savedFlashcards.filter(flashcardData => {
      if (flashcardData.title !== data.title) {
        return false;
      }
      return true;
    });


    //extracts all non-selected flashcards from the users localStorage for the purpose of creating a save file.
    const notSelectedFlashCards = savedFlashcards.filter(flashcardData => {
      if (flashcardData.title !== data) {
        return true;
      }
      return false;
    });

    //De-nests the data after it is iterated.
    const [oldData] = formatedData.cards;
    const [newData] = selectedFlashcard;

    //The format of the saved flashcard object
    const newFlashcards = {
      title: data.title,
      cards: [oldData, ...newData.cards],
      key: data.key
    };

    //USES CARD DATA TITLE AS THE KEY FOR LOCAL STORAGE WHEN SAVING.
    //CAN CHANGE TO USERNAME IN FUTRE!!!!
    const newSave = [newFlashcards, ...notSelectedFlashCards];

    return localStorage.setItem(data.title, JSON.stringify(newSave));
  };

}

export const manageServerData = async (params) => {
  try {

    if (params.type === 'POST') {
      //const cleanData = convertToCleanData(params.data);
      const writeData = JSON.stringify(params.data);
      console.log(params.data);
      await fetch(`https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.data.title}/flashcards.json`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: writeData
      });
    };

    if (params.type === 'PATCH') {

      const writeData = JSON.stringify(params.data);

      await fetch(`https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.data.title}/flashcards.json`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
        },
        body: writeData
      });

    }

    if (params.type === 'GET') {
      if (!params.data.title) return false;
      const response = await fetch(`https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.data.title}/flashcards.json`);
      const json = await response.json();
      const data = [];
      //pulls the data from the json into a workable format from the app.
      for (const cardData in json) {
        data.push(
          json[cardData]
        );
      }
      console.log(data)
      return data;
    }

    if (params.type === 'GETALL') {
      const response = await fetch(`https://make-some-flashcards-default-rtdb.firebaseio.com/saved.json`);
      const json = await response.json();
      const data = [];
      //pulls the data from the json into a workable format from the app.
      for (const cardData in json) {
        data.push(
          json[cardData]
        );
      }
      console.log(data)
      return data;
    }

  }
  catch (err) {
    console.log(err);
  };
};
