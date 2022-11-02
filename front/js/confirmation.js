const orderId =  window.location.search.split("=")[1];

//let productId = new URL(window.location.href).searchParams.get('id');

//Récupération du paragraphe destiné à l'ID de commande
const getOrderSpan = document.querySelector('#orderId');
getOrderSpan.innerText = orderId;