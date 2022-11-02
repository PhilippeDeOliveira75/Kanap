/*function saveCart(){
	localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart(){
	localStorage.getItem("cart");
}

function itemCart(){
	JSON.parse(loadCart) || [];
}
*/

let cart = [];
let cartLS = localStorage.getItem("cart");
if(cartLS !== null) {
	cart = JSON.parse(cartLS)
}else{
	let mySection = document.querySelector('.cart');
	mySection.remove();
	let myH1 = document.querySelector("h1");
	myH1.textContent = "Votre panier est vide";
}

let totalCartItems = 0;
let totalAmount = 0;

for(let index in cart){
	let cartItem = cart[index];
	let cartItemId = cartItem.id;

	

	fetch(`http://localhost:3000/api/products/${cartItemId}`)
		.then(function(res){
			if (res.ok){
				return res.json();
			}
		})

		.then(function(product){

			let mySection = document.getElementById('cart__items');

			let myArticle = document.createElement('article');
				myArticle.classList.add('cart__item');
				myArticle.setAttribute('data-id', cartItemId);
				myArticle.setAttribute('data-color', cartItem.color);
				mySection.appendChild(myArticle);

			let myImgDiv = document.createElement('div');
				myImgDiv.classList.add('cart__item__img');
				myArticle.appendChild(myImgDiv);

			let myImg = document.createElement('img');
				myImg.setAttribute('src', product.imageUrl);
				myImg.setAttribute('alt', product.altTxt);
				myImgDiv.appendChild(myImg);

			let myItemContentDiv = document.createElement('div');
				myItemContentDiv.classList.add('cart__item__content');
				myArticle.appendChild(myItemContentDiv);

			let myItemContentDescriptionDiv = document.createElement('div');
				myItemContentDescriptionDiv.classList.add('cart__item__content__description');
				myItemContentDiv.appendChild(myItemContentDescriptionDiv);

			let myH2 = document.createElement('h2');
				myH2.textContent = product.name;
				myItemContentDescriptionDiv.appendChild(myH2);

			let myColor = document.createElement('p');
				myColor.textContent = cartItem.color;
				myItemContentDescriptionDiv.appendChild(myColor);

			let myPrice = document.createElement('p');
				myPrice.textContent = product.price + " €";
				myItemContentDescriptionDiv.appendChild(myPrice);

			let myContentSettingsDiv = document.createElement('div');
				myContentSettingsDiv.classList.add('cart__item__content__settings');
				myItemContentDiv.appendChild(myContentSettingsDiv);

			let myContentSettingsQuantityDiv = document.createElement('div');
				myContentSettingsQuantityDiv.classList.add('cart__item__content__settings__quantity');
				myContentSettingsDiv.appendChild(myContentSettingsQuantityDiv);

			let myQuantity = document.createElement('p');
				myQuantity.textContent = "Qté : ";
				myContentSettingsQuantityDiv.appendChild(myQuantity);

			let myInputQuantity = document.createElement("input")
				myInputQuantity.setAttribute('type', "number");
				myInputQuantity.setAttribute('name', cartItem.quantity);
				myInputQuantity.setAttribute('min', 1);
				myInputQuantity.setAttribute('max', 100);
				myInputQuantity.setAttribute('value', cartItem.quantity);
				myInputQuantity.classList.add('itemQuantity');
				myContentSettingsQuantityDiv.appendChild(myInputQuantity);
				// Changer la quantité et la sauvegarder dans le LS
				myInputQuantity.addEventListener('change', function (e) {
					//Récupérer le panier existant depuis le localStorage
					let cartLS = localStorage.getItem("cart");
					//loadCart
						console.log(cart);
					//Trouver le produit recherché
					let index = cart.findIndex(item => (cartItemId === item.id && cartItem.color === item.color));
					console.log(index);
  
					if(index !== -1) {
  
						//Modifier l'article du tableau
						cart[index].quantity = Number(myInputQuantity.value);
  
						//Sauvegarder le nouveau panier dans le localStorage
						localStorage.setItem("cart", JSON.stringify(cart));
						//saveCart;
  
						//Supprimer le visuel de l'article
						window.location.reload();
						myArticle.remove();
						let deleteItemFromPage = document.querySelector(`article[data-id="${cartItemId}"][data-color="${cartItem.color}"]`);
							console.log(deleteItemFromPage);
							deleteItemFromPage.remove();
  
  
						document.getElementById('totalQuantity').textContent = 0;
						document.getElementById('totalPrice').textContent = 0;
						for(let indexTmp in cart){
							let cartItemTmp = cart[indexTmp];
							   	refreshTotals(cartItemTmp.quantity, product.price);
						}
					  }
				  });
  
				let myContentSettingsDelete = document.createElement('div');
					myContentSettingsDelete.classList.add('cart__item__content__settings__delete');
					myContentSettingsDiv.appendChild(myContentSettingsDelete);
  
				let myDeleteItem = document.createElement('p');
					myDeleteItem.classList.add('deleteItem');
					myDeleteItem.textContent = "Supprimer";
					myContentSettingsDelete.appendChild(myDeleteItem);
					myDeleteItem.addEventListener('click', function(e) {
  
					//Récupérer le panier existant depuis le localStorage
				let cartLS = localStorage.getItem("cart");
				//loadCart;
					  //Trouver le produit recherché
				let index = cart.findIndex(item => (cartItemId === item.id && cartItem.color === item.color));
					if(index !== -1) {
						//Supprimer l'article du tableau
						cart.splice(index, 1);
  
						//Sauvegarder le nouveau panier dans le localStorage
						localStorage.setItem("cart", JSON.stringify(cart))
						//saveCart;
  
						//Supprimer le visuel de l'article
						window.location.reload();
						myArticle.remove();
						let deleteItemFromPage = document.querySelector(`article[data-id="${cartItemId}"][data-color="${cartItem.color}"]`);
							deleteItemFromPage.remove()
  
  
						document.getElementById('totalQuantity').textContent = 0;
						document.getElementById('totalPrice').textContent = 0;
						for(let indexTmp in cart){
						 	let cartItemTmp = cart[indexTmp];
							refreshTotals(cartItemTmp.quantity, product.price);
						}
					}
				});

				refreshTotals(cartItem.quantity, product.price);
  
				// totalCartItems
				totalCartItems += cartItem.quantity;
				let totalCartItemsSpan = document.getElementById('totalQuantity');
				totalCartItemsSpan.textContent = totalCartItems;
  
				// totalAmount
				totalAmount = totalAmount + (cartItem.quantity * product.price);
				let totalAmountSpan = document.getElementById('totalPrice');
				totalAmountSpan.textContent = totalAmount;
		})

		.catch(function(err){
			  console.log(err);
		})

		function refreshTotals(quantity, price) {
			// totalCartItems
			let totalCartItemsSpan = document.getElementById('totalQuantity');
			totalCartItemsSpan.textContent = Number(totalCartItemsSpan.textContent) + Number(quantity);

			// totalAmount
			let totalAmountSpan = document.getElementById('totalPrice');
			totalAmountSpan.textContent = Number(totalAmountSpan.textContent) + (quantity * Number(price));
		}
}

