import RealTime from "../services/realTime.services.js";


const realtime = new RealTime()

export const getProductsRealTime = async (req, res) => {
    const arrayProd = await realtime.getProducts()
    return res.status(200).render("realTimeProducts", { arrayProd })
}