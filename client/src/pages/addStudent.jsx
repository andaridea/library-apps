import Sidebar from "../components/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { localRequest } from "../utils/axios";
export default function AddStudent() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    NIM: "",
    name: "",
    major: ""
  });

  const handleChangeInput = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await localRequest({
        url: "/students",
        method: "POST",
        data: input,
      });
      navigate("/students");
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
                  NIM (Nomor Induk Mahasiswa)
                </label>
                <input
                  type="text"
                  value={input.NIM}
                  onChange={handleChangeInput}
                  name="NIM"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter nomor induk mahasiswa ..."
                />
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Nama Mahasiswa
                </label>
                <input
                  type="text"
                  value={input.name}
                  onChange={handleChangeInput}
                  name="name"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter nama ..."
                />
              </div>

              <div>
                <label class="text-sm text-gray-700 block mb-1 font-medium">
                  Jurusan
                </label>
                <input
                  type="text"
                  value={input.major}
                  onChange={handleChangeInput}
                  name="major"
                  class="bg-gray-100 border border-black rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-1/2"
                  placeholder="Enter jurusan ..."
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
              <Link to="/students" class="py-2 px-4 bg-white border border-gray-200 text-gray-600 rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
