import createProductsMoking from "../services/mokingProducts.services.js"

const mokingProducts = new createProductsMoking

export const getMoking = async (req, res) => {
    res.json(mokingProducts.getMoking())
}