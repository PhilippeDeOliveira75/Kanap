let productId = new URL(window.location.href).searchParams.get('id');
    console.log(productId)

fetch(`http://localhost:3000/api/products/${productId}`)
	.then(function(res){
		if (res.ok){
			return res.json();
		}
	})

    .then(function(product){
		console.log(product);

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
			console.log(product.colors[index]);

			let myValue = document.getElementById('colors');
			let myOption = document.createElement('option');
			myOption.setAttribute('value', product.colors[index]);
			myOption.textContent = product.colors[index];
			myValue.appendChild(myOption);
		}
	})

	.catch(function(err){
		console.log(err);
	})
