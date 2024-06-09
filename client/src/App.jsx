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
const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/admin" element={<Admin />} />
          <Route path="/payment/canceled" element={<PaymentFailure />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/payment" element={<PayNow />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;
