document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.querySelector("#login-form")
    async function login(event){
        event.preventDefault();
        const formData = new FormData(loginForm);
        const logindata = Object.fromEntries(formData.entries());
        try {
            const response= await fetch("http://localhost:8000/api/auth/login",{
                method: "POST",
                headers: {
                        "Content-Type": "application/json",
                        },
                body: JSON.stringify(logindata),
            })
            const result = await response.json();
            console.log(result  )
            if (response.ok) {
                localStorage.setItem("accessToken",result.accessToken);
                // showPopover("Login successful! Redirecting...", true);
                setTimeout(() => window.location.href = "./profile.html", 2000);
            }
        } catch (error) {
            console.error("Login failed",error)
        }
    };
    loginForm.addEventListener("submit",login);
})
