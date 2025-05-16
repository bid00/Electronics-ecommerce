const productsGrid = document.getElementById("products-grid");

async function fetchingProducts(category) {
    try {
        const response = await fetch(`http://localhost:8000/api/products${category ? `?category=${category}` : ""}`);
        const products = await response.json();

        if (!response.ok) {
            showToast(products.message || "Failed to load products", "danger");
            return;
        }

        productsGrid.innerHTML = "";

        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");
            productCard.innerHTML = `
                <a href="product.html?id=${product.id}">
                    <img src="${product.picture}" alt="${product.name}">
                    <h3>${product.name}</h3>
                    <p class="price">EGP ${Number(product.price).toFixed(2)}</p>
                </a>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
            `;
            productsGrid.appendChild(productCard);
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        showToast("Error fetching products", "danger");
    }
}

async function addToCart(productId) {
    try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch("http://localhost:8000/api/cart/add", {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ productId, quantity: "1" })
        });

        const data = await response.json();

        if (response.status === 401) {
            window.location.href = "./auth.html";
            return;
        }

        if (!response.ok) {
            showToast(data.message || "Failed to add to cart", "danger");
            return;
        }

        showToast(data.message || "Item added to cart!", "success");

    } catch (error) {
        console.error("Add to cart error:", error);
        showToast("Network error while adding to cart", "danger");
    }
}
