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

/*function deleteProductToCart(cartItemId = '', cartItemColor = '') {
	//Récupérer le panier existant depuis le localStorage
	let cart = getCart();
	//Trouver le produit recherché
	let index = findProductFromCart(cartItemId, cartItemColor);
	//Modifier l'article du tableau
	let myInputQuantity 
	cart[index].quantity = Number(myInputQuantity.value);
	//Sauvegarder le nouveau panier dans le localStorage
	saveCart(cart);
}*/

/*function updateProductQuantityFromCart(productId, productColor, quantity) {
	let cart = getCart();
	//Trouver le produit recherché
	let index = findProductFromCart(productId, productColor);
	//Modifier l'article du tableau
	cart[index].quantity = Number(quantity);
	//Sauvegarder le nouveau panier dans le localStorage
	saveCart(cart);
	//deleteProductToCart(cartItemId, cartItemColor);
	window.location.reload();
}*/

function addProductToCart(productId = '', productColor = '', quantity = 0) {
	let color = document.getElementById('colors').value	
			let qty = document.getElementById('quantity').value;	
			if(color == '' || qty <= 0 || qty > 100){
				alert("Vous n'avez pas indiquez de couleur ou de quanité");
				return
			}
			let infoProduct = {
				id : productId,
				color : color,
				quantity : Number(qty),
				}
			// Récupérer le panier existant depuis le localStorage
			let cart = getCart();

			// Ajouter le produit au panier
			let index = findProductFromCart(productId, productColor);
			console.log(index)
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
			if(confirm("Souhaitez vous aller sur la page panier ?")) {
				window.location.href = "./cart.html"
			}
}