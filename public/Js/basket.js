//déclaration variables
const formulaireElt = document.getElementById("formulaire");
const totalPriceElt = document.getElementById("total-price");
const productName = document.getElementById("articleName");
const priceElt = document.getElementById("articlePrice");
const cartELt = document.getElementById("container-recapitulatif");
const positionElt = document.getElementById("articles");
const positionFurnitureElt = document.getElementById("container");
//Déclaration de la variable "cart"dans laquelle on met les key et les values.
let cart = JSON.parse(window.localStorage.getItem("products"));
//------------Affichage produit selectionner------------------------------------------------
function showcart() {
  // si le panier est vide
  if (cart === null) {
    const panierVide = `<main id="container-products-cart"><div class="empty-cart">Le panier est vide !</div></main>`;
    positionElt.innerHTML = panierVide;
  } else {
    //si le panier n'est pas vide: afficher les produits dans le LS
    let structureProductCart = [];

    //faire boucle for pour parcourir mon LS et recupérer les objets
    let i;

    for (i = 0; i < cart.length; i++) {
      structureProductCart += `<div class="quantity"> Quantité - ${cart[i].quantity}</div>
      <div class="name">  ${cart[i].article}</div> <div class="price">${cart[i].price} </div>`;
    }

    if (i === cart.length) {
      // injection html dans la page panier
      positionElt.innerHTML = structureProductCart;
    }
  }

  let total = 0;
  for (let j = 0; j < cart.length; j++) {
    total = total + parseInt(cart[j].price) * cart[j].quantity;
  }
  totalPriceElt.innerHTML = "Montant Total : " + total + " €";
  localStorage.setItem("total", JSON.stringify(total));
}
//-----------Fin de l'affichage des produits du panier-----------------------------------
showcart();
//******************Gestion du bouton vider le panier*******************************************/

//-----------Le bouton POUR vider le panier et le LS----------------------
function toEmptycart() {
  const btnToEmptycart = document.getElementById("to-empty-cart");
  btnToEmptycart.addEventListener("click", () => {
    localStorage.clear();
  });
}
toEmptycart();

////****************Fin Gestion du bouton vider le panier*****************************************************/

////*********************************Le montant total du panier ******************************************************/

//*********************************Fin Montant Total Panier***************************************************/
//*******************************Gestion Formulaire et validation commande************************************/

structureFormulaire = "";

// Sélection élément DOM pour le positionnement du formulaire
const showHtmlForm = () => {
  const structureFormulaire = `
  
   <section class="formulaire-section">
          <h2>Vos coordonnées</h2>
          <form id="contact" class="card-body">
            <label for="firstName">Prénom</label><span id = "firstNameEmpty" class="info-champs-manquant"></span>
            <input type="text" id="firstName" placeholder="Prénom" />
          <label for="lastName">Nom</label><span id = "lastNameEmpty" class="info-champs-manquant"></span>
            <input type="text" id="lastName" placeholder="Name" />
            <label for="email">Email</label><span id = "emailEmpty" class="info-champs-manquant"></span>
            <input type="email" id="email" placeholder="Email" />
            <label for="address">Adresse</label><span id = "addressEmpty" class="info-champs-manquant"></span>
            <input id="address" placeholder="Adresse" />
            <label for="city">Ville</label><span id = "cityEmpty" class="info-champs-manquant"></span>
            <input type="text" id="city" placeholder="Ville" />
            <label for="postal">Code Postal</label><span id = "codePostalEmpty" class="info-champs-manquant"></span>
            <input type="text" id="codePostal" placeholder="Code postal" />
            <!--Fin forumlaire dans le HTML-->
            
          </form>
           <button id="btn-order" class="validate-order>
          <a href="../view/order.html" id="validate" class="validation"
            >Valider ma Commande</a
          >
        </button>
            <button class="continue-shopping"><a href="../index.html">Continuer mes achats</a></button>
        </section>
      </div>
  
  `;

  //------------------------------------------Injection HTML------------------------------------------------------------------------
  positionFurnitureElt.insertAdjacentHTML("afterend", structureFormulaire);
};

showHtmlForm();

//-------------------------bouton envoyer le formulaire----------------------------------------------------------------------------
const btnOrderElt = document.getElementById("btn-order");

//-----------------------------AddEventListener-------------------------------------------------------------------------------------

