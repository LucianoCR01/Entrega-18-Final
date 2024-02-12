import UpdateFile from "../dao/mongo/documents.model.js";

class UpdateFileService {
    constructor() {
        this.updateFileService = new UpdateFile
    }

    sendDoc = (uid, data) => {
        return this.updateFileService.fileProfile(uid, data)
    }

}

export default UpdateFileService