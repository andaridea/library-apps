import Sidebar from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { localRequest } from "../utils/axios";

export default function BorrowBooks() {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [input, setInput] = useState({
    studentId: "",
    selectedBooks: [],
    borrowDate: "",
    returnDate: "",
  });

  const fetchDataStudents = async () => {
    try {
      const response = await localRequest({
        url: "/students",
        method: "GET",
      });
      setStudents(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataBooks = async () => {
    try {
      const response = await localRequest({
        url: "/books",
        method: "GET",
      });
      setBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataStudents();
    fetchDataBooks();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const postData = {
        studentId: input.studentId,
        selectedBooks: input.selectedBooks,
        borrowDate: input.borrowDate,
        returnDate: input.returnDate,
      };

      await localRequest({
        url: "/borrows",
        method: "POST",
        data: postData,
      });
      console.log(postData);
      navigate("/borrows");
    } catch (error) {
      console.error("Error borrowing books:", error);
    }
  };

  const handleBookSelection = (bookId) => {
    const isSelected = input.selectedBooks.includes(bookId);
    if (isSelected) {
      setInput({
        ...input,
        selectedBooks: input.selectedBooks.filter((id) => id !== bookId),
      });
    } else {
      setInput({
        ...input,
        selectedBooks: [...input.selectedBooks, bookId],
      });
    }
  };

  const handleRemoveBook = (bookId) => {
    setInput({
      ...input,
      selectedBooks: input.selectedBooks.filter((id) => id !== bookId),
    });
  };

  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-2xl font-bold mb-4">
            Tambah Daftar Pinjaman Buku
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mt-8 space-y-6">
              <div>
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Nama Mahasiswa
                </label>
                <select
                  name="studentId"
                  value={input.studentId}
                  onChange={(e) =>
                    setInput({ ...input, studentId: e.target.value })
                  }
                  className="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Pilih Mahasiswa</option>
                  {students.map((student) => (
                    <option key={student.id} value={student.id}>
                      {student.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Tanggal Pinjam
                </label>
                <input
                  type="date"
                  value={input.borrowDate}
                  onChange={(e) =>
                    setInput({ ...input, borrowDate: e.target.value })
                  }
                  name="borrowDate"
                  className="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Tanggal Kembali
                </label>
                <input
                  type="date"
                  value={input.returnDate}
                  onChange={(e) =>
                    setInput({ ...input, returnDate: e.target.value })
                  }
                  name="returnDate"
                  className="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                />
              </div>

              <div className="mb-4">
                <label className="text-sm text-gray-700 block mb-1 font-medium">
                  Buku-buku yang dipinjam:
                </label>
                <div className="flex flex-wrap">
                  {books.map((book) => (
                    <div key={book.id} className="m-2 w-1/5">
                      <label className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={input.selectedBooks.includes(book.id)}
                          onChange={() => handleBookSelection(book.id)}
                          className="form-checkbox h-5 w-5 text-blue-500 rounded"
                        />
                        <span className="ml-2">{book.title}</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-x-4 mt-8">
                <button
                  type="submit"
                  className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
                >
                  Save
                </button>
                <Link
                  to="/"
                  className="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
