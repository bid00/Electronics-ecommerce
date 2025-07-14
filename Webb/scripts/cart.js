document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("accessToken");
    const Base_Url = "https://electronics-ecommerce-production.up.railway.app"

    // Redirect if no token
    if (!token || token === "null") {
        showToast("Please login", "danger");
        setTimeout(() => window.location.href = "./login.html", 2000);

        return;
    }

    // Fetch and render cart
    async function fetchCart() {
        try {
            const response = await fetch(`${Base_Url}/api/cart/`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });

            const data = await response.json();

            if (response.status === 401) {
                showToast(data.message + " - Please login again", "danger");
                setTimeout(() => window.location.href = "./login.html", 2000);
                return;
            }

            if (!data.cart || data.cart.items.length === 0) {
                document.getElementById("cart-items").innerHTML = "<p class='text-center text-gray-500 text-lg'>Your cart is empty.</p>";
                showToast("cart is empty", "yellow");
                var checkoutBtn = document.getElementById("checkout-btn");
                checkoutBtn.disabled = true;
                return;
            }
            
            renderCart(data.cart);
        } catch (error) {
            console.error("Error fetching cart:", error);
            showToast("Something went wrong while fetching the cart", "danger");
        }
    }

    // Render Cart Function
    function renderCart(cart) {
        const cartContainer = document.getElementById("cart-items");
        cartContainer.innerHTML = "";

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
        document.getElementById("tax").textContent = `${tax.toFixed(2)} EGP`;
        document.getElementById("total").textContent = `${total.toFixed(2)} EGP`;

        attachQuantityListeners();
    }

    // Quantity Change Listener
    function attachQuantityListeners() {
        const inputs = document.querySelectorAll(".qty-input");
        inputs.forEach(input => {
            input.addEventListener("change", async (e) => {
                const productId = e.target.dataset.productId;
                const quantity = parseInt(e.target.value);
                if (!productId || isNaN(quantity)) return;
                await updateQuantity(productId, quantity);
            });
        });
    }

    // Update Quantity
    async function updateQuantity(productId, quantity) {
        try {
            const response = await fetch(`${Base_Url}/api/cart/update-quantity`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ productId, quantity })
            });

            const data = await response.json();

            if (response.status === 401) {
                showToast(data.message + " Please login again", "danger");
                setTimeout(() => window.location.href = "./auth.html", 2000);
                return;
            }
            showToast("quantity updated", "success");
            renderCart(data.cart);
        } catch (error) {
            console.error("Error updating quantity:", error);
            showToast("Error updating quantity", "danger");
        }
    }

    // Remove Item
    document.querySelector("#cart-container").addEventListener("click", async function (e) {
        if (e.target.matches(".remove-btn")) {
            const productId = e.target.dataset.productId;

            try {
                const response = await fetch(`${Base_Url}/api/cart/remove`, {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ productId })
                });

                const data = await response.json();

                if (response.status === 401) {
                    showToast(data.message + " Please login again", "danger");
                    setTimeout(() => window.location.href = "./auth.html", 2000);
                    return;
                }
                showToast("Item removed","success"); 
                renderCart(data.cart);
            } catch (error) {
                console.error("Error removing item:", error);
                showToast("Error removing item", "danger");
            }
        }
    });

    
    fetchCart();
});

