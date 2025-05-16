document.addEventListener("DOMContentLoaded", function () {
    const token = localStorage.getItem("accessToken");
    if(token) window.location.href = "./profile.html";

    const loginForm = document.querySelector("#login-form");

    async function login(event) {
        event.preventDefault();
        const formData = new FormData(loginForm);
        const logindata = Object.fromEntries(formData.entries());

        try {
            const response = await fetch("http://localhost:8000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(logindata),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                localStorage.setItem("accessToken", result.accessToken);
                showToast("Login successful! Redirecting...", "success");
                setTimeout(() => window.location.href = "./profile.html", 2000);
            } else {
                showToast(result.message || "Login failed", "danger");
            }
        } catch (error) {
            console.error("Login failed", error);
            showToast("Login failed due to network error", "danger");
        }
    }

    loginForm.addEventListener("submit", login);
});
