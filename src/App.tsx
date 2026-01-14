import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Jewelry from './pages/Jewelry';
import Clothing from './pages/Clothing';
import Slides from './pages/Slides';
import Fabrics from './pages/Fabrics';
import Wristwatches from './pages/Wristwatches';
import Eyeglasses from './pages/Eyeglasses';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jewelry" element={<Jewelry />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/slides" element={<Slides />} />
          <Route path="/fabrics" element={<Fabrics />} />
          <Route path="/wristwatches" element={<Wristwatches />} />
          <Route path="/eyeglasses" element={<Eyeglasses />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
