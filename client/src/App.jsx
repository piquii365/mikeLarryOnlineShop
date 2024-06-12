import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import Contact from "./pages/Contact";
import Register from "./pages/Register";
import Nav from "./components/navigation/Nav";
import Footer from "./components/Footer";
import PayNow from "./pages/PayNow";
import PaymentFailure from "./pages/PaymentFailure";
import Profile from "./pages/Profile";
import AdminLogin from "./components/administration/AdminLogin";
import AdminRegister from "./components/administration/AdminRegister";
import Products from "./components/administration/Products";
import UpdateProduct from "./components/administration/UpdateProduct";
import Orders from "./components/administration/Orders";
import AddProduct from "./components/administration/AddProduct";
import MultipleOrders from "./components/administration/MultipleOrders";
import SingleOrder from "./components/administration/SingleOrder";
const App = () => {
  return (
    <>
      <Nav />
      <Router>
        <Routes>
          <Route path="/admin">
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Admin />}>
              <Route path="/admin/dashboard" element={<Products />} />
              <Route path="/admin/dashboard/orders" element={<Orders />}>
                <Route
                  path="/admin/dashboard/orders"
                  element={<SingleOrder />}
                />
                <Route
                  path="/admin/dashboard/orders/multiple"
                  element={<MultipleOrders />}
                />
              </Route>
              <Route
                path="/admin/dashboard/add-product"
                element={<AddProduct />}
              />
              <Route
                path="/admin/dashboard/update"
                element={<UpdateProduct />}
              />
            </Route>
            <Route path="/admin/register" element={<AdminRegister />} />
          </Route>
          <Route path="/payment/canceled" element={<PaymentFailure />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PayNow />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
};

export default App;
