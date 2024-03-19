const formLogin = document.getElementById("form-login");
const inputLogin = document.getElementById("inputLogin")

formLogin.onsubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userMail", inputLogin.value)
    formLogin.submit();
};

$(document).ready(function () {
    $("#form-login").on("submit", function (event) {
        event.preventDefault(); // Evite el envío predeterminado del formulario

        // Recopile los datos del formulario
        let datosFormulario = $("#inputLogin").val()

        // Envíe los datos al backend usando AJAX
        $.ajax({
            url: 'http://localhost:8080/cartsMongo/' + datosFormulario, // Reemplace con la URL real de su endpoint backend
            type: "POST", // Establezca el método HTTP en POST
            success: function (respuesta) {
                // Maneje el envío exitoso (por ejemplo, muestre un mensaje de éxito)
                localStorage.setItem("cart-id", respuesta._id)
            },
            error: function (error) {
                // Maneje los errores (por ejemplo, muestre un mensaje de error)
                console.error("Error al enviar datos:", error);
            }
        });
    });
});

