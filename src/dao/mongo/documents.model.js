import UserModel from "./models/user.model.js"

class UpdateFile {
    async fileProfile(uid) {
        const changeIdem = await UserModel.findByIdAndUpdate(uid, { identificacion: true })
    }
}

export default UpdateFile