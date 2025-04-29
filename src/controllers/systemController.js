const System = require("../models/system")
const { createSystemService,  getSystemService, putSystemService, deleteSystemService, getSystemByIdService, putSystemIdService, deleteSystemIdService } = require("../services/systemService")

const createSystem = async (req, res) => {
    const data = await createSystemService(req.body)
    return res.status(200).json(data)
}
const getSystem = async (req, res) => {
    const data = await getSystemService(req.query)
    return res.status(200).json(data)
}
const getSystemById = async (req, res) => {
    const data = await getSystemByIdService(req.params.idSystem)
    return res.status(200).json(data)
}
const putSystem = async (req, res) => {
    const data = await putSystemService(req.body)
    return res.status(200).json(data)
}
const putSystemId = async (req, res) => {
    const systemId = req.params.id;
    const data = await putSystemIdService(systemId, req.body); // truyền id riêng
    return res.status(200).json(data);
}
const deleteSystem = async (req, res) => {
    const data = await deleteSystemService(req.body.id)
    return res.status(200).json({ data })
}
const deleteSystemId = async (req, res) => {
    const data = await deleteSystemIdService(req.params.id)
    return res.status(200).json({ data })
}
const uploadImageSystem = async (req, res) => {
    try {
        const systemId = req.params.id;
        const system = await System.findById(systemId);
        if (!system) return res.status(404).json({ message: "System not found" });

        system.image = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        await system.save();
        return res.status(200).json({ message: "Image uploaded successfully", system });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const getImageSystemById = async (req, res) => {
    try {
        const system = await System.findById(req.params.id);
        if (!system || !system.image || !system.image.data) {
            return res.status(404).json({ message: "Image not found" });
        }

        res.set('Content-Type', system.image.contentType);
        return res.send(system.image.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const uploadDocumentSystem = async (req, res) => {
    try {
        const systemId = req.params.id;
        const system = await System.findById(systemId);
        if (!system) return res.status(404).json({ message: "System not found" });

        system.document = {
            data: req.file.buffer,
            contentType: req.file.mimetype,
            fileName: req.file.originalname
        };

        await system.save();
        return res.status(200).json({ message: "Document uploaded successfully", system });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getDocumentSystemById = async (req, res) => {
    try {
        const system = await System.findById(req.params.id);
        if (!system || !system.document || !system.document.data) {
            return res.status(404).json({ message: "Document not found" });
        }

        res.set('Content-Type', system.document.contentType);
        res.set('Content-Disposition', `attachment; filename=${system.document.fileName}`);
        return res.send(system.document.data);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


module.exports = {
    createSystem,
    getSystem,
    putSystem,
    deleteSystem,
    getSystemById,
    putSystemId,
    deleteSystemId,
    uploadImageSystem,
    getImageSystemById,
    getDocumentSystemById,
    uploadDocumentSystem
}