import login from "../services/serviceLogin.js";

const controllerLogin = (req, res) => {
    login(req, res)
}

export default controllerLogin