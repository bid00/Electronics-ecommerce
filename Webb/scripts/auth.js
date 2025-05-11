
document.addEventListener("DOMContentLoaded", function () {
//    const uName = document.querySelector("#username");
//    const password = document.querySelector("#password");
//    const email = document.querySelector("#email");
//    const name = document.querySelector("#name");
//    const phone = document.querySelector("#phone");
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
                window.href = 'index.html' 
            }
        } catch (error) {
            console.error("Login failed",error)
        }
    };
    loginForm.addEventListener("submit",login);
})