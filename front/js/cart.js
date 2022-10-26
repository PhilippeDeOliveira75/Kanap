let cart = [];
let cartLS = localStorage.getItem("cart")
if(cartLS !== null) cart = JSON.parse(cartLS)

let totalCartItems = 0;
let totalAmount = 0;

verificationBeforeSend();

for(let index in cart){
    let cartItem = cart[index];
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
                myQuantity.textContent = "Qté : ";
                myContentSettingsQuantityDiv.appendChild(myQuantity);
                
            let myInputQuantity = document.createElement("input")
                myInputQuantity.setAttribute('type', "number");
                myInputQuantity.setAttribute('name', cartItem.quantity);
                myInputQuantity.setAttribute('min', 1);
                myInputQuantity.setAttribute('max', 100);
                myInputQuantity.setAttribute('value', cartItem.quantity);
                myInputQuantity.classList.add('itemQuantity');
                myContentSettingsQuantityDiv.appendChild(myInputQuantity);
                // Changer la quantité et la sauvegarder dans le LS
                myInputQuantity.addEventListener('change', function (e) {
                    //Récupérer le panier existant depuis le localStorage
                    let cartLS = localStorage.getItem("cart")
                        console.log(cartLS);
                    //Trouver le produit recherché
                    let index = cart.findIndex(item => (cartItemId === item.id && cartItem.color === item.color));
                    console.log(index);
  
                    if(index !== -1) {
  
                        //Modifier l'article du tableau
                        cart[index].quantity = Number(myInputQuantity.value);
  
                        //Sauvegarder le nouveau panier dans le localStorage
                        localStorage.setItem("cart", JSON.stringify(cart));
  
                        //Supprimer le visuel de l'article
                        window.location.reload();
                        myArticle.remove();
                        let deleteItemFromPage = document.querySelector(`article[data-id="${cartItemId}"][data-color="${cartItem.color}"]`);
                            console.log(deleteItemFromPage);
                            deleteItemFromPage.remove();
  
  
                        document.getElementById('totalQuantity').textContent = 0;
                        document.getElementById('totalPrice').textContent = 0;
                        for(let indexTmp in cart){
                        	let cartItemTmp = cart[indexTmp];
                               	refreshTotals(cartItemTmp.quantity, product.price);
                        }
                      }
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
                    let cartLS = localStorage.getItem("cart");
                      //Trouver le produit recherché
                let index = cart.findIndex(item => (cartItemId === item.id && cartItem.color === item.color));
                    if(index !== -1) {
                        //Supprimer l'article du tableau
                        cart.splice(index, 1);
  
                        //Sauvegarder le nouveau panier dans le localStorage
                        localStorage.setItem("cart", JSON.stringify(cart))
  
                        //Supprimer le visuel de l'article
                        window.location.reload();
                        myArticle.remove();
                        let deleteItemFromPage = document.querySelector(`article[data-id="${cartItemId}"][data-color="${cartItem.color}"]`);
                            deleteItemFromPage.remove()
  
  
                        document.getElementById('totalQuantity').textContent = 0;
                        document.getElementById('totalPrice').textContent = 0;
                        for(let indexTmp in cart){
                         	let cartItemTmp = cart[indexTmp];
                            refreshTotals(cartItemTmp.quantity, product.price);
                        }
                    }
                });

                refreshTotals(cartItem.quantity, product.price);
  
                // totalCartItems
                totalCartItems += cartItem.quantity;
                let totalCartItemsSpan = document.getElementById('totalQuantity');
                totalCartItemsSpan.textContent = totalCartItems;
  
                // totalAmount
                totalAmount = totalAmount + (cartItem.quantity * product.price);
                let totalAmountSpan = document.getElementById('totalPrice');
                totalAmountSpan.textContent = totalAmount;
        })
        
        .catch(function(err){
              console.log(err);
        })

        function refreshTotals(quantity, price) {
	        // totalCartItems
	        let totalCartItemsSpan = document.getElementById('totalQuantity');
	        totalCartItemsSpan.textContent = Number(totalCartItemsSpan.textContent) + Number(quantity);

	        // totalAmount
	        let totalAmountSpan = document.getElementById('totalPrice');
	        totalAmountSpan.textContent = Number(totalAmountSpan.textContent) + (quantity * Number(price));
        }
}
  
