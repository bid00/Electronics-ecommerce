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
                         <a href="product.html?id=${product.id}">
                        <img src="${product.picture}" alt="${product.name}">
                        <h3>${product.name}</h3>
                        <p class="price">EGP ${Number(product.price).toFixed(2)}</p>
                         </a>
                        <button class="add-to-cart" onclick="addToCart('${product.id}')">Add to Cart</button>
                    `
                    productsGrid.appendChild(productCard);
            });

        } catch (error) {
            console.error("Error fetching products:", error);
            return [];
        }
    };

    async function addToCart(productId) {
        try {
            const token = localStorage.getItem("accessToken");
            const response = await fetch("http://localhost:8000/api/cart/add", {
                method: "POST",
                headers: { 
                    "Authorization":`bearer ${token}`,
                    "Content-Type": "application/json" },
                body: JSON.stringify({ productId,"quantity":"1" })
            })
            if (response.status===401) {
                    window.location.href="./auth.html";
                }
            response.ok?alert("item added to cart"):alert(response.message);
            
            

            
        } catch (error) {
            console.error(error);
        }
    }