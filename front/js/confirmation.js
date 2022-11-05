let orderId = getUrlParam('orderId');
console.log(orderId);

if(orderId === '' || orderId === null) {
	let mySection = document.querySelector('.confirmation');
	mySection.textContent = '';
	let myH1 = document.createElement("h1");
	myH1.textContent = "Commande invalide";
	mySection.appendChild(myH1);
}
else {
	//Récupération du paragraphe destiné à l'ID de commande
	const getOrderSpan = document.querySelector('#orderId');
	getOrderSpan.innerText = orderId;
}