import Nav from "./components/navigation/Nav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Admin from "./pages/Admin";
import Cart from "./components/Cart";
const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />}></Route>
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<Admin />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
