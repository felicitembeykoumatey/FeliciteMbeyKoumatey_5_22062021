fetch("http://localhost:3000/api/furniture/").then((res) => res.json());
// Recupération de la chaine de requete dans l'url
const queryString_url_id = window.location.search;
console.log(queryString_url_id);
//pour extraire l'id
const urlSearchParams = new UrlSearchParams(queryString_url_id);
console.log(urlSearchParams);
const _id = urlSearchParams.get("_id");
console.log(_id);
let res = await fetch(`http://localhost:3000/api/furniture/${_id}`);
