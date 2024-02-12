import UserModel from "./models/user.model.js"

class UpdateFile {
    async fileProfile(uid, data) {
        function verificarValor(array, valor) {
            return array.includes(valor); // Devuelve true si el valor está presente en el array, de lo contrario, devuelve false
        }
        const objData = {
            identificacion: verificarValor(data, "identificacion"),
            domicilio: verificarValor(data, "domicilio"),
            cuenta: verificarValor(data, "cuenta")
        }
        const changeIdem = await UserModel.findByIdAndUpdate(uid, { objData })
        return changeIdem
    }
}

export default UpdateFile