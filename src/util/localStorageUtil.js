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

/*Handles setting cards into the local storage.
it takes the title printed into the card handler
and add the question and answers avialable in the cards
to the titled item in local storage.
*/

export const localStorageSet = (item) => {
  if (!localStorage.getItem(item.title))
    return localStorage.setItem(item.title, JSON.stringify([item]));
  const json = localStorage.getItem(item.title);
  const savedFlashcards = JSON.parse(json);
  console.log(savedFlashcards);
  const newSave = [item, ...savedFlashcards];
  return localStorage.setItem(item.title, JSON.stringify(newSave));
};

export const manageServerData = async (params) => {
  try {

    if (params.type === 'POST') {
      const writeData = JSON.stringify(params.data);

      await fetch(`https://make-some-flashcards-default-rtdb.firebaseio.com/flashcards.json`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: writeData
      })
    }
    if (params.type === 'GET') {
      const response = await fetch(`https://make-some-flashcards-default-rtdb.firebaseio.com/flashcards.json`);
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
