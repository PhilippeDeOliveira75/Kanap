/*const totalItems = localStorage.length;
    console.log(totalItems);

const cart = [];

for(let i = 0; i < totalItems; i++){

    let item = localStorage.getItem(localStorage.key(i))
        console.log(item);

    let itemToCart = JSON.parse(item);

    cart.push(itemToCart)
}

console.log(cart);*/

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

    remove(product){
        this.cart = this.cart.filter(p => p.id == product.id);
        this.save();
    }

    changeQuanitity(product, quantity){
        let foundProduct = this.basket.find(p => p.id == product.id);
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
    
}
