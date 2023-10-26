const socket = io()



Swal.fire({
    title: 'Identificate!',
    text: 'Ingresa el Mail',
    icon: 'success',
    input: "text",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un mail para continuar!"
    },
    allowOutsideclick: false
}).then(result => {
    user = result.value
});

chatBox.addEventListener("Keyup", evt => {
    if (evt.key === "Enter") {
        if (chatBox.value.trim().length > 0) {
            socket.emit("message", { user: user, message: chatBox.value })
            chatBox.value = ""
        }
    }

})