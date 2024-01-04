export const loggerTestController = async (req, res) => {
    req.logger.fatal("fatal")
    req.logger.error("error")
    req.logger.warning("Warning")
    req.logger.info("info")
    req.logger.http("http")
    req.logger.debug("debug")
} 