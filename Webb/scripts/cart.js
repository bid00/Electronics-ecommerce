document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("accessToken");

    (async function () {
         try {
            const response = await fetch("http://localhost:8000/api/cart/", {
                method: "GET",
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            if (response.status === 401) {
                const message = await response.json();
                // showPopover(message.message + " please login again!",false);
                setTimeout(()=>window.location.href="./auth.html",2000);
                return;
            }else if (response.status === 404) {
                document.getElementById("cart-items").innerHTML = "<p class='text-center text-gray-500 text-lg'>Your cart is empty.</p>";
                document.getElementById("total-price").textContent = "0 EGP";
                return;
            }

            const data = await response.json();
            renderCart(data.cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
        }
        
    })();
    function renderCart(cart) {
        const cartContainer = document.getElementById("cart-items");
            cartContainer.innerHTML = "";
            if (!cart || cart.items.length === 0) {
                cartContainer.innerHTML = "<p class='text-center text-gray-500 text-lg'>Your cart is empty.</p>";
                document.getElementById("total-price").textContent = "0 EGP";
                return;
            }
            cart.items.forEach(item => {
                const itemElement = document.createElement("div");
                itemElement.classList.add("cart-item");

                itemElement.innerHTML = `
                    <img src="${item.productId.picture}" alt="${item.productId.name}">
                    <div class="item-details">
                        <h3>${item.productId.name}</h3>
                        <p>${item.productId.price} EGP</p>
                        <input 
                             type="number" 
                             value="${item.quantity}" 
                             min="1" 
                            class="qty-input" 
                            id="qty"
                            data-product-id="${item.productId._id}"
                        >
                    </div>
                    <button class="remove-btn" data-product-id="${item.productId._id}">Remove</button>
                `;

                cartContainer.appendChild(itemElement);
            });

            document.getElementById("subtotal").textContent = `${cart.total} EGP`;
            const tax = cart.total * 0.005;
            const total = cart.total + tax + 15;
            document.getElementById("tax").textContent = `${tax} EGP`;
            document.getElementById("total").textContent = `${total} EGP`;
            attachQuantityListeners(); 

        }

        function attachQuantityListeners() {
            const inputs = document.querySelectorAll("#qty");
            inputs.forEach(input => {
                input.addEventListener("change", async (e) => {
                const productId = e.target.dataset.productId;
                const quantity = parseInt(e.target.value);
                if (!productId || isNaN(quantity)) return;
                await updateQuantity(productId, quantity);
                });
            });
        }   

         async function updateQuantity(productId,quantity) {
        const token = localStorage.getItem("accessToken");
        try {
            const response = await fetch("http://localhost:8000/api/cart/update-quantity", {
                method: "POST",
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId, quantity })
            });

            if (response.status === 401) {
                const message = await response.json();
                // showPopover(message.message + " please login again!",false);
                setTimeout(()=>window.location.href="./auth.html",2000);
                return;
            }

            const data = await response.json();
            renderCart(data.cart);
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    }

   document.querySelector("#cart-container").addEventListener("click", async function(e) {
    if (e.target.matches(".remove-btn")) {
        const productId = e.target.dataset.productId;
        const token = localStorage.getItem("accessToken");

        try {
            const response = await fetch("http://localhost:8000/api/cart/remove", {
                method: "POST",
                headers: {
                    "Authorization": `bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId })
            });

            if (response.status === 401) {
                const message = await response.json();
                setTimeout(() => window.location.href = "./auth.html", 2000);
                return;
            }

            const data = await response.json();
            renderCart(data.cart);
        } catch (error) {
            console.error("Error removing item:", error);
        }
    }
});

});
    
