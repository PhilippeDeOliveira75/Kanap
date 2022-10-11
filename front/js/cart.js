
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
		myColor.textContent = product.color;
        myDescriptionDiv.appendChild(myColor);

		let myPrice = document.createElement('p');
		myPrice.textContent = product.price;
        myDescriptionDiv.appendChild(myPrice);

        let myQuantityDiv = document.querySelector('.cart__item__content__settings__quantity');

        let myQuantity = document.createElement('p');
        myQuantity.textContent = product.quantity;
        myQuantityDiv.appendChild(myQuantity);
        
/*class cart{
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
            //product.quantity = 1;
            this.cart.push(product);
        }
        this.save()
    }

    remove(product){
        this.cart = this.cart.filter(p => p.id == product.id);
        this.save();
    }

    changeQuanitity(product, quantity){
        let foundProduct = this.cart.find(p => p.id == product.id);
        if(foundProduct != undefined){
            foundProduct.quantity += quantity;
            if(foundProduct.quantity <= 0){
                this.remove(foundProduct);
            }else{
                this.save();
            }
        }
    }

    totalPrice(){
        let total = 0; 
        for(let product of this.cart){
            total += product.quantity * product.price;
        }
        return total;
    }
    
}*/
