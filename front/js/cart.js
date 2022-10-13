let cart = [];
let cartLS = localStorage.getItem("cart")
if(cartLS !== null) cart = JSON.parse(cartLS)

for(let index in cart){

    let cartItem = cart[index];
    //console.log(cart);
    //console.log(typeof cartItem);

    let cartItemId = cartItem.id;
    console.log(cartItem.color);

    fetch(`http://localhost:3000/api/products/${cartItemId}`)
        .then(function(res){
		    if (res.ok){
			    return res.json();
		    }
	    })
    
        .then(function(product){
            console.log(product);
           
           let myImgDiv = document.querySelector('.cart__item__img');
    
            let myImg = document.createElement('img');
            myImg.setAttribute('src', product.imageUrl);
            myImg.setAttribute('alt', product.altTxt);
            myImgDiv.appendChild(myImg);
    
            let myDescriptionDiv = document.querySelector('.cart__item__content__description');
    
            let myH2 = document.createElement('h2');
            myH2.textContent = product.name;
            myDescriptionDiv.appendChild(myH2);
    
            let myColor = document.createElement('p');
            myColor.textContent = cartItem.color;
            myDescriptionDiv.appendChild(myColor);
    
            let myPrice = document.createElement('p');
            myPrice.textContent = product.price + " €";
            myDescriptionDiv.appendChild(myPrice);
    
            let myQuantityDiv = document.querySelector('.cart__item__content__settings__quantity');
    
            let myQuantity = document.createElement('p');
            myQuantity.textContent = "Qté : " + cartItem.quantity;
            myQuantityDiv.appendChild(myQuantity);
        })
    
        .catch(function(err){
            console.log(err);
        })
}

