export const manageServerData = async (params) => {
  try {
    if (params.type === "POST") {
      //const cleanData = convertToCleanData(params.data);
      const writeData = JSON.stringify(params.data);

      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.username}/flashcards.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: writeData,
        }
      );
      return
    }

    if (params.type === "PUT") {
      //const cleanData = convertToCleanData(params.data);
      const writeData = JSON.stringify(params.data);

      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.username}/flashcards.json`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: writeData,
        }
      );
      return
    }

    if (params.type === "PATCH") {
      const writeData = JSON.stringify(params.data);
      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.username}/flashcards.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: writeData,
        }
      );
    }

    if (params.type === "GET") {
      if (!params.data.title) return false;
      const response = await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.username}/cards/${params.data.title}/flashcards.json`
      );
      const json = await response.json();
      const data = [];
      //pulls the data from the json into a workable format from the app.
      for (const cardData in json) {
        data.push(json[cardData]);
      }
      return data;
    }

    //USE TO GET ALL FLASHCARD OWNED BY THE USER IN THE SERVER;
    if (params.type === "GETALL") {
      //turn saved into the username
      const response = await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.username}/flashcards.json`
      );
      const json = await response.json();
      const data = [];
      //pulls the data from the json into a workable format from the app.
      for (const cardData in json) {
        data.push(json[cardData]);
      }

      return data;
    }

    //DELETE---------------------------------
    if (params.type === "DELETE") {
      //turn saved into the username
      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users//${params.username}/flashcards.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          id: 1
        }
      );
      return
    }
    return console.log('invalid call');
  } catch (err) {
    console.log(err);
  }
};

//checks for duplicate usernames on server
export const checkIfUserInServer = async (params) => {
  const response = await fetch(
    `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.data.username}.json`,
    {
      method: "GET",
    }
  );
  const json = await response.json();

  if (!json) return false;
  return json;
};

export const manageServerUsers = async (params) => {
  //!!!!sing that patch request for now, fix later to work with firebase autogenerated keys.
  try {
    if (params.type === "POST") {
      const userNameIsTaken = await checkIfUserInServer(params);

      if (userNameIsTaken) return;

      const writeData = { userData: params.data };
      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.data.username}.json`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(writeData),
        }
      );
    }

    //needs to be implimented
    if (params.type === "DELETE") {
      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/users/${params.data.username}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          id: 1,
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};
