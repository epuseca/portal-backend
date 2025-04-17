const { createTagService,  getTagService, putTagService, deleteTagService, getTagByIdService } = require("../services/tagService")

const createTag = async (req, res) => {
    const data = await createTagService(req.body)
    return res.status(200).json(data)
}
const getTag = async (req, res) => {
    const data = await getTagService(req.query)
    return res.status(200).json(data)
}
const getTagById = async (req, res) => {
    const data = await getTagByIdService(req.params.idTag)
    console.log("req.params:", req.params.idTag)
    return res.status(200).json(data)
}
const putTag = async (req, res) => {
    const data = await putTagService(req.body)
    return res.status(200).json(data)
}
const deleteTag = async (req, res) => {
    const data = await deleteTagService(req.body.id)
    return res.status(200).json({ data })
}

module.exports = {
    createTag,
    getTag,
    putTag,
    deleteTag,
    getTagById,
}