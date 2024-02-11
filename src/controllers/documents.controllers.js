import UpdateFileService from "../services/documents.services.js";


const updateFileController = new UpdateFileService()

export const sendDocuments = async (req, res) => {
    const uid = req.params.uid
    try {
        return res.status(200).json({
            status: "success",
            msg: "Documentos guardados",
            data: await updateFileController.updateFileService(uid)
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