const mp = new MercadoPago('TEST-1d6f91a3-c5e3-4696-a578-118edd99c9f7', {
    locale: "es-AR",
});

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {

        const orderdata = {
            price: document.querySelector(".price").innerText
        }

        const response = await fetch("http://localhost:8080/cartsMongo/finishBuy", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(orderdata),
        })
        const preference = await response.json()
        createCheckoutButton(preference.id)
    } catch (e) {
        alert("error")
    }
})

const createCheckoutButton = (preferenceID) => {
    const bricksBuilder = mp.bricks();

    const renderComponent = async () => {
        if (window.checkoutButton) window.checkoutButton.unmount()

        await bricksBuilder.create("wallet", "wallet_container", {
            initialization: {
                preferenceId: preferenceID,
            },
            customization: {
                texts: {
                    valueProp: 'smart_option',
                },
            },
        });
    }
    renderComponent()
}
