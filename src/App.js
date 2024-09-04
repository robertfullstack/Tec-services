import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './screens/Home';
import Painel from './screens/Painel';
import Header from './components/Header';
import Servico from './screens/Servico';
import Chamado from './screens/Chamado';
import HistoricoChamados from './screens/HistoricoChamados';
// import About from './screens/About';
import Contato from './screens/Contato';
import Loja from './screens/Loja';
import Footer from './components/Footer';
import ScreenAdmin from './screens/ScreenAdmin';

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrologin" element={<Painel />} />
          <Route path="/Servico" element={<Servico />} />
          <Route path="/abrirChamado" element={<Chamado />} />
          <Route path="/HistoricoChamados" element={<HistoricoChamados />} />
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/contact" element={<Contato />} />
          <Route path="/Admin" element={<ScreenAdmin />} />
          <Route path="/loja" element={<Loja />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;


// site de referencia: https://novosmart.com.br/