btnOrderElt.addEventListener("click", (e) => {
  e.preventDefault();
  // Création /definition d'une classe pour fabriquer l'objet lequel iront
  // Les values du formulaire
  class Formulaire {
    constructor() {
      this.firstName = document.getElementById("firstName").value;
      this.lastName = document.getElementById("lastName").value;
      this.email = document.getElementById("email").value;
      this.address = document.getElementById("address").value;
      this.city = document.getElementById("city").value;
      this.codePostal = document.getElementById("codePostal").value;
    }
  }

  //Appel de l'instance Formulaire pour créer l'objet formulairesValues

  let contact = new Formulaire();

  //***************Gestion validation du formulaire********************************/
  //-------------------------Fonction alerte--------------------------------------
  let textAlert = (value) => {
    return `${value}: chiffre et symbole ne sont pas autorisé \n Ne pas dépasser 20 caractères, minimum 3 caractères`;
  };

  //----------Création fonction et mettre RegEX dans une variable pour Prénom*Nom/Ville-----------------------
  let regExFirsNameLastNameCity = (value) => {
    return /^[A-Za-z]{3,20}$/.test(value);
  };

  //function pour gérer l'affichage du texte à côté de l'input pour indiquer qu'il faut le remplir correctement

  function dataControlMissingTextEmpty(getElementById) {
    document.getElementById(`${getElementById}`).textContent =
      "Veuillez bien remplir ce champ!";
  }

  //contrôle de la validité du prénom

  function firstNameControl() {
    const theFirstName = contact.firstName;
    if (regExFirsNameLastNameCity(theFirstName)) {
      dataControlMissingTextEmpty("firstNameEmpty");
      return true;
    } else {
      dataControlMissingText("firstNameEmpty");
      alert(textAlert("Prénom"));
      return false;
    }
  }
  // Contrôle de la validité du Nom
  function lastNameControl() {
    const theLastName = contact.lastName;
    if (regExFirsNameLastNameCity(theLastName)) {
      dataControlMissingTextEmpty("lastNameEmpty");
      return true;
    } else {
      dataControlMissingText("lastNameEmpty");
      alert(textAlert("Nom"));
      return false;
    }
  }

  //*******Création fonction et mettre RegEX dans une variable pour champ ville*************

  // Contrôle de la validité du Nom
  function cityControl() {
    if (regExFirsNameLastNameCity(contact.city)) {
      dataControlMissingTextEmpty("cityEmpty");

      return true;
    } else {
      dataControlMissingText("cityEmpty");
      alert(textAlert("Ville"));

      return false;
    }
  }

  //*******Création fonction et mettre RegEX dans une variable pour Email

  const regExEmail = (value) => {
    return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
  };
  //---------------------Contrôle de la validité email---------------------------------------
  function emailControl() {
    const yourEmail = contact.email;
    if (regExEmail(yourEmail)) {
      dataControlMissingTextEmpty("emailEmpty");
      return true;
    } else {
      dataControlMissingText("emailEmpty");
      alert("l'email n'est pas valide");
      return false;
    }
  }
  //*******Création fonction et mettre RegEX dans une variable pour adresse************

  const regExAdresse = (value) => {
    return /^[A-Za-z0-9\s]{3,70}$/.test(value);
  };
  //contrôle de la validité adresse--------------------------------
  function adressControl() {
    const yourAdress = contact.address;
    if (regExAdresse(yourAdress)) {
      dataControlMissingTextEmpty("addressEmpty");
      return true;
    } else {
      dataControlMissingText("addressEmpty");
      alert(
        "L'adresse doit contenir que des lettres sans ponctuation et des chiffres"
      );
      return false;
    }
  }

  //*******Création fonction et mettre RegEX dans une variable pour code postal*************

  const regExcodePostal = (value) => {
    return /^[0-9]{5}$/.test(value);
  };

  // Contrôle de la validité du code postal
  function codePostalControl() {
    const theCodePostal = contact.codePostal;
    if (regExcodePostal(theCodePostal)) {
      dataControlMissingTextEmpty("codePostalEmpty");
      return true;
    } else {
      dataControlMissingText("codePostalEmpty");
      alert(textAlert("Code postal: doit être composé de 5 chiffres"));
      return false;
    }
  }
  //Mettre l'objet "contact" dans un objet
  if (
    firstNameControl() &&
    lastNameControl() &&
    codePostalControl() &&
    emailControl() &&
    cityControl() &&
    adressControl()
  ) {
    localStorage.setItem("contact", JSON.stringify(contact));
  } else {
    alert("Veuillez bien remplir le formulaire");
  }
  ///******* Contrôle de la validité du NOM*****************

  //*************FIN GESTION VALIDATION DU FORMULAIRE********************************/

  //Mettre les values du formulaire et mettre les produits selectionnés dans un objet à envoyer ver le serveur
  let aEnvoyer = {
    cart,
    contact,
  };

  //--------------Mettre le contenu du LS dans les champs du formulaire-------------------------
  //Prendre la key dans le LS et la mettre dans une variable---------------------------------
  const dataLocalStorage = localStorage.getItem("contact");
  //convertir la chaine de caractère en objet JS
  const dataLocalStorageOjet = JSON.parse(dataLocalStorage);

  //Fonction pour que le champ du formulaire soit rempli par les données du LS si elle existe

  function remplirChampsInputDepuisLocalStorage(input) {
    if (dataLocalStorage == null) {
      console.log("le localStorage a pour valeur null");
    } else {
      document.querySelector(`#${input}`).value = dataLocalStorageOjet[input];
    }
  }
  remplirChampsInputDepuisLocalStorage("firstName");
  remplirChampsInputDepuisLocalStorage("lastName");
  remplirChampsInputDepuisLocalStorage("email");
  remplirChampsInputDepuisLocalStorage("address");
  remplirChampsInputDepuisLocalStorage("city");
  remplirChampsInputDepuisLocalStorage("codePostal");

  //---------------Envoie de l'objet "aEnvoyer" vers le serveur--------------------------//

  let url = "http://localhost:3000/api/furniture/order";

  const options = {
    method: "POST",
    body: JSON.stringify(aEnvoyer),
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, options)
    .then((res) => res.json())
    .then((res) => {
      const orderId = cart[0]._id;
      console.log(orderId);

      let order = JSON.stringify(res);
      localStorage.setItem("order", cart[0]._id);
      console.log(order);

      //Redirection vers la page de confirmation
      window.location.href = "order.html";
    })
    .catch(function (error) {
      alert("Impossible d'envoyer la requête");
    });

  //Mettre les valeurs du LS dans les champs du formulaire
  document.getElementById("firstName").value = dataLocalStorageOjet.firstName;
  document.getElementById("lastName").value = dataLocalStorageOjet.lastName;
  document.getElementById("email").value = dataLocalStorageOjet.email;
  document.getElementById("address").value = dataLocalStorageOjet.address;
  document.getElementById("city").value = dataLocalStorageOjet.city;
  document.getElementById("codePostal").value = dataLocalStorageOjet.codePostal;
});
// Contrôle validation formulaire du champ Nom et Prénom avant l'envoi dans LS
