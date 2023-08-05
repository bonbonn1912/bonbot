export const authenticateUser = () => {
    console.log("In authenticateUser Funktion")
  return new Promise(async (resolve, rejects) => {
    try {
       const response = await fetch("/authenticate");
      const data = await response.json();
      console.log("Username :" + data.account.display_name); 
      resolve(data) 
     
    } catch (e) {
        console.log("User ist not authenticated")
      rejects(null);
    }
  });
};
