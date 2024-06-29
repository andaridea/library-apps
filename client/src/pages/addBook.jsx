import Sidebar from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { localRequest } from "../utils/axios";
export default function AddBook() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    title: "",
    author: "",
    publisher: "",
    publication_year: "",
    Book_ShelfId: "",
    quantity: "",
  });
  const [bookShelf, setBookShelf] = useState([]);

  const fetchData = async () => {
    try {
      const response = await localRequest({
        url: "/bookshelves",
        method: "GET",
      });
      setBookShelf(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await localRequest({
        url: "/books",
        method: "POST",
        data: input,
      });
      navigate("/books");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div class="flex h-screen bg-gray-100">
        <Sidebar />
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 class="text-2xl font-bold mb-4">Tambah Data Buku</h2>
          <form onSubmit={handleSubmit}>
            <div class="mt-8 space-y-6">
              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Judul Buku
                </label>
                <input
                  type="text"
                  value={input.title}
                  onChange={handleChangeInput}
                  name="title"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter judul buku ..."
                />
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Pengarang
                </label>
                <input
                  type="text"
                  value={input.author}
                  onChange={handleChangeInput}
                  name="author"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter pengarang ..."
                />
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Penerbit
                </label>
                <input
                  type="text"
                  value={input.publisher}
                  onChange={handleChangeInput}
                  name="publisher"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter penerbit ..."
                />
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Tahun Terbit
                </label>
                <input
                  type="text"
                  value={input.publication_year}
                  onChange={handleChangeInput}
                  name="publication_year"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter tahun terbit ..."
                />
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  No. Rak
                </label>
                <select
                  name="Book_ShelfId"
                  value={input.Book_ShelfId}
                  onChange={handleChangeInput}
                  class="bg-gray-100 border border-black text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="">Pilih No. Rak</option>
                  {bookShelf.map((shelf) => (
                    <option key={shelf.id} value={shelf.id}>
                      {shelf.name} - {shelf.description}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Stock
                </label>
                <input
                  type="text"
                  value={input.quantity}
                  onChange={handleChangeInput}
                  name="quantity"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter stock ..."
                />
              </div>
            </div>

            <div class="space-x-4 mt-8">
              <button
                type="submit"
                class="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 disabled:opacity-50"
              >
                Save
              </button>
              <Link to="/" class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
