document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.querySelector(".product-grid");
    const kitGrid = document.querySelector(".kit-grid");
    const Base_Url = "https://electronics-ecommerce-production.up.railway.app"
    async function fetchingProducts(category) {
        try {
            const response = await fetch(`${Base_Url}/api/products${category ? `?category=${category}` : ""}`);
            const products = await response.json();

            if (!response.ok) {
                showToast(products.message || "Failed to fetch products", "danger");
                return [];
            }

            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            showToast("Error connecting to server", "danger");
            return [];
        }
    }

    (async function () {
        const products = await fetchingProducts("ic");
        if (!products.length) return;

        products.slice(0, 4).forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.picture}" alt="${product.name}" />
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${Number(product.price).toFixed(2)} EGP</p>
                <a href="product.html?id=${product.id}" class="view-button">View Product</a>
            `;
            productGrid.appendChild(productCard);
        });
    })();

    (async function () {
        const products = await fetchingProducts("boards");
        if (!products.length) return;

        products.slice(0, 8).forEach(product => {
            const kitCard = document.createElement("div");
            kitCard.classList.add("kit-card");
            kitCard.innerHTML = `
                <img src="${product.picture}" alt="${product.name}">
                <h3 class="kit-title">${product.name}</h3>
                <p class="kit-price">${Number(product.price).toFixed(2)} EGP</p>
                <a href="product.html?id=${product.id}" class="view-button">View Product</a>
            `;
            kitGrid.appendChild(kitCard);
        });
    })();
});
