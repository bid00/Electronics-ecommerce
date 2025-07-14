document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".account-menu-item");
    const sections = document.querySelectorAll(".account-section");
    const name = document.querySelector("#fullName");
    const username = document.querySelector("#userName");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");
    const Base_Url = "https://electronics-ecommerce-production.up.railway.app"

    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
    
            sections.forEach(section => {
                section.style.display = "none";
            });
    
            const sectionId = item.getAttribute("data-section") + "-content";
            document.getElementById(sectionId).style.display = "block";
        });
    });

    const accessToken=  localStorage.getItem("accessToken");
   !accessToken || accessToken== "null"? window.location.href="./login.html":
   (async function () {
    try {
        const response = await fetch(`${Base_Url}/api/user/profile`,{
        method:"GET",
        headers:{"authorization":`bearer ${accessToken}`}
    })
    const data = await response.json();
    console.log(data);
    username.innerText=`${data.uName}`;
    name.value=`${data.name}`;
    email.value=`${data.email}`;
    phone.value=`${data.phone}`;

   
    } catch (error) {
        console.error("fail",error)
    }
   

   })();

    const updateForm = document.querySelector("#account-details-form");
   async function update(event) 
   {
    event.preventDefault();
    const form = new FormData(updateForm);
    const formData = Object.fromEntries(form.entries());
   
    try {
        const response = await fetch(`${Base_Url}/api/user/updateprofile`,{
        method:"PATCH",
        headers:{"Content-Type":"application/json","authorization":`bearer ${accessToken}`},
        body:JSON.stringify(formData)
    })
    response.ok?window.location.href="./profile.html":"";
    } catch (error) {
        console.error(error);
        
    }
   };
    updateForm.addEventListener("submit",update)



    const ordersSection = document.getElementById("orders-content");

    // This function can be called on tab click or page load
    async function loadUserOrders() {
        try {
            const res = await fetch(`${Base_Url}/api/order/`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const data = await res.json();

            if (!res.ok || !data.orders || !data.orders.length) {
                ordersSection.innerHTML += `<p>You have no orders yet.</p>`;
                return;
            }

            const ordersList = document.querySelector("#ordersList");
            ordersList.classList.add("orders-list");
            ordersList.innerHTML=''

            data.orders.forEach(order => {
                const shipping = order.shippingAddress[0]; // assuming one address

                const orderElement = document.createElement("div");
                orderElement.classList.add("order-item");
                orderElement.innerHTML = `
                    <h3>Order #${order.orderNumber}</h3>
                    <p><strong>Status:</strong> ${order.status}</p>
                    <p><strong>Total:</strong> ${order.totalAmount} EGP</p>
                    <p><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                    <p><strong>Shipping:</strong> ${shipping?.streetNum}, ${shipping?.city}, ${shipping?.country}</p>
                    <hr>
                `;
                ordersList.appendChild(orderElement);
            });

            ordersSection.appendChild(ordersList);
        } catch (error) {
            console.error("Error fetching orders:", error);
            ordersSection.innerHTML += `<p class="error">Error loading orders.</p>`;
        }
    }

    // Example: load when section becomes visible (you can also call directly)
    if (ordersSection.style.display !== "none") {
        loadUserOrders();
    }

    // If using tabs, you can call this function on tab click
    window.loadUserOrders = loadUserOrders; // make it callable from other scripts





    const addressesSection = document.getElementById("addresses-content");

    async function loadUserAddresses() {
        try {
            const res = await fetch(`${Base_Url}/api/user/addresses`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            const data = await res.json();

            if (!res.ok || !data.addresses || !data.addresses.length) {
                addressesSection.innerHTML += `<p>No saved addresses found.</p>`;
                return;
            }

            const list = document.querySelector("#addresses-list");
            list.innerHTML="";

            data.addresses.forEach((addr, index) => {
                const div = document.createElement("div");
                div.className = "address-item";
                div.innerHTML = `
                    <h3>Address ${index + 1}</h3>
                    <p><strong>Street:</strong> ${addr.streetNum}</p>
                    <p><strong>Apartment:</strong> ${addr.apartment}</p>
                    <p><strong>City:</strong> ${addr.city}</p>
                    <p><strong>ZIP:</strong> ${addr.zipCode}</p>
                    <p><strong>Country:</strong> ${addr.country}</p>
                    <hr>
                `;
                list.appendChild(div);
            });

            addressesSection.appendChild(list);
        } catch (err) {
            console.error("Failed to load addresses:", err);
            addressesSection.innerHTML += `<p class="error">Failed to load addresses</p>`;
        }
    }

   
    if (addressesSection.style.display !== "none") {
        loadUserAddresses();
    }

   
    window.loadUserAddresses = loadUserAddresses;

    function logout() {
    localStorage.removeItem("accessToken");
    window.location.href = "./login.html"; 
        
    }

    window.logout = logout;



});
