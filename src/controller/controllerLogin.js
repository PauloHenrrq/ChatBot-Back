import login from "../services/serviceLogin";

const controllerLogin = (req, res) => {
    login(req, res)
}

export default controllerLogin