// Importiamo gli hook e i tipi necessari da React
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
// Importiamo il tipo FavoriteArticle che definisce la struttura di un articolo preferito
import { FavoriteArticle } from '../types/interfaces';

// Definiamo l'interfaccia che descrive le funzionalità del nostro context
interface FavoritesContextType {
  favorites: FavoriteArticle[]; // Array degli articoli preferiti
  addFavorite: (article: FavoriteArticle) => void; // Funzione per aggiungere ai preferiti
  removeFavorite: (id: number) => void; // Funzione per rimuovere dai preferiti
  isFavorite: (id: number) => boolean; // Funzione per verificare se un articolo è tra i preferiti
}

// Creiamo il Context con un valore iniziale undefined
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

// Componente Provider che gestirà lo stato dei preferiti
export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  // Inizializziamo lo state dei preferiti
  // La funzione di inizializzazione controlla se ci sono preferiti salvati nel localStorage
  const [favorites, setFavorites] = useState<FavoriteArticle[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : []; // Se ci sono dati salvati li carichiamo, altrimenti array vuoto
  });

  // Ogni volta che l'array dei preferiti cambia, lo salviamo nel localStorage
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Funzione per aggiungere un articolo ai preferiti
  const addFavorite = (article: FavoriteArticle) => {
    setFavorites(prev => [...prev, { ...article, savedAt: new Date().toISOString() }]);
  };

  // Funzione per rimuovere un articolo dai preferiti usando il suo ID
  const removeFavorite = (id: number) => {
    setFavorites(prev => prev.filter(article => article.id !== id));
  };

  // Funzione per verificare se un articolo è tra i preferiti
  const isFavorite = (id: number) => {
    return favorites.some(article => article.id === id);
  };

  // Rendiamo disponibili tutte le funzionalità attraverso il Provider
  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

// Hook personalizzato per utilizzare il context dei preferiti
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  // Se il context non esiste, significa che stiamo usando l'hook fuori dal Provider
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}; 