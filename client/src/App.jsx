import Home from "./pages/home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StudentPage from "./pages/student";
import AddBook from "./pages/addBook";
import AddStudent from "./pages/addStudent";
import BorrowBooks from "./pages/borrowBooks";
import Histories from "./pages/historiesBorrow";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/students",
      element: <StudentPage />
    },
    {
      path: "/add/book",
      element: <AddBook />
    },
    {
      path: "/add/student",
      element: <AddStudent />
    },
    {
      path: "/borrow/books",
      element: <BorrowBooks />
    },
    {
      path: "/borrows",
      element: <Histories />
    },
  ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
