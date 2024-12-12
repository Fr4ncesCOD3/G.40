// Importiamo gli hook e i componenti necessari
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Article } from '../types/interfaces';
import { Container, Alert, Spinner, Button } from 'react-bootstrap';
import { BsBookmark } from 'react-icons/bs';

// Componente che mostra il dettaglio di un singolo articolo
const SinglePage = () => {
  // Otteniamo l'id dell'articolo dai parametri dell'URL
  const { id } = useParams();
  // Stati per gestire l'articolo, il caricamento e gli errori
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effect che si attiva quando cambia l'id e recupera i dati dell'articolo
  useEffect(() => {
    const fetchArticle = async () => {
      try {
        // Chiamata API per ottenere i dettagli dell'articolo
        const response = await axios.get(`https://api.spaceflightnewsapi.net/v4/articles/${id}`);
        setArticle(response.data);
        setLoading(false);
      } catch (err) {
        setError('Errore durante il caricamento dell\'articolo');
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  // Mostra lo spinner durante il caricamento
  if (loading) return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '60vh' }}>
      <Spinner animation="border" variant="primary" />
    </Container>
  );

  // Mostra un messaggio di errore se qualcosa è andato storto
  if (error) return (
    <Container className="py-5">
      <Alert variant="danger" className="text-center">{error}</Alert>
    </Container>
  );

  // Mostra un avviso se l'articolo non è stato trovato
  if (!article) return (
    <Container className="py-5">
      <Alert variant="warning" className="text-center">Articolo non trovato</Alert>
    </Container>
  );

  // Rendering principale dell'articolo
  return (
    <Container className="py-4 px-0">
      <article className="article-container">
        {/* Contenitore dell'immagine dell'articolo */}
        <div className="article-image-container">
          <img 
            src={article.image_url} 
            alt={article.title} 
            className="w-100 h-100"
            style={{ objectFit: 'cover' }}
          />
        </div>

        {/* Contenuto testuale dell'articolo */}
        <div className="article-content p-4">
          {/* Header con fonte, data e pulsante preferiti */}
          <div className="d-flex align-items-center mb-3">
            <div>
              <h6 className="mb-0">{article.news_site}</h6>
              <small className="text-muted">
                {new Date(article.published_at).toLocaleDateString('it-IT')}
              </small>
            </div>
            <Button
              variant="link"
              className="ms-auto text-dark"
            >
              <BsBookmark size={20} />
            </Button>
          </div>

          <hr />

          {/* Titolo e sommario dell'articolo */}
          <h1 className="h5 mb-3">{article.title}</h1>
          <p className="mb-4">{article.summary}</p>

          {/* Pulsante per leggere l'articolo completo sul sito originale */}
          <Button 
            variant="primary" 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-100"
          >
            Leggi l'articolo completo
          </Button>
        </div>
      </article>
    </Container>
  );
};

export default SinglePage;
