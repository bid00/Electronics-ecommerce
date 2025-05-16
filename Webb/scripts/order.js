document.addEventListener("DOMContentLoaded", async () => {
    const form = document.querySelector(".shipping-form");
    const accessToken = localStorage.getItem("accessToken");

    if (!accessToken || accessToken === "null") {
        window.location.href = "./login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8000/api/user/profile", {
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

    // Submit handler
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            paymentMethod: "Cash",
            shippingAddress: [
                {
                    streetNum: document.getElementById("street").value,
                    apartment: document.getElementById("apartment").value,
                    city: document.getElementById("city").value,
                    zipCode: document.getElementById("zip").value,
                    country: document.getElementById("country").value,
                },
            ],
        };

        try {
            const response = await fetch("http://localhost:8000/api/order/checkout", {
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
