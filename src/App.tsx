import { Route, BrowserRouter as Router, Routes } from 'react-router';
import Layout from './Layout';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
export default function App() {
  // const { data } = useFetchJson('/data/data01.json');
  // const products = Array.isArray(data) ? data : [];
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:slug" element={<ProductDetail />} />
        </Route>
      </Routes>
    </Router>
  );
}
