export const manageServerData = async (params) => {
  try {
    if (params.type === "POST") {
      //const cleanData = convertToCleanData(params.data);
      const writeData = JSON.stringify(params.data);
      console.log(params.data);
      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.data.title}/flashcards.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: writeData,
        }
      );
    }

    if (params.type === "PATCH") {
      const writeData = JSON.stringify(params.data);

      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.data.title}/flashcards.json`,
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
        `https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.data.title}/flashcards.json`
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
        `https://make-some-flashcards-default-rtdb.firebaseio.com/saved.json`
      );
      const json = await response.json();
      const data = [];
      //pulls the data from the json into a workable format from the app.
      for (const cardData in json) {
        data.push(json[cardData]);
      }
      console.log(data);
      return data;
    }

    //DELETE---------------------------------
    if (params.type === "DELETE") {
      //turn saved into the username
      await fetch(
        `https://make-some-flashcards-default-rtdb.firebaseio.com/saved/${params.title}.json`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          id: 1,
        }
      );
      console.log("success");
    }
  } catch (err) {
    console.log(err);
  }
};
