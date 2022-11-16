function getUrlParam(paramName = '') {
	let paramValue = new URL(window.location.href).searchParams.get(paramName);
	if(paramValue === null) return '';
	return paramValue;
}

function getCart() {
	let cart = JSON.parse(localStorage.getItem("cart")) || [];
	return cart;
}

function saveCart(cart = []) {
	localStorage.setItem("cart", JSON.stringify(cart));
}

function findProductFromCart(productId = '', productColor = '') {
	let cart = getCart();
	let index = cart.findIndex(item => (productId == item.id && productColor == item.color));
	return index;
}

function deleteProductToCart(productId = '', productColor = '') {
	//Récupérer le panier existant depuis le localStorage
	let cart = getCart();
	//Trouver le produit recherché
	let index = findProductFromCart(productId, productColor);
	//Supprimer l'article du tableau
	cart.splice(index, 1);
	//Sauvegarder le nouveau panier dans le localStorage
	saveCart(cart);
}

function updateProductQuantityFromCart(productId = '', productColor = '', quantity = 0) {
	//Récupérer le panier existant depuis le localStorage
	let cart = getCart();
	//Trouver le produit recherché
	let index = findProductFromCart(productId, productColor);
	//Modifier l'article du tableau
	cart[index].quantity = Number(quantity);
	//Sauvegarder le nouveau panier dans le localStorage
	saveCart(cart);
}

function addProductToCart(productId = '', productColor = '', quantity = 0) {
	// Récupérer le panier existant depuis le localStorage
	let cart = getCart();
	// Récupération des données
	let infoProduct = {
		id : productId,
		color : productColor,
		quantity : Number(quantity)
	}
	//Trouver le produit recherché
	let index = findProductFromCart(productId, productColor);
	if(index === -1) {
		// Cas ou le produit n'est pas dans le panier : Ajouter le produit au tableau
		cart.push(infoProduct)
	}
	else {
		// Cas ou le produit est déjà dans le panier : Modifier la quantité
		cart[index].quantity = Number(cart[index].quantity) + Number(quantity);
	}
	// Sauvegarder le panier dans le localStorage
	saveCart(cart);
}


function displayNoProduct() {
	document.querySelector('article').remove();
	let errorMsg = document.createElement('h1');
	document.querySelector('.item').appendChild(errorMsg);
	errorMsg.classList.add('title');
	errorMsg.textContent = "Ce produit n'existe pas !";
}