function verificationBeforeSend(){
    let cartContent = JSON.parse(localStorage.getItem("cart")) || [];
    //Récupération du bouton d'envoie
    const btnSubmit = document.querySelector('#order');

    let products= [];

    for(let i = 0; i < cartContent.length; i++){
        products.push(cartContent[i].id);
        console.log(products)
    }

    //Création des valeurs vrai
    let boolFirstName = true;
    let boolLastName = true;
    let boolAddress = true;
    let boolCity = true;
    let boolEmail = true;

    //Récupération des textes des inputs 
    const fileFirstName = document.querySelector('#firstName');
    const fileLastName = document.querySelector('#lastName');
    const fileAddress = document.querySelector('#address');
    const fileCity = document.querySelector('#city');
    const fileEmail = document.querySelector('#email');
    
    //Récupération des emplacements pour les messages d'erreurs
    let errorFirstName = document.querySelector('#firstNameErrorMsg');
    let errorLastName = document.querySelector('#lastNameErrorMsg');
    let errorAddress = document.querySelector('#addressErrorMsg');
    let errorCity = document.querySelector('#cityErrorMsg')
    let errorEmail = document.querySelector('#emailErrorMsg');

    //Préparation de l'objet de la commande qui va s'envoyer
    let contact = { };

    //ajout du listener pour vérifier les différents champs
    fileFirstName.addEventListener("change", () => {
        if(fileFirstName.value.match("[0-9]")){
            errorFirstName.innerText = "Votre prénom ne peut contenir de chiffre";
            boolFirstName = false;
        } else if(fileFirstName.value.match(/^\s*$/g)){
            errorFirstName.innerText = "Ce champ est obligatoire";
            boolFirstName = false;
        } else {
            errorFirstName.innerText = "";
            boolFirstName = true;
        }
    });

    fileLastName.addEventListener("change", () => {
        if(fileLastName.value.match("[0-9]")) {
            errorLastName.innerText = "Votre nom ne peut contenir de chiffre";
            boolLastName = false;
        } else if(fileLastName.value.match(/^\s*$/g)){
            errorLastName.innerText = "Ce champ est obligatoire";
            boolLastName = false;
        }
        else {
            errorLastName.innerText = "";
            boolLastName = true;
        }
    });

    fileAddress.addEventListener("change", () => {
        if(fileAddress.value.match(/^\s*$/g)){
            errorAddress.innerText = "Ce champ est obligatoire";
            boolAddress = false;
        }
        else {
            errorAddress.innerText = "";
            boolAddress = true;
        }
    });

    fileCity.addEventListener("change", () => {
        if(fileCity.value.match(/^\s*$/g)){
            errorCity.innerText = "Ce champ est obligatoire";
            boolCity = false;
        }
        else {
            errorCity.innerText = "";
            boolCity = true;
        }
    });

    fileEmail.addEventListener("change", () => {
        if(fileEmail.value.match(/^\s*$/g)) {
            errorEmail.innerText = "Ce champ est obligatoire";
            boolEmail = false;
        } else if(!fileEmail.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)){
            errorEmail.innerText = "Votre mail n'est pas correct";
            boolEmail = false;
        } else {
            errorEmail.innerText = "";
            boolEmail = true;
        }
    });


    //ajout du listener sur le bouton + envoi
    btnSubmit.addEventListener("click", (e) => {

        e.preventDefault();

        let testBool = boolFirstName==true && boolLastName==true && boolAddress==true && boolCity==true && boolEmail==true;

        if(products.length == 0){
            alert("Votre panier est vide !");
        }
        else if(fileFirstName.value == "" && fileLastName.value == "" && fileAddress.value == "" && fileCity.value == "" && fileEmail.value == ""){
            errorFirstName.innerText = "Ce champ est obligatoire"; boolFirstName = false;
            errorLastName.innerText = "Ce champ est obligatoire"; boolLastName = false;
            errorAddress.innerText = "Ce champ est obligatoire"; boolAddress = false;
            errorCity.innerText = "Ce champ est obligatoire"; boolCity = false;
            errorEmail.innerText = "Ce champ est obligatoire"; boolEmail =false;
        } else if(fileFirstName.value == "" || fileLastName.value == "" || fileAddress.value == "" || fileCity.value == "" || fileEmail.value == ""){
            if(fileFirstName.value == ""){
                errorFirstName.innerText = "Ce champ est obligatoire"; boolFirstName = false;
            } else if(fileLastName.value == ""){
                errorLastName.innerText = "Ce champ est obligatoire"; boolLastName = false;
            } else if(fileAddress.value == ""){           
                errorAddress.innerText = "Ce champ est obligatoire"; boolAddress = false;
            } else if(fileCity.value == ""){
                errorCity.innerText = "Ce champ est obligatoire"; boolCity = false;
            } else if(fileEmail.value == ""){
                errorEmail.innerText = "Ce champ est obligatoire"; boolEmail =false;
            }
        }         
        else if(testBool == true){
            contact = { 
                firstName: fileFirstName.value,
                lastName: fileLastName.value,
                address: fileAddress.value,
                city: fileCity.value,
                email: fileEmail.value,
            };            

            const data = {contact: contact, products: products};

            fetch("http://localhost:3000/api/products/order", {
                method: "POST",
                headers: {'Content-Type': 'application/json', 'Accept' : 'application/json'},
                body: JSON.stringify(data)
            })
            .then((res) => {
                return res.json()
            })
            .then((res) => {
                console.log(res.orderId);
                //localStorage.setItem("articleStoredConfirm",JSON.stringify({cartContent, contact}));
                localStorage.setItem("cart", JSON.stringify([]));
                window.location.href = "../html/confirmation.html?orderId=" + res.orderId;
            })
            .catch((error) => {
                console.log(error);
            })
        }
    })
}