document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector("#signup-form");

    async function signup(event){
        event.preventDefault();
        const formData = new FormData(signupForm);
        const signupdata = Object.fromEntries(formData.entries());

        try {
            const response= await fetch("http://localhost:8000/api/auth/signup",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(signupdata),
            });

            const result = await response.json();
            console.log(result);

            if (response.ok) {
                showToast("Signup successful! Redirecting...", "success");
                setTimeout(() => window.location.href = "./login.html", 2000);
            } else {
                showToast(result.message || "Signup failed", "danger");
            }
        } catch (error) {
            console.error("Signup failed", error);
            showToast("Signup failed due to network or server error", "danger");
        }
    };

    signupForm.addEventListener("submit", signup);
});
