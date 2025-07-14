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
    showToast("Order has been Confirmed")
});
document.querySelector('.btn-confirm').addEventListener('click', function () {
    const isError = true;

    if (isError) {
        window.location.href = "./orderconfirm.html";
    }
});
