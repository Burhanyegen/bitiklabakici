import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home'; // BU SATIR MUTLAKA OLMALI
import ServiceDetail from './ServiceDetail';
import Admin from './Admin';
import Login from './Login';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hizmet/:serviceId" element={<ServiceDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;