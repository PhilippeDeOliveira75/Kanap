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
			let color = document.getElementById('colors').value;
			let qty = document.getElementById('quantity').value;
			if(color == '' || qty <= 0 || qty > 100){
				alert("Vous n'avez pas indiquez de couleur ou de quanité");
				return
			}
			addProductToCart(productId, color, Number(qty))
			if(confirm("Souhaitez vous aller sur la page panier ?")) {
				window.location.href = "./cart.html"
			}
		});
	})
	.catch(function(err){
		displayNoProduct();
		console.log(err);
	})