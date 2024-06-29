function errorHandler (req, res, err, next) {
    if (err.name === "SequelizeValidationError" || err.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({message: err.errors[0].message})
    } else {
        console.log(err)
        return res.status(500).json({message: "Internal server error"})
    }
}
module.exports = errorHandler