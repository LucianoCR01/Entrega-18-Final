const socket = io()
let user
let chatBox = document.getElementById("chatBox")
Swal.fire({
    title: 'Identificate!',
    text: 'Ingresa el Mail',
    icon: 'success',
    input: "text",
    inputValidator: (value) => {
        return !value && "Necesitas escribir un mail para continuar!"
    },
    allowOutsideClick: false
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

    socket.on("messageLogs", data => {
        let log = document.getElementById("messageLogs")
        let messages = ""
        data.forEach(message => {
            messages = messages + `${message.user}dice: ${message.message}<br/>`
        });
        log.innerHTML = messages
    })
})