//Récupération des products//

fetch("http://localhost:3000/api/products")
	.then(function(res){
		if (res.ok){
			return res.json();
		}
	})

	.then(function(products){
		console.log(products);

		for(let index in products) {

			let myA = document.createElement('a');
			myA.setAttribute('href', './product.html?id=' + products[index]._id);
			document.getElementById('items').appendChild(myA);

			let myArticle = document.createElement('article');
			myA.appendChild(myArticle);

			let myImg = document.createElement('img');
			myImg.setAttribute('src', products[index].imageUrl);
			myImg.setAttribute('alt', products[index].altTxt);
			myArticle.appendChild(myImg);

			let myH3 = document.createElement('h3');
			myH3.setAttribute('class', 'productName');
			myH3.textContent = products[index].name;
			myArticle.appendChild(myH3);

			let myP = document.createElement('p');
			myP.textContent = products[index].description;
			myP.setAttribute('class', 'productDescription');
			myArticle.appendChild(myP);
		}
	})

	.catch(function(err){
		console.log("FAILED");
		console.log(err)
	})