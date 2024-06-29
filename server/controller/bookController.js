const { Op } = require("sequelize");
const { Book, Book_Shelf } = require("../models");

class Controller {
  static async showAllBooks(req, res, next) {
    try {
      const { filter, page } = req.query;
      const paramsQuery = {};

      if (filter) {
        paramsQuery.where = {
          title: {
            [Op.iLike]: `%${filter}%`,
          },
        };
      }

      let limit = 10;
      let pageNumber = 1;

      if (page) {
        if (page.size) {
          limit = +page.size;
          paramsQuery.limit = limit;
        }

        if (page.number) {
          pageNumber = +page.number;
          paramsQuery.offset = limit * (pageNumber - 1);
        }
      }

      const { count, rows } = await Book.findAndCountAll({
        ...paramsQuery,
        include: [{ model: Book_Shelf }],
      });

      res.status(200).json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPages: Math.ceil(count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      next(error);
    }
  }

  static async showAllBookShelves(req, res, next) {
    try {
      const shelfs = await Book_Shelf.findAll();
      res.status(200).json(shelfs);
    } catch (error) {
      next(error);
    }
  }

  static async addNewBook(req, res, next) {
    try {
      const book = await Book.create({
        title: req.body.title,
        author: req.body.author,
        publisher: req.body.publisher,
        publication_year: req.body.publication_year,
        Book_ShelfId: req.body.Book_ShelfId,
        quantity: req.body.quantity,
      });
      res.status(201).json(book);
    } catch (error) {
      next(error);
    }
  }
}
module.exports = Controller;
