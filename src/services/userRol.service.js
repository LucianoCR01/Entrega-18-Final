import UserRolModels from "../dao/mongo/useRol.models.js";
import { Server } from "socket.io";

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

    loginUser = async (email) => {
        const date = new Date()
        const result = await this.userRolService.loginUser(email, date)
        if (!result) {
            const createCartUser = await this.userRolService.createCartUseRol(email)
            return createCartUser
        }
        return result
    }
}

export default UserRolService