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
    console.log("req.params:", req.params.idSystem)
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
    console.log("req.params:", req.params.id)
    return res.status(200).json({ data })
}
module.exports = {
    createSystem,
    getSystem,
    putSystem,
    deleteSystem,
    getSystemById,
    putSystemId,
    deleteSystemId
}