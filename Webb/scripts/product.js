const productsGrid = document.getElementById("products-grid");
    async function fetchingProducts(category) {
        try {
            const response = await fetch(`http://localhost:8000/api/products${category ? `?category=${category}` : ""}`);
            const products = await response.json();
            productsGrid.innerHTML =``

            products.forEach(product => {
                    const productCard = document.createElement("div");
                    productCard.classList.add("product-card");
                    productCard.innerHTML=`
                         <a href="">
                        <img src="${product.picture}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">EGP ${Number(product.price).toFixed(2)}</p>
                         </a>
                        <button class="add-to-cart" onclick="addToCart('${product.name}', ${product.price})">Add to Cart</button>
                    `
                    productsGrid.appendChild(productCard);
            });

        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };