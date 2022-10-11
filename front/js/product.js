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

		let cartBtn = document.getElementById('addToCart');

		cartBtn.addEventListener('click', function(e) {
			let color = document.querySelector("#colors").value
				console.log();
			let qty = document.querySelector('#quantity').value
				console.log();
			
			if(color == 0 || qty == 0)
				alert("Vous n'avez pas indiquez de couleur ou de quanité ")
			
			let price = product.price;

			let cart = {
				id : productId,
				color : color,
				quantity : Number(qty),
				price : price
			}
				console.log();
			
			localStorage.setItem("cart", JSON.stringify(cart));

			window.location.href = "./cart.html";
		})
	})

	
	.catch(function(err){
		console.log(err);
	})
	
	class cart{
		constructor(){
			let cart = localStorage.getItem("cart");
			if(cart == null){
				this.cart = [];
			}else{
				this.cart = JSON.parse(cart);
			}
		}
	
		save(){
			localStorage.setItem("cart", JSON.stringify(this.cart));
		}

		add(product){
			let foundProduct = this.cart.find(p => p.id == product.id);
			if(foundProduct != undefined){
				foundProduct.quantity ++;
			}else{
				product.quantity = 1;
				this.cart.push(product);
			}
			this.save()
		}
	
	}