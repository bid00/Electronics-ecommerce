document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.querySelector("#signup-form")
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
            })
            const result = await response.json();
            console.log(result)
            if (response.ok) {
                // showPopover("signup successful! Redirecting...", true);
                setTimeout(() => window.location.href = "./login.html", 2000);
            }
        } catch (error) {
            console.error("signup failed",error)
        }
    };
    signupForm.addEventListener("submit",signup);
})