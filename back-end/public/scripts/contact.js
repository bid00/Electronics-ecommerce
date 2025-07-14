document.addEventListener("DOMContentLoaded", function () {
const Base_Url = "https://electronics-ecommerce-production.up.railway.app"
  // Function to handle form submission
  function handleSubmit(formSelector, endpoint) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(form);
      const jsonObject = {};

      formData.forEach((value, key) => {
        jsonObject[key] = value;
      });

      fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject), // Sending as JSON
      })
        .then(response => {
          if (!response.ok) {
            if (response.status === 400) {
              throw new Error("All fields are required.");
            } else {
              throw new Error(`Error: ${response.statusText}`);
            }
          }
          return response.json();
        })
        .then(data => {
          showToast("Submitted successfully!", "success");
          form.reset(); // Clear the form after submission
        })
        .catch(error => {
          showToast(error.message, "danger");
        });
    });
  }

  // Contact Form
  handleSubmit(".contact-form", `${Base_Url}/api/mail/contact"`);

  // Mail list subscribe form
  handleSubmit(".subscribe-form", `${Base_Url}/api/mail/subscribe`);
});
