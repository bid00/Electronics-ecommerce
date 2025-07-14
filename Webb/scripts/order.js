document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector(".shipping-form");
    const accessToken = localStorage.getItem("accessToken");
    const Base_Url = "https://electronics-ecommerce-production.up.railway.app"
    if (!accessToken || accessToken === "null") {
        window.location.href = "./login.html";
        return;
    }

    try {
        const response = await fetch(`${Base_Url}/api/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) throw new Error("Failed to fetch user data");

        const userData = await response.json();

        document.getElementById("fullname").value = userData.name || "";
        document.getElementById("email").value = userData.email || "";
        document.getElementById("phone").value = userData.phone || "";
    } catch (error) {
        console.error("Error loading user data:", error);
        showToast("Error loading user data", "danger");
    }

    let lastAddress = null;
    try {
        const res = await fetch(`${Base_Url}/api/user/addresses`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (res.ok) {
            addressData = await res.json();
            lastAddress = addressData.addresses?.[addressData.addresses.length - 1];
            var street= document.getElementById("street").value = lastAddress.streetNum || "";
            var apartment =document.getElementById("apartment").value = lastAddress.apartment || "";
            var city = document.getElementById("city").value = lastAddress.city || "";
            var zip = document.getElementById("zip").value = lastAddress.zipCode || "";
            var country = document.getElementById("country").value = lastAddress.country || "";
        } else {
            showToast("No saved address found", "warning");
        }
    } catch (error) {
        console.error("Error fetching last address:", error);
        showToast("Error loading address", "danger");
    }

    // Submit handler
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            paymentMethod: "Cash",
            shippingAddress: lastAddress ? [lastAddress] : [
                {
                    streetNum: document.getElementById("street").value,
                    apartment: document.getElementById("apartment").value,
                    city: document.getElementById("city").value,
                    zipCode: document.getElementById("zip").value,
                    country: document.getElementById("country").value,
                }
            ],
        };

        try {
            const response = await fetch(`${Base_Url}/api/order/checkout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (response.ok) {
                showToast("Order placed successfully!", "success");
                setTimeout(() => {
                    window.location.href = "pay.html";
                }, 1500);
            } else {
                showToast(result.message || "Failed to place order", "danger");
            }
        } catch (error) {
            console.error("Order error:", error);
            showToast("Unexpected error occurred", "danger");
        }
    });
});
