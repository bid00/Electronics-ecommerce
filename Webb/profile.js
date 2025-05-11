// document.addEventListener("DOMContentLoaded", function () {
//     const accessToken=  localStorage.getItem("accessToken");
//    !accessToken || accessToken== "null"? window.location.href="./login.html":
//    (async function () {
//     try {
//         const response = await fetch("http://localhost:8000/api/user/profile",{
//         method:"GET",
//         headers:{"authorization":`bearer ${accessToken}`}
//     })
//     const data = await response.json();
//     console.log(data);
   
//     } catch (error) {
//         console.error("fail",error)
//     }
   

//    })();
   

// });
