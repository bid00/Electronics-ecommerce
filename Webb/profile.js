// من أجل التفاعل مع الـ localStorage وتحميل بيانات المستخدم عند فتح الصفحة
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("user"));
    
    if (user) {
        // ملء المدخلات بالقيم المخزنة في localStorage
        document.getElementById("userName").textContent = user.name;
        document.getElementById("fullName").value = user.name;
        document.getElementById("email").value = user.email;
        document.getElementById("password").value = user.password;
    }
    
    // تفعيل التنقل بين الأقسام
    const menuItems = document.querySelectorAll(".account-menu-item");
    const sections = document.querySelectorAll(".account-section");
    
    menuItems.forEach(item => {
        item.addEventListener("click", () => {
            // إزالة فئة "active" من جميع العناصر
            menuItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
    
            // إخفاء جميع الأقسام
            sections.forEach(section => {
                section.style.display = "none";
            });
    
            // إظهار القسم الذي تم اختياره
            const sectionId = item.getAttribute("data-section") + "-content";
            document.getElementById(sectionId).style.display = "block";
        });
    });

    // دالة تسجيل الخروج
    document.querySelector(".account-menu-item[onclick='logout()']").addEventListener("click", function() {
        localStorage.removeItem("user");
        location.reload(); // إعادة تحميل الصفحة
    });

    // حفظ التعديلات عند إرسال النموذج
    document.getElementById("account-details-form").addEventListener("submit", function (e) {
        e.preventDefault(); // منع إعادة تحميل الصفحة عند الإرسال
        
        const updatedUser = {
            name: document.getElementById("fullName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        
        // حفظ البيانات المعدلة في localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        alert("تم حفظ التعديلات بنجاح!");
    });
});
