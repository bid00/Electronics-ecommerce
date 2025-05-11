document.addEventListener("DOMContentLoaded", async () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  const container = document.getElementById("product-container");
  container.innerHTML='';

  if (!productId) {
    container.innerHTML = "<p>Product ID not found in URL.</p>";
    return;
  }

  try {
    const res = await fetch(`http://localhost:8000/api/products/${productId}`);
    if (!res.ok) throw new Error("Failed to fetch product data");

    const product = await res.json();

    const featuresList = product.features?.split(",").map(f => `<li>${f.trim()}</li>`).join("") || "";
    const packageList = product.package?.split(",").map(p => `<li>${p.trim()}</li>`).join("") || "";


    container.innerHTML = `
      <div class="image-section">
        <img src="${product.picture}" alt="${product.name}" />
      </div>

      <div class="info-section">
        <div class="productp-title">${product.name}</div>
        <div class="details">${product.description || "No description available."}</div>
        <div class="price">${product.price} EGP</div>
        <div class="qty">
          Quantity: <input type="number" id="qty" min="1" value="1">
        </div>
        <a href="#" class="btn" id="addToCart" onclick="addToCart(); event.preventDefault();">Add to Cart</a>
        <div class="desc">
          <p><strong>Shipping:</strong> 2-3 Business Days</p>
          <p><strong>Pick up from:</strong> HNU <span>Elec</span>tronics</p>
        </div>
      </div>

      <div class="specifications">
        <h2>General Description</h2>
        <p>${product.description}</p>

        <h2>Features</h2>
        <ul>${featuresList}</ul>

        <h2>Package Includes</h2>
        <ul>${packageList}</ul>
      </div>

    `;

    document.getElementById("addToCart").addEventListener("click", async () => {
      const quantity = parseInt(document.getElementById("qty").value);
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please login first.");
        window.location.href="./login.html";
        return;
      }

      const res = await fetch("http://localhost:8000/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ productId: product._id, quantity })
      });

      const data = await res.json();
      if (res.ok) {
        alert("Product added to cart");
      } else {
        alert(data.message || "Error adding to cart.");
      }
    });

  } catch (error) {
    container.innerHTML = "<p>Error loading product.</p>";
    console.error(error);
  }
});
