import { script } from "../modals/script.js"

const create = (req, res) => {
    const {question} = req.body;
    console.log(question);
}

export {create}