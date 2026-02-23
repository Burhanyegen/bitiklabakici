import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // BU SATIR MUTLAKA OLMALI
import ServiceDetail from './ServiceDetail';
import Admin from './Admin';
import Login from './Login';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hizmet/:serviceId" element={<ServiceDetail />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </Router>
    </HelmetProvider>
  );
}

export default App;