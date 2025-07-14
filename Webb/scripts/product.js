document.addEventListener("DOMContentLoaded", async () => {
  const productId = new URLSearchParams(window.location.search).get("id");
  const Base_Url = "https://electronics-ecommerce-production.up.railway.app"
  const container = document.getElementById("product-container");
  container.innerHTML = '';

  if (!productId) {
    container.innerHTML = "<p>Product ID not found in URL.</p>";
    return;
  }

  try {
    const res = await fetch(`${Base_Url}/api/products/${productId}`);
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
        <div class="price">${Number(product.price).toFixed(2)} EGP</div>
        <div class="qty">
          Quantity: <input type="number" id="qty" min="1" value="1">
        </div>
        <a href="#" class="btn btn-primary" id="addToCart">Add to Cart</a>
        <div class="desc">
          <p><strong>Shipping:</strong> 2-3 Business Days</p>
          <p><strong>Pick up from:</strong> HNU <span>Elec</span>tronics</p>
        </div>
      </div>

      <div class="specifications">
        <h2>General Description</h2>
        <p>${product.description || ""}</p>

        <h2>Features</h2>
        <ul>${featuresList}</ul>

        <h2>Package Includes</h2>
        <ul>${packageList}</ul>
      </div>
    `;

    document.getElementById("addToCart").addEventListener("click", async (e) => {
      e.preventDefault();
      const quantity = parseInt(document.getElementById("qty").value);
      const token = localStorage.getItem("accessToken");

      if (!token) {
        showToast("Please login first.", "warning");
        setTimeout(() => window.location.href = "./login.html", 2000);
        return;
      }

      try {
        const res = await fetch(`${Base_Url}/api/cart/add`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify({ productId: product._id, quantity })
        });

        const data = await res.json();
        if (res.ok) {
          showToast("Product added to cart", "success");
        } else {
          showToast(data.message || "Error adding to cart.", "danger");
        }
      } catch (error) {
        console.error(error);
        showToast("Unexpected error occurred.", "danger");
      }
    });

  } catch (error) {
    container.innerHTML = "<p>Error loading product.</p>";
    console.error(error);
  }
});
