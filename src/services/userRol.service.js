import UserRolModels from "../dao/mongo/useRol.models.js";

class UserRolService {
    constructor() {
        this.userRolService = new UserRolModels()
    }

    changeRol = (email) => {
        return this.userRolService.changeRol(email)
    }

    userGet = () => {
        return this.userRolService.userGet()
    }

    deleteUsers = () => {
        return this.userRolService.deleteUsers()
    }

    searchUser = (email) => {
        return this.userRolService.searchUser(email)
    }

    fetchDeleteUser = (email) => {
        return this.userRolService.fetchDeleteUser(email)
    }
}

export default UserRolService