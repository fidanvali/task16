// Alış-veriş səpeti məhsulları üçün boş array yaradırıq.
let basketItems = [];

// Səpetə məhsul əlavə edən funksiya
function addToBasket() {
    const item = document.getElementById("item").value;
    const price = parseFloat(document.getElementById("price").value);

    if (item && !isNaN(price)) {
        basketItems.push({ item, price });
        document.getElementById("item").value = "";
        document.getElementById("price").value = "";
        updateBasket();
    } else {
        alert("Xahiş edirik düzgün məlumatları daxil edin.");
    }
}

// Səpeti yeniləyən funksiya
function updateBasket() {
    const basketList = document.getElementById("basket");
    basketList.innerHTML = "";
    
    for (const item of basketItems) {
        const listItem = document.createElement("li");
        listItem.textContent = `${item.item}: ${item.price} AZN`;
        basketList.appendChild(listItem);
    }
}

// Cəmi məbləği hesablamaq üçün funksiya
function calculateTotal() {
    let total = 0;
    for (const item of basketItems) {
        total += item.price;
    }
    document.getElementById("total").textContent = total.toFixed(2);
}
// Məhsulları localStorage-də saxlamaq üçün funksiya
function addToCart(name, price) {
    // Əlavə edilmiş məhsulları LocalStorage-dan oxuq
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Yeni məhsulu səbətə əlavə edək
    cart.push({ name, price });
    
    // Səbeti LocalStorage-a yeniləyək
    localStorage.setItem("cart", JSON.stringify(cart));
    
    alert("Məhsul səbətə əlavə edildi.");
}

// Bütün "Add to Cart" düymələrinə click hadisələri əlavə edək
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        const name = this.getAttribute("data-name");
        const price = parseFloat(this.getAttribute("data-price"));
        addToCart(name, price);
    });
});
// Məhsulları göstərmək və "X" düyməsi əlavə etmək üçün funksiya
function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("span");
        itemName.textContent = cartItem.name;
        cartItemDiv.appendChild(itemName);

        const removeButton = document.createElement("button");
        removeButton.textContent = "X";
        removeButton.addEventListener("click", function() {
            // "X" düyməsinə click zamanı məhsulu silək
            removeFromCart(i);
            displayCart(); // Məhsulları yenidən göstərək
        });
        cartItemDiv.appendChild(removeButton);

        cartDiv.appendChild(cartItemDiv);
    }
}

// Məhsulu səbətdən silmək üçün funksiya
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// "Add to Cart" düyməsini əlavə etmək üçün funksiya
function addToCart(name, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart(); // Səbeti yeniləyək
}

// Bütün "Add to Cart" düymələrinə click hadisələri əlavə edək
const addtoCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach(button => {
    button.addEventListener("click", function() {
        const name = this.getAttribute("data-name");
        const price = parseFloat(this.getAttribute("data-price"));
        addToCart(name, price);
    });
});

// Səbeti göstərək
displayCart();
// LocalStorage-dan səbeti oxumaq
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Səbəti göstərmək üçün funksiya
function displayCart() {
    const cart = getCart();
    const cartSection = document.querySelector(".cart");
    cartSection.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("span");
        itemName.textContent = cartItem.name;
        cartItemDiv.appendChild(itemName);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = cartItem.quantity || 1;
        quantityInput.addEventListener("change", function() {
            // Sayı dəyişdikdə, məhsulu yeniləyək
            cartItem.quantity = parseInt(quantityInput.value, 10);
            localStorage.setItem("cart", JSON.stringify(cart));
        });
        cartItemDiv.appendChild(quantityInput);

        const removeCheckbox = document.createElement("input");
        removeCheckbox.type = "checkbox";
        removeCheckbox.addEventListener("change", function() {
            // Checkboxa click olduqda, məhsulu silək
            if (removeCheckbox.checked) {
                removeFromCart(i);
                cartItemDiv.remove();
            }
        });
        cartItemDiv.appendChild(removeCheckbox);

        cartSection.appendChild(cartItemDiv);
    }
}

// Səbətdən məhsulu silmək üçün funksiya
function removeFromCart(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// Səbeti göstərək
displayCart();
// LocalStorage-dan səbeti oxumaq
function getCart() {
    return JSON.parse(localStorage.getItem("cart")) || [];
}

// Səbəti göstərmək üçün funksiya
function displayCart() {
    const cart = getCart();
    const cartSection = document.querySelector(".cart");
    const headerTotal = document.querySelector(".header-total");
    const sideTotal = document.querySelector(".side-total");

    cartSection.innerHTML = "";

    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        const cartItem = cart[i];
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");

        const itemName = document.createElement("span");
        itemName.textContent = cartItem.name;
        cartItemDiv.appendChild(itemName);

        const quantityInput = document.createElement("input");
        quantityInput.type = "number";
        quantityInput.value = cartItem.quantity || 1;
        quantityInput.addEventListener("change", function() {
            cartItem.quantity = parseInt(quantityInput.value, 10);
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        });
        cartItemDiv.appendChild(quantityInput);

        const removeCheckbox = document.createElement("input");
        removeCheckbox.type = "checkbox";
        removeCheckbox.addEventListener("change", function() {
            if (removeCheckbox.checked) {
                removeFromCart(i);
                cartItemDiv.remove();
            }
            displayCart();
        });
        cartItemDiv.appendChild(removeCheckbox);

        total += cartItem.price * (cartItem.quantity || 1);

        cartSection.appendChild(cartItemDiv);
    }

    // Headerdə və sağ tərəfdə qiymətləri göstərmək
    headerTotal.textContent = total.toFixed(2) + " AZN";
    sideTotal.textContent = total.toFixed(2) + " AZN";
}

// Səbətdən məhsulu silmək üçün funksiya
function removeFromCart(index) {
    const cart = getCart();
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
    }
}

// "Səbəti boşalt" düyməsinə click olduqda səbəti təmizləmək
const clearCartButton = document.querySelector(".clear-cart");
clearCartButton.addEventListener("click", function() {
    const checkboxes = document.querySelectorAll(".cart-item input[type='checkbox']");
    checkboxes.forEach(function(checkbox) {
        if (checkbox.checked) {
            const index = Array.from(checkbox.parentNode.parentNode.children).indexOf(checkbox.parentNode);
            removeFromCart(index);
            checkbox.parentNode.remove();
        }
    });
    displayCart();
});

// Səbeti göstərək
displayCart();