import UserRolModels from "../dao/mongo/useRol.models.js";

class UserRolService {
    constructor() {
        this.userRolService = new UserRolModels()
    }

    changeRol = (uid) => {
        return this.userRolService.changeRol(uid)
    }
}

export default UserRolService