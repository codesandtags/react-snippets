import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import {
  UpToDate,
  BackgroundUpdateInProgress,
  StaleMessage,
  ErrorMessage
} from "./MessageComponents";
import { getData, createStarString, getRatingString } from "./utils";

function useBook(bookId) {
  return useQuery({
    queryKey: ['book', { bookId }],
    queryFn: () => getData(bookId),
    staleTime: 5000
  })
}

function CheckoutMessage({ refetch, isStale, isFetching }) {
  if (isFetching) {
    return <BackgroundUpdateInProgress />;
  }

  if (isStale) {
    return <StaleMessage refetch={refetch} />;
  }

  return <UpToDate />;
}

function Book({ bookId }) {
  const { data, status, isStale, refetch, isFetching } = useBook(bookId);

  
  if (status === "error") {
    return <ErrorMessage />;
  }

  if (status === "pending") {
    return (
      <main>
        <Loader />
      </main>
    );
  }

  return (
    <main className="book-detail">
      <div>
        <span className="book-cover">
          <img src={data.thumbnail} alt={data.title} />
        </span>
      </div>
      <div>
        <h2 className="book-title">{data.title}</h2>
        <small className="book-author">{data.authors.join(", ")}</small>
        <span className="book-rating">
          {createStarString(data.averageRating)}{" "}
          {getRatingString(data.averageRating)}
        </span>
        <div className="checkout-wrapper">
          <button className="primary">Check Out</button>
          <CheckoutMessage
            refetch={refetch}
            isStale={isStale}
            isFetching={isFetching}
          />
        </div>
        <div
          className={`book-synopsis`}
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </div>
    </main>
  );
}

export default function App() {
  const [selectedBookId, setSelectedBookId] = React.useState("pD6arNyKyi8C");

  return (
    <div>
      <header className="app-header">
        <h1>
          <span>Query Library</span>
        </h1>
        <div className="select">
          <select
            value={selectedBookId}
            onChange={(e) => setSelectedBookId(e.target.value)}
          >
            <option value="pD6arNyKyi8C">The Hobbit</option>
            <option value="aWZzLPhY4o0C">The Fellowship Of The Ring</option>
            <option value="12e8PJ2T7sQC">The Two Towers</option>
            <option value="WZ0f_yUgc0UC">The Return Of The King</option>
          </select>
        </div>
      </header>

      <Book bookId={selectedBookId} />
    </div>
  );
}
