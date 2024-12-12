// Importiamo i componenti necessari per il routing da react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom'
// Importiamo i componenti della nostra applicazione
import Navbar from './components/Navbar'
import AllNews from './components/AllNews'
import SinglePage from './components/SinglePage'
import FooterComp from './components/FooterComp'
import FavoritesPage from './components/FavoritesPage'
// Importiamo gli stili CSS
import './App.css'
// Importiamo il Provider per gestire i preferiti
import { FavoritesProvider } from './components/FavoritesContext'

// Componente principale dell'applicazione
function App() {
  return (
    // Wrapping dell'app con FavoritesProvider per gestire lo stato dei preferiti
    <FavoritesProvider>
      {/* BrowserRouter per gestire il routing dell'applicazione */}
      <BrowserRouter>
        <div className="app-container">
          {/* Navbar sempre visibile in tutte le pagine */}
          <Navbar />
          <main>
            {/* Definizione delle rotte dell'applicazione */}
            <Routes>
              {/* Rotta principale che mostra tutti gli articoli */}
              <Route path="/" element={<AllNews />} />
              {/* Rotta per la visualizzazione del singolo articolo */}
              <Route path="/article/:id" element={<SinglePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
            </Routes>
          </main>
          {/* Footer sempre visibile in tutte le pagine */}
          <FooterComp />
        </div>
      </BrowserRouter>
    </FavoritesProvider>
  )
}

// Esportiamo il componente App
export default App
