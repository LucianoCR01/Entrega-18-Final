const formLogin = document.getElementById("form-login");
const inputLogin = document.getElementById("inputLogin")

formLogin.onsubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userMail", inputLogin.value)
    formLogin.submit();
};

