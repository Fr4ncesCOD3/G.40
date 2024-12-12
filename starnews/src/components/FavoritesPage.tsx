// Importiamo i componenti necessari
import { Container } from 'react-bootstrap';
import { useFavorites } from './FavoritesContext'; // Hook personalizzato per gestire i preferiti
import NewsCard from './NewsCard'; // Componente per visualizzare la card di un articolo

// Componente che gestisce la pagina dei preferiti
const FavoritesPage = () => {
  // Otteniamo l'array dei preferiti dal context
  const { favorites } = useFavorites();

  // Se non ci sono preferiti, mostriamo un messaggio
  if (favorites.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Nessun articolo salvato</h2>
        <p className="text-muted">Gli articoli che salverai appariranno qui</p>
      </Container>
    );
  }

  // Se ci sono preferiti, li mostriamo in una lista
  return (
    <Container className="py-4">
      <h2 className="mb-4">I tuoi articoli salvati</h2>
      <div className="articles-list">
        {/* Mappiamo l'array dei preferiti per creare una card per ogni articolo */}
        {favorites.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesPage; 