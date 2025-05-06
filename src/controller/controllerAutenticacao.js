import login from "../services/serviceAutenticacao";

const controllerLogin = (req, res) => {
    login(req, res)
}

export default controllerLogin