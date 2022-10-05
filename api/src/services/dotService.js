const { v4: uuid } = require("uuid");
const Dot = require("../database/dotDB");

const getAllDots = async () => {
    const allDots = await Dot.getAllDots();
    return allDots;
};

const getOneDot = async (id) => {
    return await Dot.getDotById(id);
};

const createNewDot = async (newDot) => {
    const dotToInsert = {
        ...newDot,
        createdAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
        updatedAt: new Date().toLocaleString("en-US", { timezone: "UTC" }),
    };

    const createdDot = await Dot.createNewDot(dotToInsert);
    return createdDot;
};

const updateOneDot = () => {
    return;
};

const deleteOneDot = () => {
    return;
};

module.exports = {
    getAllDots,
    getOneDot,
    createNewDot,
    updateOneDot,
    deleteOneDot,
};
