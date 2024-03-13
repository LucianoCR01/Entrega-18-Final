import UserRolService from "../services/userRol.service.js";

const userRolController = new UserRolService()

export const changeRol = async (req, res) => {
    const email = req.params.email
    try {
        return res.status(200).json({
            status: "success",
            msg: "Rol cambiado",
            data: await userRolController.changeRol(email)
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const getUser = async (req, res) => {
    const users = await userRolController.userGet()
    const filteredData = users.map(obj => {
        let role;
        if (obj.isAdmin) {
            role = "isadmin";
        } else if (obj.isUser) {
            role = "isuser";
        } else if (obj.premium) {
            role = "premium";
        } else {
            role = "unknown"; // Define un valor por defecto para roles no coincidentes
        }

        return {
            last_name: obj.first_name,
            email: obj.email,
            role, // Asigna el valor de `role` al nuevo campo
        };
    })
    try {
        return res.status(200).render("showUser", { filteredData })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const deleteUsers = async (req, res) => {
    const usersDeleted = await userRolController.deleteUsers()
    try {
        return res.status(200).json({
            status: "success",
            msg: "Rol cambiado",
            data: usersDeleted
        })
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            status: "error",
            msg: "something went wrong :(",
            data: {},
        });
    }
}

export const searchUser = async (req, res) => {
    const email = req.params.email
    const user = await userRolController.searchUser(email)
    const userFormat = {
        last_name: user.last_name,
        email: user.email,
        isUser: user.isUser,
        isAdmin: user.isAdmin,
        premium: user.premium
    }
    return res.status(200).render("userSearch", userFormat)
}

export const fetchDeleteUser = async (req, res) => {
    const email = req.params.email
    const user = await userRolController.fetchDeleteUser(email)
    return res.status(200).json({ data: user })
}