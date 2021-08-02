//Rappel de notre API
fetch("http://localhost:3000/api/furniture/" + id)
 .then((res) => res.json())
  .then((furniture) => {
    let output = "";
    console.log(furniture);
  
//URL
const params = new URL(document.location).searchParams;
const id = params.get("id");

//Page produit
let furniture;
const $furnitureProduct = document.querySelector("#furniture_product");
const varnish = document.createElement("varnish_select");
