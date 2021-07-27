// on s'assure que le DOM est chargé
window.onload = () => {
  //Exécuté après le chargement de la page

  fetch("http://localhost:3000/api/furniture/")
    .then((res) => res.json())
    .then((array_furnitures) => {
      let output = "";
      console.log(array_furnitures[0]);

      array_furnitures.forEach(function (product) {
        output += `
        <figure class="product">
        <img src=${product.imageUrl} class="products_container" alt="image_product"/>
        <figcaption class="description">
        <p>${product.name}</p>
        <div class="price">
        <p>${product.price},00€</p>
        </div>
        </figcaption>
        </figure>
        `;
      });
      document.getElementById("products").innerHTML = output;
    })
    .catch((error) => console.log("Erreur : " + error));
};
