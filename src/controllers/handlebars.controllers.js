import HandlebarServices from "../services/handlebars.service.js";

const handlebarServices = new HandlebarServices()

export const getProductsHandlebars = async (req, res) => {
    const arrayProd = await handlebarServices.getProducts()
    return res.status(200).render("home", { arrayProd })
}