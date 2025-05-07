import answers from "../responses";

async function getProfile (req, res) {
    const role = req.user.role

    return answers.success(res, { role });
}

export default getProfile