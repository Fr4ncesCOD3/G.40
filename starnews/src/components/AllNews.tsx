// Importiamo gli hook necessari da React e altre librerie
import { useState, useEffect } from 'react';
import axios from 'axios';
// Importiamo i tipi personalizzati che abbiamo definito
import { Article, SearchFilters } from '../types/interfaces';
import NewsCard from './NewsCard';
// Importiamo i componenti di React Bootstrap che useremo
import { Container, Form, InputGroup, Button, Spinner } from 'react-bootstrap';
// Importiamo il componente per lo scroll infinito
import InfiniteScroll from 'react-infinite-scroll-component';

const AllNews = () => {
  // Definiamo gli stati che useremo nel componente
  // articles: array che contiene tutti gli articoli caricati
  const [articles, setArticles] = useState<Article[]>([]);
  // error: contiene eventuali messaggi di errore
  const [error, setError] = useState<string | null>(null);
  // page: tiene traccia della pagina corrente per la paginazione
  const [page, setPage] = useState(1);
  // hasMore: indica se ci sono altri articoli da caricare
  const [hasMore, setHasMore] = useState(true);
  // filters: contiene i filtri di ricerca (query di ricerca e ordinamento)
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    sortBy: 'published_at',
    order: 'desc'
  });

  // Funzione che recupera gli articoli dall'API
  const fetchArticles = async (pageNum: number, isNewSearch = false) => {
    try {
      // Facciamo la chiamata API con axios
      const response = await axios.get('https://api.spaceflightnewsapi.net/v4/articles', {
        params: {
          limit: 10, // Numero di articoli per pagina
          offset: (pageNum - 1) * 10, // Calcolo dell'offset per la paginazione
          title_contains: filters.query, // Filtro per il titolo
          ordering: `${filters.order === 'desc' ? '-' : ''}${filters.sortBy}` // Ordinamento
        }
      });

      const newArticles = response.data.results;
      // Aggiorniamo l'array degli articoli
      // Se è una nuova ricerca, sostituiamo completamente l'array
      // Altrimenti aggiungiamo i nuovi articoli a quelli esistenti
      setArticles(prev => isNewSearch ? newArticles : [...prev, ...newArticles]);
      // Verifichiamo se ci sono altri articoli da caricare
      setHasMore(newArticles.length === 10);
    } catch (err) {
      setError('Errore durante il caricamento degli articoli');
    }
  };

  // Questo effect si attiva quando cambiano i filtri
  useEffect(() => {
    setPage(1); // Resettiamo la pagina
    fetchArticles(1, true); // Facciamo una nuova ricerca
  }, [filters]);

  // Funzione chiamata quando l'utente scorre fino in fondo
  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage);
  };

  // Gestisce il cambio del testo nella barra di ricerca
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters(prev => ({ ...prev, query: e.target.value }));
  };

  // Gestisce il cambio dell'ordinamento (asc/desc)
  const handleSort = () => {
    setFilters(prev => ({
      ...prev,
      sortBy: 'published_at',
      order: prev.order === 'desc' ? 'asc' : 'desc'
    }));
  };

  // Se c'è un errore, mostriamo il messaggio
  if (error) return <div className="error">{error}</div>;

  // Il render del componente
  return (
    <Container className="py-4 px-3">
      {/* Barra di ricerca con bottone di ordinamento */}
      <div className="search-container">
        <InputGroup>
          <Form.Control
            placeholder="Cerca articoli..."
            value={filters.query}
            onChange={handleSearch}
            className="search-input border-end-0"
          />
          <Button 
            variant="link"
            onClick={handleSort}
            className="text-dark"
          >
            <i className="bi bi-sort-down"></i>
          </Button>
        </InputGroup>
      </div>

      {/* Componente per lo scroll infinito */}
      <InfiniteScroll
        dataLength={articles.length} // Numero di articoli caricati
        next={loadMore} // Funzione da chiamare per caricare altri articoli
        hasMore={hasMore} // Se ci sono altri articoli da caricare
        loader={
          <div className="loading-spinner">
            <Spinner animation="border" size="sm" />
          </div>
        }
        endMessage={
          <p className="end-message">Non ci sono altri articoli</p>
        }
      >
        {/* Grid responsive degli articoli */}
        <div className="row g-0">
          {articles.map((article) => (
            <div key={article.id} className="col-12 col-md-6 col-lg-4 p-2">
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      </InfiniteScroll>
    </Container>
  );
};

export default AllNews;
