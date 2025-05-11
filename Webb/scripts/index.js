document.addEventListener("DOMContentLoaded", function () {
    const productGrid = document.querySelector(".product-grid");
    const kitGrid = document.querySelector(".kit-grid");

    async function fetchingProducts(category) {
        try {
            const response = await fetch(`http://localhost:8000/api/products${category ? `?category=${category}` : ""}`);
            const products = await response.json();
            return products;
        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    }

    (async function () {
        const products = await fetchingProducts("ic");
        products.slice(0,4).forEach(product => {
            const productCard = document.createElement("div");
            productCard.classList.add("product-card");

            productCard.innerHTML = `
                <img src="${product.picture}" alt="${product.name}" />
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${Number(product.price).toFixed(2)} EGP</p>
                <a href="shop.html" class="view-button">View Product</a>
            `;

            productGrid.appendChild(productCard);
        });
    })();

    (async function () {
        const products = await fetchingProducts("boards");
        products.slice(0,8).forEach(product=>{
            const kitCard = document.createElement("div");
            kitCard.classList.add("kit-card");
            kitCard.innerHTML=`
             <img src="${product.picture}" alt="${product.name}">
                    <h3 class="kit-title">${product.name}</h3>
                    <p class="kit-price">${Number(product.price).toFixed(2)} EGP</p>
                    <a href="shop.html" class="view-button">View Product</a>
               
            `;
            kitGrid.appendChild(kitCard);
        })
        
    })();
})
