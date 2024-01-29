import UserRolService from "../services/userRol.service.js";

const userRolController = new UserRolService()

export const changeRol = async (req, res) => {
    const uid = req.params.uid
    try {
        return res.status(200).json({
            status: "success",
            msg: "Rol cambiado",
            data: await userRolController.changeRol(uid)
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