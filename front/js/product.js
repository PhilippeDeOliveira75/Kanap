let productId = getUrlParam('id');
if(productId === '') displayNoProduct();

fetch(`http://localhost:3000/api/products/${productId}`)
	.then(function(res){
		if (res.ok){
			return res.json();
		}
	})

    .then(function(product){


		let myDiv = document.querySelector('.item__img');

		let myImg = document.createElement('img');
		myImg.setAttribute('src', product.imageUrl);
		myImg.setAttribute('alt', product.altTxt);
		myDiv.appendChild(myImg);

		let myH1 = document.getElementById('title');
		myH1.textContent = product.name;

		let mySpan = document.getElementById('price');
		mySpan.textContent = product.price;

		let myP = document.getElementById('description');
		myP.textContent = product.description;


		for(let index in product.colors){

			let myValue = document.getElementById('colors');
			let myOption = document.createElement('option');
			myOption.setAttribute('value', product.colors[index]);
			myOption.textContent = product.colors[index];
			myValue.appendChild(myOption);
		}

		let cartBtn = document.getElementById('addToCart');
		cartBtn.addEventListener('click', function(e) {
			addProductToCart()
		});
	})
	.catch(function(err){
		displayNoProduct();
		console.log(err);
	})


function displayNoProduct() {
	document.querySelector('article').remove();
	let errorMsg = document.createElement('h1');
	document.querySelector('.item').appendChild(errorMsg);
	errorMsg.classList.add('title');
	errorMsg.textContent = "Ce produit n'existe pas !";
}