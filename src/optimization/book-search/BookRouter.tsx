import * as React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { matchRoute, extractParams } from "./routingUtils";
import { fetchData } from "./data";
import Loader from "./Loader";

const RouterContext = React.createContext(null);

export function Router({ children, routes = [] }) {
  const [currentRoute, setCurrentRoute] = React.useState(
    window.location.pathname
  );
  const [params, setParams] = React.useState({});

  const routeExists = React.useCallback(
    (path) => {
      return routes.some((route) => matchRoute(path, route.path));
    },
    [routes]
  );

  const updateCurrentRoute = React.useCallback(
    (path) => {
      const matchedRoute = routes.find((route) => matchRoute(path, route.path));
      if (matchedRoute) {
        const newParams = extractParams(path, matchedRoute.path);
        setParams(newParams || {});
      }
      setCurrentRoute(path);
    },
    [routes]
  );

  const navigate = React.useCallback(
    (to) => {
      updateCurrentRoute(to);
      window.history.pushState(null, "", to);
    },
    [updateCurrentRoute]
  );

  React.useEffect(() => {
    const handlePopState = () => {
      updateCurrentRoute(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [updateCurrentRoute]);

  React.useEffect(() => {
    const initialPath = window.location.pathname;
    if (!routeExists(initialPath)) {
      navigate("/404");
    } else {
      updateCurrentRoute(initialPath);
    }
  }, [navigate, routeExists, updateCurrentRoute]);

  return (
    <RouterContext.Provider
      value={{ currentRoute, navigate, routeExists, params }}
    >
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const context = React.use(RouterContext);
  if (!context) {
    throw new Error("useRouter must be used within a Router");
  }
  return context;
}

export function useParams() {
  const { params } = useRouter();
  return params;
}

export function Route({ path, component: Component }) {
  const { currentRoute } = useRouter();

  if (matchRoute(currentRoute, path)) {
    return <Component />;
  }
  return null;
}

export function Link({ to, children }) {
  const { navigate, currentRoute } = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      navigate(to);
    });
  };

  const isActive = currentRoute === to;

  return (
    <a
      href={to}
      onClick={handleClick}
      className={isActive ? "active" : ""}
      style={{
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {children}
    </a>
  );
}

const routes = [
  { path: "/", component: FeaturedBooks },
  { path: "/about", component: About },
  { path: "/search", component: Search },
  { path: "/books/:id", component: BookDetail },
  { path: "/404", component: NotFound },
];

export default function App() {
  return (
    <Router routes={routes}>
      <header className="app-header">
        <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/search">Search</Link>
        </nav>
      </header>
      <main>
        <React.Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {routes.map(({ path, component }) => (
              <Route key={path} path={path} component={component} />
            ))}
          </ErrorBoundary>
        </React.Suspense>
      </main>
    </Router>
  );
}

function About() {
  return (
    <section>
      <h1>About Page</h1>
      <p>
        Welcome to our Demo Bookstore App! Discover your next great read with
        ease. You can search for your favorite titles or explore our collection
        by simply clicking on a book to learn more about it. Dive into detailed
        descriptions, author information, and more. Happy browsing!
      </p>
    </section>
  );
}

function Search() {
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query);
  const isLoading = deferredQuery !== query;
  return (
    <>
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
    </>
  );
}

function SearchResults({ query }) {
  if (!query) return null;

  const { books } = React.use(
    fetchData(`/books/search?q=${encodeURIComponent(query)}`)
  );

  return (
    <ul>
      {books?.map((book) => {
        return (
          <Link key={book.id} to={`/books/${book.id}`}>
            <li>
              <span className="book-cover">
                <img src={book.thumbnail} alt={book.title} />
              </span>
              <h3 className="book-title">{book.title}</h3>
              <small className="book-author">{book.authors.join(", ")}</small>
            </li>
          </Link>
        );
      })}
    </ul>
  );
}

function FeaturedBooks() {
  const books = React.use(fetchData(`/books/featured`));
  return (
    <section className="book-grid">
      <h2>Featured Books</h2>
      <ul>
        {books.map((book) => {
          return (
            <Link key={book.id} to={`/books/${book.id}`}>
              <li>
                <span className="book-cover">
                  <img src={book.thumbnail} alt={book.title} />
                </span>
                <h3 className="book-title">{book.title}</h3>
                <small className="book-author">{book.authors.join(", ")}</small>
              </li>
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

function BookDetail() {
  const { id } = useParams();
  if (!id) return null;
  const book = React.use(fetchData(`/books/${id}`));
  const { title, thumbnail, authors, description } = book;
  return (
    <main className="book-detail">
      <div>
        <span className="book-cover">
          <img src={thumbnail} alt={title} />
        </span>
      </div>
      <div>
        <h2 className="book-title">{title}</h2>
        <small className="book-author">{authors.join(", ")}</small>

        <div
          className={`book-synopsis`}
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/">Go Home</Link>
    </div>
  );
}

function LoadingFallback() {
  return <div className="fallback" />;
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
