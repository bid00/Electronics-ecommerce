paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: { value: '10.00' } 
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            alert('Transaction completed by ' + details.payer.name.given_name);
            console.log(details);
        });
    }
}).render('#paypal-button-container');
document.querySelector('.btn-confirm').addEventListener('click', function () {
    alert("Your order has been confirmed!");
});
document.querySelector('.btn-confirm').addEventListener('click', function () {
    // افتراض وجود خطأ
    const isError = true;

    if (isError) {
        window.location.href = "error.html";
    }
});
