//variable
let _id = [];
let imageUrl = [];
let name = [];
let description = [];
let varnish = [];
let quantity = [];
let price = [];
let i = [];
// Fonction qui va afficher les produits dans le site
// Chercher les données de API

fetch("http://localhost:3000/api/furniture/")
  .then((res) => res.json())
  .then((array_furnitures) => {
    let picture = "";

    //Réccupérer et afficher les données de API
    for (i = 0; i < array_furnitures.length; i++) {
      array_furnitures.forEach((element, i) => {
        _id[i] = element._id;
        imageUrl[i] = element.imageUrl;
        name[i] = element.name;
        description[i] = element.description;
        varnish[i] = element.varnish;
        quantity[i] = element.quantity;
        price[i] = element.price;
      });

      picture += `
        <figure class="product">
         <a href="./view/product.html?id=${_id[i]}">
        <img src=${
          imageUrl[i]
        } class="products_container" alt="image_product"/> </a>
        <div class="description">
        <p>${name[i]}</p>
        <div class="price">
        <p>${price[i] / 100}€</p>
        </div>
      
        </figure>
        `;

      document.getElementById("products").innerHTML = picture;
    }
  });
