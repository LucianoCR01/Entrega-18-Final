import UserModel from "./models/user.model.js"


class UserRolModels {
    async changeRol(uid) {
        const findUser = await UserModel.findById({ _id: uid })
        if (findUser.isAdmin) {
            return findUser
        }
        if (findUser.isUser) {
            findUser.isUser = false
            findUser.premium = true
            await findUser.save()
            return findUser
        }
        if (findUser.premium) {
            findUser.premium = false
            findUser.isUser = true
            await findUser.save()
            return findUser
        }
    }
}
export default UserRolModels