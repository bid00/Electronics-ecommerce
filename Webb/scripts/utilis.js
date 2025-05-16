function showToast(message, type = "primary") {
    const toastElement = document.getElementById("responseToast");
    const toastBody = document.getElementById("toastMessage");

    toastElement.className = `toast align-items-center text-bg-${type} border-0`;
    toastBody.textContent = message;

    const bsToast = new bootstrap.Toast(toastElement, { delay: 3000 });
    bsToast.show();
}