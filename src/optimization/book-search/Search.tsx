import * as React from "react";
import { fetchData } from "./data";
import { ErrorBoundary } from "react-error-boundary";
import Loader from "./Loader";

export default function Search() {
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);
  const isLoading = deferredQuery !== query;
  return (
    <main>
      <section>
        <label htmlFor="search">Book Search</label>
        <div className="search-wrapper">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
            type="text"
            name="search"
            id="search"
            autoComplete="off"
            autoCorrect="off"
            placeholder="Search books"
          />
          {isLoading && <Loader />}
        </div>
      </section>
      <ErrorBoundary
        onError={() => setQuery("")}
        FallbackComponent={ErrorFallback}
      >
        <section className="book-grid" style={{ opacity: isLoading ? 0.5 : 1 }}>
          <SearchResults query={deferredQuery} />
        </section>
      </ErrorBoundary>
    </main>
  );
}

function ErrorFallback({ resetErrorBoundary }) {
  return (
    <div>
      There was an error{" "}
      <button
        type="button"
        className="button-inline"
        onClick={resetErrorBoundary}
      >
        Try a new search
      </button>
    </div>
  );
}

function SearchResults({ query }) {
  const { books } = React.use(
    fetchData(`/books/search?q=${encodeURIComponent(query)}`)
  );

  return (
    <ul>
      {books?.map((book) => {
        return (
          <li key={book.id}>
            <span className="book-cover">
              <img src={book.thumbnail} alt={book.title} />
            </span>
            <h3 className="book-title">{book.title}</h3>
            <small className="book-author">{book.authors.join(", ")}</small>
          </li>
        );
      })}
    </ul>
  );
}