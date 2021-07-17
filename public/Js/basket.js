//Script pour l'index
//On initialise nos variables
let furniture;
let $furnitureList = document.querySelector("#furnitures-list");
// Récupérer les articles depuis l'API
fetch("http://localhost:3000/api/furniture").then(async (result_) => {
  //On rend asynchrone notre fonction
  const result = await result_.json(); //Le reste du code s'execute après l'execution de la promesse
  result.forEach((result) => {
    furniture = result; //Result deviens furniture
    console.log("furniture", furniture);
    //Appel de nos functions
    furnitureCard();
  });
});
