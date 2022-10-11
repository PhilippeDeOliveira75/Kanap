let productId = new URL(window.location.href).searchParams.get('id');


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
			let color = document.querySelector("#colors").value
				
			let qty = document.querySelector("#quantity").value
				
			let price = document.querySelector("#price").value
			
			if(color == 0 || qty == 0){
				alert("Vous n'avez pas indiquez de couleur ou de quanité");
				return
			}

			let infoProduct = {
				id : productId,
				color : color,
				quantity : Number(qty),
				price : price
				}
			
			localStorage.setItem("cartContent", JSON.stringify(infoProduct))

			//window.location.href = "./cart.html";
		})
	})

	
	.catch(function(err){
		console.log(err);
	})