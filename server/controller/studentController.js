const { Op } = require("sequelize");
const {Student} = require("../models")
class Controller {

    static async showAllStudent(req, res, next){
        try {
            const {filter, page} = req.query;
            const paramsQuery = {}

            if (filter){
              paramsQuery.where = {
                name: {
                  [Op.iLike]: `%${filter}%`
                }
              }
            }

            let limit = 10;
            let pageNumber = 1;

            if (page) {
              if (page.size) {
                limit = +page.size
                paramsQuery.limit = limit
              }

              if(page.number){
                pageNumber = +page.number
                paramsQuery.offset = limit * (pageNumber - 1)
              }
            }
            const {count, rows} = await Student.findAndCountAll(paramsQuery)
            res.status(200).json({
              page: pageNumber,
              data: rows,
              totalData: count,
              totalPages: Math.ceil(count/limit),
              dataPerPage: limit
            })
        } catch (error) {
            next(error)
        }
    }

    static async addNewStudent (req, res, next) {
        try {
          
          const student = await Student.create({
            NIM : req.body.NIM,
            name : req.body.name,
            major : req.body.major,
          })
          res.status(201).json(student)
        } catch (error) {
          next(error)
        }
      }
}
module.exports = Controller