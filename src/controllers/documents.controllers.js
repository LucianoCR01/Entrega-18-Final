import UpdateFileService from "../services/documents.services.js";
import { getArrFieldname } from "../utils.js";

const updateFileController = new UpdateFileService()

export const sendDocuments = async (req, res) => {
    const uid = req.params.uid
    const data = getArrFieldname()
    try {
        return res.status(200).json({
            status: "success",
            msg: "Documentos guardados",
            data: await updateFileController.sendDoc(uid, data)
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