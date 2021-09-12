//* Fonction affichage produit -------------------------------------------------------
monPanier();
afficheProduitPanier();
function monPanier() {
  //* Récupération du produit dans le localStorage "panier"
  let panier = JSON.parse(localStorage.getItem("panier"));
  let prixTotal = JSON.parse(localStorage.getItem("prixTotal"));
  let prixPanier = document.getElementById("affichageTotal");
  let tableauPanier = document.getElementById("afficheProduitPanier");

  //* affichage du prix total du panier------------------------------------------
  if (prixTotal != null) {
    let div = document.createElement("div");
    afficheProduitPanier.appendChild(div);
    prixPanier.textContent =
      "Le montant total de votre commande est de : " + prixTotal + " €";
    prixPanier.id = "prixTotal";
  } else {
    prixPanier.textContent = "Le montant de votre commande est de : 0 €";
  }

  if (panier == null) {
    let div = document.createElement("div");
    afficheProduitPanier.appendChild(div);
    console.log("Le panier est vide");
  } else {
    tableauPanier.innerHTML = "";
    Object.values(panier).map((furniture) => {
      let tr = document.createElement("tr");
      let name = document.createElement("td");
      let varnish = document.createElement("td");
      let quantite = document.createElement("td");
      let prix = document.createElement("td");
      let prixTotal = document.createElement("td");

      afficheProduitPanier.appendChild(tr);
      tr.appendChild(name);
      tr.appendChild(varnish);
      tr.appendChild(quantite);
      tr.appendChild(prix);
      tr.appendChild(prixTotal);

      name.textContent = furniture.name;
      furniture.textContent = furniture.varnish;
      quantite.textContent = furniture.quantity;
      prix.textContent = furniture.price / 100 + " €";
      prixTotal.textContent =
        (furniture.price / 100) * furniture.quantity + " €";

      let emptyButton = document.getElementById("empty");

      emptyButton.addEventListener("click", function () {
        localStorage.clear("prixPanier");
        window.location.reload();
      });
    });
  }
}

//* Variables d'informations client -------------------------------------------------
let orderButton = document.querySelector(".order-submit");
let validationButton = document.querySelector(".validation");
let firstName = document.querySelector("#firstName");
let lastName = document.querySelector("#lastName");
let eMail = document.querySelector("#inputEmail");
let address = document.querySelector("#inputAddress");
let city = document.querySelector("#inputCity");

//* Création de l'objet général client
function client(firstName, lastName, eMail, telephoneNumber, address, city) {
  (this.firstName = firstName),
    (this.lastName = lastName),
    (this.eMail = eMail),
    (this.address = address),
    (this.city = city);
}

//*création d'un tableau contenant les articles commandés------------------------
let panier = JSON.parse(localStorage.getItem("panier"));
let listIdProduct = [];

function cart(panier) {
  for (let i = 0; i < panier.length; i++) {
    listIdProduct.push(panier[i].id);
  }

  localStorage.setItem("products", JSON.stringify(listIdProduct));
  listIdProduct = localStorage.getItem("products");
  listIdProduct = JSON.parse(listIdProduct);
}

//--------function event au clic-------------------------
orderButton.addEventListener("click", function (event) {
  event.preventDefault();
  validationInput();
});

//------création formulaire client(e)----------------------------
function send() {
  // ---------------------Création nouveau client--------------------------------------------------
  let newClient = new Client(
    firstName.value,
    lastName.value,
    eMail.value,
    telephoneNumber.value,
    address.value,
    city.value
  );
  //-----------------------Fetch POST ----------------------------------------------------------------
  fetch("http://localhost:3000/api/furniture/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contact: {
        firstName: newClient.firstName,
        lastName: newClient.lastName,
        address: newClient.address,
        city: newClient.city,
        email: newClient.eMail,
      },
      products: listIdProduct,
    }),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((data) => {
      localStorage.setItem("orderInfos", JSON.stringify(data));
    })
    .catch((error) => console.log("erreur de type : ", error));
}
