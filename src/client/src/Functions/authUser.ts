export const authenticateUser = () => {
  return new Promise(async (resolve, rejects) => {
    try {
       const response = await fetch("/authenticate");
      const data = await response.json(); 
      resolve(data) 
     
    } catch (e) {
      console.log("User ist not authenticated")
      rejects(null);
    }
  });
};
