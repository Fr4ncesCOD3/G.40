// Importiamo i componenti e le funzionalità necessarie
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import { NewsCardProps } from '../types/interfaces';
import { useFavorites } from './FavoritesContext';
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs';

// Componente NewsCard che mostra una card per ogni articolo
const NewsCard = ({ article }: NewsCardProps) => {
  // Otteniamo le funzioni per gestire i preferiti dal context
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  // Formattiamo la data di pubblicazione nel formato italiano
  const formattedDate = new Date(article.published_at).toLocaleDateString('it-IT');

  // Gestore del click sul pulsante dei preferiti
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault(); // Preveniamo la navigazione del Link
    if (isFavorite(article.id)) {
      removeFavorite(article.id); // Rimuoviamo dai preferiti se già presente
    } else {
      addFavorite({ ...article, savedAt: new Date().toISOString() }); // Aggiungiamo ai preferiti
    }
  };

  return (
    <Card className="news-card">
      {/* Header della card con il nome del sito e il pulsante dei preferiti */}
      <div className="card-header p-3 d-flex align-items-center border-bottom">
        <small className="text-muted me-auto">{article.news_site}</small>
        <Button
          variant="link"
          onClick={handleFavorite}
          className="p-0 text-dark"
        >
          {/* Mostra icona piena se è nei preferiti, vuota altrimenti */}
          {isFavorite(article.id) ? <BsBookmarkFill size={20} /> : <BsBookmark size={20} />}
        </Button>
      </div>
      
      {/* Link all'articolo completo */}
      <Link to={`/article/${article.id}`} className="text-decoration-none text-dark">
        {/* Immagine dell'articolo con aspect ratio 1:1 */}
        <Card.Img 
          src={article.image_url} 
          alt={article.title}
          className="rounded-0"
          style={{ aspectRatio: '1/1', objectFit: 'cover' }}
        />
        
        {/* Corpo della card con titolo, sommario e data */}
        <Card.Body className="p-3">
          <Card.Title className="mb-2">{article.title}</Card.Title>
          <Card.Text className="mb-2 text-truncate">
            {article.summary}
          </Card.Text>
          <small className="text-muted">
            {formattedDate}
          </small>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default NewsCard;
