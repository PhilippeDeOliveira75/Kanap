let cart = [];
let cartLS = localStorage.getItem("cart")
if(cartLS !== null) cart = JSON.parse(cartLS)

for(let index in cart){

    let cartItem = cart[index];
    //console.log(cart);
    //console.log(typeof cartItem);

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
                myQuantity.textContent = "Qté : " + cartItem.quantity;
                myContentSettingsQuantityDiv.appendChild(myQuantity);
            
            let myInputQuantity = document.createElement("input")
                myInputQuantity.setAttribute('type', "number");
                myInputQuantity.setAttribute('name', cartItem.quantity);
                myInputQuantity.setAttribute('min', 1);
                myInputQuantity.setAttribute('max', 100);
                myInputQuantity.setAttribute('value', cartItem.quantity);
                myInputQuantity.classList.add('itemQuantity');
                myContentSettingsQuantityDiv.appendChild(myInputQuantity);

                myInputQuantity.addEventListener('input', function (evt) {
                    cartItem.quantity(input.value);
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
                    let cartLS = localStorage.getItem("cart")
                        console.log(cartLS);
                    //Trouver le produit recherché
                    let deleteItem = cart.findIndex(item => (cartItemId === item.id && cartItem.color === item.color));
                        console.log(deleteItem);
                    //Supprimer l'article du tableau
                    cart.splice(deleteItem,1);
                    
                    //Sauvegarder le nouveau panier dans le localStorage
                    localStorage.setItem("cart", JSON.stringify(cart))
                    
                    //Supprimer le visuel de l'article
                    
                    let deleteItemFromPage = document.querySelector(`article[data-id="${cartItemId}"][data-color="${cartItem.color}"]`);
                        console.log(deleteItemFromPage);
                        deleteItemFromPage.remove()

                });
        })
    
        .catch(function(err){
            console.log(err);
        })      
    }