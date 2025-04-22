let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = null;

function addProduct() {
    const name = document.getElementById("name").value;
    const category = document.getElementById("category").value;
    const price = document.getElementById("price").value;
    const description = document.getElementById("description").value;
    const imageInput = document.getElementById("image");

    if (imageInput.files.length === 0 && editIndex === null) {
        alert("Please upload an image");
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const image = e.target.result;

        const product = {
            name,
            category,
            price,
            description,
            image: editIndex !== null ? products[editIndex].image : image
        };

        if (editIndex !== null) {
            products[editIndex] = product;
            editIndex = null;
        } else {
            products.push(product);
        }

        localStorage.setItem("products", JSON.stringify(products));
        displayProducts();
        clearForm();
    };

    if (imageInput.files.length > 0) {
        reader.readAsDataURL(imageInput.files[0]);
    } else {
        // استدعاء صورة موجودة إذا لم يتم تحميل صورة جديدة
        reader.onload({ target: { result: products[editIndex].image } });
    }
}

function displayProducts() {
    const list = document.getElementById("addproductList");
    list.innerHTML = "";

    products.forEach((product, index) => {
        const card = document.createElement("div");
        card.className = "addproduct-card";

        card.innerHTML = `
            <img src="${product.image}" />
            <h3>Name: ${product.name}</h3>
            <p><strong>Category:</strong> ${product.category}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> ${product.description}</p>
            <button class="update" onclick="editProduct(${index})">Update</button>
            <button class="delete" onclick="deleteProduct(${index})">Delete</button>
        `;

        list.appendChild(card);
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts();
}

function editProduct(index) {
    const product = products[index];
    document.getElementById("name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("price").value = product.price;
    document.getElementById("description").value = product.description;
    editIndex = index;
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("category").value = "";
    document.getElementById("price").value = "";
    document.getElementById("description").value = "";
    document.getElementById("image").value = "";
}

window.onload = displayProducts;
