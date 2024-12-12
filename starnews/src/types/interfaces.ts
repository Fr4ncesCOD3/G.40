// Questa interfaccia definisce la struttura di un articolo
// Un'interfaccia è come un "contratto" che specifica quali proprietà deve avere un oggetto
export interface Article {
  id: number;            // ID univoco dell'articolo
  title: string;         // Titolo dell'articolo
  url: string;          // Link all'articolo originale
  image_url: string;    // URL dell'immagine dell'articolo
  news_site: string;    // Nome del sito di notizie
  summary: string;      // Riassunto dell'articolo
  published_at: string; // Data di pubblicazione
  updated_at: string;   // Data dell'ultimo aggiornamento
  featured: boolean;    // Indica se l'articolo è in evidenza
  launches: Launch[];   // Array di lanci spaziali correlati
  events: Event[];      // Array di eventi correlati
}

// Interfaccia che definisce la struttura di un lancio spaziale
interface Launch {
  launch_id: string;    // ID univoco del lancio
  provider: string;     // Azienda che effettua il lancio
}

// Interfaccia che definisce la struttura di un evento
interface Event {
  event_id: string;     // ID univoco dell'evento
  provider: string;     // Organizzatore dell'evento
}

// Props (proprietà) che vengono passate al componente NewsCard
export interface NewsCardProps {
  article: Article;     // Un articolo da mostrare nella card
}

// Estende l'interfaccia Article aggiungendo la data di salvataggio nei preferiti
export interface FavoriteArticle extends Article {
  savedAt: string;      // Data in cui l'articolo è stato salvato nei preferiti
}

// Interfaccia per i filtri di ricerca degli articoli
export interface SearchFilters {
  query: string;        // Testo da cercare
  sortBy: 'published_at' | 'title';  // Campo per ordinare (data o titolo)
  order: 'asc' | 'desc';  // Ordine crescente o decrescente
} 