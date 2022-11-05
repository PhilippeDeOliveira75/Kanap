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
	//Modifier l'article du tableau
	cart[index].quantity = Number(myInputQuantity.value);
	//Sauvegarder le nouveau panier dans le localStorage
	saveCart(cart);
}

function updateProductQuantityFromCart(productId = '', productColor = '', quantity = 0) {

}

function addProductToCart(productId = '', productColor = '', quantity = 0) {

}