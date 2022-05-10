export const getLocalStorageKeys = () => {
  let navList = [];
  for (let each in localStorage) {
    navList = [each, ...navList];
  }
  //this is a workaround needed due to the card values being obtained through their keys.
  //because of this it also get the methods of the localStorage object, so to keep them from
  //being inserted into the DOM or overwritten workarounds like the one below have been implimented.
  navList = navList.filter((key) => {
    if (
      key === "setItem" ||
      key === "removeItem" ||
      key === "clear" ||
      key === "length" ||
      key === "getItem" ||
      key === "key"
    ) {
      return false;
    }
    return true;
  });

  return navList;
};
