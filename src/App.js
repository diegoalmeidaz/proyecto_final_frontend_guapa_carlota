import React from "react";
import Catalogue from "./pages/Catalogue";
import "./styles/global.css";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import { ContextProvider } from "./context/Context";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { QueryClientProvider } from "react-query";
import { queryClient } from "./core/api_items";
import Login from "./pages/Login";
import { Provider } from "react-redux";
import store from "./core/store";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import Cart from "./pages/Cart";
import Success from "./components/Success";
import AdminDashboard from "./pages/AdminDashboard"
import AdminProductCreation from "./pages/AdminOps/AdminProductCreation"

const PrivateRoutes = ({ children }) => {
  const { isAuth } = useSelector((state) => state.auth);

  return isAuth ? <>{children}</> : <Navigate to="/login" replace />;
};

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth);

  return <>{!isAuth ? <Outlet /> : <Navigate to="/login" />}</>;
};

function App() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <ContextProvider>
              <Navbar />
              <div style={{ marginTop: "79px" }}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dresses" element={<Catalogue />} />

                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoutes>
                        <AdminDashboard />
                      </PrivateRoutes>
                    }
                  />

<Route
                    path="/create_product"
                    element={
                      <PrivateRoutes>
                        <AdminProductCreation />
                      </PrivateRoutes>
                    }
                  />

                  <Route
                    path="/cart"
                    element={
                      <PrivateRoutes>
                        <Cart />
                      </PrivateRoutes>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/success" element={<Success />} />
                </Routes>
              </div>
              <Footer />
            </ContextProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </React.StrictMode>
  );
}

export default App;
