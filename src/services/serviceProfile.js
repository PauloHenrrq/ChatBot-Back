import answers from "../responses.js";

async function getProfile (req, res) {
    const role = req.user.role

    return answers.success(res, { role });
}

export default getProfile