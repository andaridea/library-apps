import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import { localRequest } from "../utils/axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [dataBooks, setDataBooks] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const handlePage = async (page) => {
    setCurrentPage(page);
  };

  const fetchData = async () => {
    try {
      const response = await localRequest({
        url: `/`,
        method: "GET",
        params: {
          filter: searchTitle,
          page: {
            number: currentPage,
            size: 10,
          },
        },
      });
      setDataBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTitle, currentPage]);
  return (
    <>
      <div class="flex h-screen bg-gray-100">
        <Sidebar />
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex justify-between mb-4">
            <h2 class="text-2xl font-bold mb-4">Daftar Buku</h2>
            <input
              type="text"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              placeholder="Search..."
              className="px-4 py-2 mr-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 w-1/2"
            />
            <Link
              className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md"
              to="/add/book"
            >
              Tambah Data
            </Link>
          </div>
          <table
            id="example"
            class="table-auto w-full border-collapse border border-slate-400"
          >
            <thead>
              <tr>
                <th class="px-4 py-2 border border-slate-300">No.</th>
                <th class="px-4 py-2 border border-slate-300">Judul</th>
                <th class="px-4 py-2 border border-slate-300">Pengarang</th>
                <th class="px-4 py-2 border border-slate-300">Penerbit</th>
                <th class="px-4 py-2 border border-slate-300">Tahun Terbit</th>
                <th class="px-4 py-2 border border-slate-300">No. Rak</th>
                <th class="px-4 py-2 border border-slate-300">Stock</th>
              </tr>
            </thead>
            <tbody>
              {dataBooks.map((el, index) => {
                return (
                  <tr>
                    <td class="border px-4 py-2">
                      {(currentPage - 1) * 10 + index + 1}
                    </td>
                    <td class="border px-4 py-2">{el.title}</td>
                    <td class="border px-4 py-2">{el.author}</td>
                    <td class="border px-4 py-2">{el.publisher}</td>
                    <td class="border px-4 py-2">{el.publication_year}</td>
                    <td class="border px-4 py-2">{el.Book_Shelf?.name}</td>
                    <td class="border px-4 py-2">{el.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <nav aria-label="Page navigation example" className="mt-3">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Previous"
                  onClick={() => handlePage(currentPage - 1)}
                >
                  <span aria-hidden="true">&laquo;</span>
                  <span className="visually-hidden">Previous</span>
                </a>
              </li>
              {(() => {
                const items = [];
                const maxPages = Math.min(
                  currentPage + 2,
                  dataBooks.totalPages
                );
                const minPages = Math.max(1, currentPage - 2);
                for (let page = minPages; page <= maxPages; page++) {
                  items.push(
                    <li
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                      key={page}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => handlePage(page)}
                      >
                        {page}
                      </a>
                    </li>
                  );
                }
                return items;
              })()}
              <li
                className={`page-item ${
                  currentPage === dataBooks.totalPages ? "disabled" : ""
                }`}
              >
                <a
                  className="page-link"
                  href="#"
                  aria-label="Next"
                  onClick={() => handlePage(currentPage + 1)}
                >
                  <span aria-hidden="true">&raquo;</span>
                  <span className="visually-hidden">Next</span>
                </a>
              </li>
            </ul>
          </nav>
          {/* End Pagination */}
        </div>
      </div>
    </>
  );
}
