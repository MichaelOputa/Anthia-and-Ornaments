import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Jewelry from './pages/Jewelry';
import Clothing from './pages/Clothing';
import Wristwatches from './pages/Wristwatches';
import Eyeglasses from './pages/Eyeglasses';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Perfumes from './pages/Perfumes';
import AdminDashboard from './pages/AdminDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminResetPassword from './pages/AdminResetPassword';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';

function AppLayout() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white">
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jewelry" element={<Jewelry />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/wristwatches" element={<Wristwatches />} />
        <Route path="/eyeglasses" element={<Eyeglasses />} />
        <Route path="/perfumes" element={<Perfumes />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-password" element={<AdminResetPassword />} />
      </Routes>
      {!isAdminRoute && <Footer />}
      {!isAdminRoute && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <Router>
          <AppLayout />
        </Router>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;