// Adding event listeners
document.querySelector('#firstName').addEventListener("input", () => {
	// Function allowing to verify firstname input
	verificationInput('#firstName', '#firstNameErrorMsg', "^[-a-zA-ZÀ-ÿ' ]+$");
});

document.querySelector('#lastName').addEventListener("input", () => {
	// Function allowing to verify lastname input
	verificationInput('#lastName', '#lastNameErrorMsg', "^[-a-zA-ZÀ-ÿ' ]+$");
});

document.querySelector('#address').addEventListener("input", () => {
	// Function allowing to verify address input
	verificationInput('#address', '#addressErrorMsg', "^[-0-9a-zA-ZÀ-ÿ' ]+$");
});

document.querySelector('#city').addEventListener("input", () => {
	// Function allowing to verify city input
	verificationInput('#city', '#cityErrorMsg', "^[-a-zA-ZÀ-ÿ' ]+$");
});

document.querySelector('#email').addEventListener("input", () => {
	// Function allowing to verify email input
	verificationInput('#email', '#emailErrorMsg', "^[-A-Za-z0-9._]+@[A-Za-z0-9.]+\.[A-Za-z]+$");
});

// ajout du listener sur le bouton + envoi
document.querySelector('#order').addEventListener("click", (e) => {
	e.preventDefault();
	if(verificationBeforeSend() === true) {
		//Préparation du tableau productsIds
		let cartContent = JSON.parse(localStorage.getItem("cart")) || [];
		//itemCart;
		let productsIds = [];
		for(let i = 0; i < cartContent.length; i++){
			productsIds.push(cartContent[i].id);
		}

		//Préparation de l'objet de la commande qui va s'envoyer
		let contact = {
			firstName: document.querySelector('#firstName').value,
			lastName: document.querySelector('#lastName').value,
			address: document.querySelector('#address').value,
			city: document.querySelector('#city').value,
			email: document.querySelector('#email').value,
		};

		const data = {contact: contact, products: productsIds};
		fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			headers: {'Content-Type': 'application/json', 'Accept' : 'application/json'},
			body: JSON.stringify(data)
		})
		.then((res) => {
			return res.json()
		})
		.then((res) => {
			console.log(res.orderId);
			localStorage.setItem("cart", JSON.stringify([]));
			//saveCart;
			window.location.href = "confirmation.html?orderId=" + res.orderId;
		})
		.catch((error) => {
			console.log(error);
		})
	}
});

// Function allowing to verify everything before to send the form
function verificationBeforeSend() {
	let cartContent = JSON.parse(localStorage.getItem("cart")) || [];
	//itemCart;
	if(cartContent.length == 0){
		alert("Votre panier est vide !");
		return false;
	}
	if(verificationFirstname() === false) return false;
	if(verificationLastname() === false) return false;
	if(verificationAddress() === false) return false;
	if(verificationCity() === false) return false;
	if(verificationEmail() === false) return false;
	return true;
}

// Function allowing to verify input
function verificationInput(inputSelector = '', errorMsgSelector = '', regexExpression = '') {
	const input = document.querySelector(inputSelector);
	let errorMsg = document.querySelector(errorMsgSelector);
	let regex = new RegExp(regexExpression);
	if(regex.test(input.value)) {
		errorMsg.innerText = "";
		return true;
	}
	else {
		errorMsg.innerText = "Ce champ est incorrect";
		return false;
	}
}
