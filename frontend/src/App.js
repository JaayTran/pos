import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "antd/dist/antd.min.css";
import "./App.css";
import Pos from "./pages/pos/Pos";
import Tables from "./pages/tables/Tables";
import Products from "./pages/products/Products";
import Login from "./pages/login/Login";
import Bills from "./pages/bills/Bills";
import Users from "./pages/users/Users";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouter>
                <Home />
              </ProtectedRouter>
            }
          />
          <Route
            path="/pos"
            element={
              <ProtectedRouter>
                <Pos />
              </ProtectedRouter>
            }
          />
          <Route
            path="/products"
            element={
              <ProtectedRouter>
                <ProtectedAdminRouter>
                  <Products />
                </ProtectedAdminRouter>
              </ProtectedRouter>
            }
          />

          <Route
            path="/bills"
            element={
              <ProtectedRouter>
                <Bills />
              </ProtectedRouter>
            }
          />
          <Route
            path="/tables"
            element={
              <ProtectedRouter>
                <ProtectedAdminRouter>
                  <Tables />
                </ProtectedAdminRouter>
              </ProtectedRouter>
            }
          />
          <Route
            path="/users"
            element={
              <ProtectedRouter>
                <ProtectedAdminRouter>
                  <Users />
                </ProtectedAdminRouter>
              </ProtectedRouter>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

export function ProtectedRouter({ children }) {
  if (localStorage.getItem("auth")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export function ProtectedAdminRouter({ children }) {
  if (JSON.parse(localStorage.getItem("auth")).isAdmin) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
