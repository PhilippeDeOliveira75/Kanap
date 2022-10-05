let productId = new URL(window.location.href).searchParams.get('id');
    console.log(productId)

fetch("http://localhost:3000/api/products/" + productId)
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


		for(let colors in product.colors)
			console.log(colors);

			let myValue = document.getElementById('colors');

			let myOption = document.getElementsByTagName('option');
			myOption.setAttribute('value', colors);
			myValue.appendChild(myOption);


		

		//let mySelect = document.getElementsById('colors');

		//let myColor = document.getElementsByTagName('option');

		//onclick = document.getElementById('colors').getElementsByTagName('option').colors = 'selected';

		}

		)

	.catch(function(err){
		console.log(err);
	})
