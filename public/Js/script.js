fetch("http://localhost:3000/api/furniture/")
  .then((res) => res.json())
  .then((array_furnitures) => {
    let output = "";
    array_furnitures.forEach(function (product) {
      output += `
        <figure class="product">
        <img src=${product.imageUrl} class="products_container"/>
        <figcaption class="description">
        <p>${product.name}</p>
        <p>${product.description}</p>
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
