const { Op } = require("sequelize");
const { Book, Book_Borrow, Borrow, Student } = require("../models");

class Controller {
  static async borrowBooks(req, res, next) {
    const { studentId, selectedBooks, borrowDate, returnDate } = req.body;

    try {
      const booksToBorrow = Array.isArray(selectedBooks)
        ? selectedBooks
        : [selectedBooks];

      const booksAvailable = await Book.findAll({
        where: {
          id: {
            [Op.in]: booksToBorrow,
          },
          quantity: { [Op.gt]: 0 },
        },
      });

      if (booksAvailable.length !== booksToBorrow.length) {
        return res.status(400).json({ error: "Stok buku tidak mencukupi." });
      }

      const transaction = await Borrow.create({
        StudentId: studentId,
        borrowDate: new Date(borrowDate),
        returnDate: new Date(returnDate),
      });
      console.log(borrowDate, "<<<");
      const bookBorrowRecords = booksToBorrow.map((bookId) => ({
        BorrowId: transaction.id,
        BookId: bookId,
      }));
      await Book_Borrow.bulkCreate(bookBorrowRecords);

      return res.status(201).json(transaction);
    } catch (error) {
      console.error("Error borrowing books:", error);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat membuat transaksi." });
    }
  }

  static async showHistoryBorrows(req, res, next) {
    try {
      const { filter, page } = req.query;
      const paramsQuery = {};

      if (filter) {
        paramsQuery.where = {
          name: {
            [Op.iLike]: `%${filter}%`,
          },
        };
      }

      let limit = 10;
      let pageNumber = 1;

      if (page) {
        if (page.size) {
          limit = +page.size;
        }

        if (page.number) {
          pageNumber = +page.number;
          paramsQuery.offset = limit * (pageNumber - 1);
        }
      }

      const histories = await Borrow.findAndCountAll({
        ...paramsQuery,
        include: [
          {
            model: Student,
            attributes: ['NIM', 'name'],
          },
          {
            model: Book,
            through: { model: Book_Borrow, attributes: [] },
            attributes: ['id', 'title'],
          }
        ],
        attributes: ['date_borrow', 'date_return'],
      });

      res.status(200).json({
        page: pageNumber,
        data: histories.rows,
        totalData: histories.count,
        totalPages: Math.ceil(histories.count / limit),
        dataPerPage: limit,
      });
    } catch (error) {
      console.error('Error fetching history:', error);
      next(error);
    }
  }
}

module.exports = Controller;
