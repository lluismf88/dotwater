const dotService = require("../services/dotService");
const x = 1;

const getAllDots = async (req, res) => {
    const allDots = await dotService.getAllDots();
    console.log("allDots", allDots);
    res.status(200).send({ status: "true", data: allDots });
};

const getOneDot = async (req, res) => {
    const dot = await dotService.getOneDot(req.params.dotId);

    if (dot) {
        res.status(200).send({ status: "true", data: dot });
    } else {
        res.status(200).send({ status: "false", data: "Dot not found" });
    }
};

const createNewDot = async (req, res) => {
    const { body } = req;

    /*if (
        !body.name ||
        !body.mode ||
        !body.equipment ||
        !body.exercises ||
        !body.trainerTips
    ) {
        return;
    }*/

    console.log(body);

    const newDot = {
        coords: {
            type: "Point",
            coordinates: [body.lat, body.lng],
        },
    };

    const createdDot = await dotService.createNewDot(newDot);
    res.status(201).send({ status: "OK", data: createdDot });
};

const updateOneDot = (req, res) => {
    const updatedDot = dotService.updateOneDot(req.params.dotId);
    res.send(`Update dot ${req.params.dotId}`);
};

const deleteOneDot = (req, res) => {
    dotService.deleteOneDot(req.params.dotId);
    res.send(`Delete dot ${req.params.dotId}`);
};

module.exports = {
    getAllDots,
    getOneDot,
    createNewDot,
    updateOneDot,
    deleteOneDot,
};
