import { Container } from 'react-bootstrap';
import { useFavorites } from './FavoritesContext';
import NewsCard from './NewsCard';

const FavoritesPage = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h2>Nessun articolo salvato</h2>
        <p className="text-muted">Gli articoli che salverai appariranno qui</p>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">I tuoi articoli salvati</h2>
      <div className="articles-list">
        {favorites.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </Container>
  );
};

export default FavoritesPage; 