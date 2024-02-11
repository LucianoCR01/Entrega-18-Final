import UpdateFile from "../dao/mongo/documents.model.js";

class UpdateFileService {
    constructor() {
        this.updateFileService = new UpdateFile
    }

    sendDoc = (uid) => {
        return this.updateFileService.fileProfile(uid)
    }

}

export default UpdateFileService