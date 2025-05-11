document.addEventListener("DOMContentLoaded", function () {
    const menuItems = document.querySelectorAll(".account-menu-item");
    const sections = document.querySelectorAll(".account-section");
    const name = document.querySelector("#fullName");
    const username = document.querySelector("#userName");
    const email = document.querySelector("#email");
    const phone = document.querySelector("#phone");

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
        const response = await fetch("http://localhost:8000/api/user/profile",{
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
        const response = await fetch("http://localhost:8000/api/user/updateprofile",{
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


});
