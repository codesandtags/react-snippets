import * as React from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import {
  ErrorMessage,
  NoResults,
  Searching,
  HasNotSearched
} from "./MessageComponents";

import { getData } from "./utils";
import ResultList from "./ResultList";

function useBookSearch(searchTerm) {
  return useQuery({
    queryKey: ['book', { searchTerm }],
    queryFn: () => getData(searchTerm),
    enabled: searchTerm !== ''
  })
}

function Results({ data, searchTerm, status }) {
  if (!searchTerm) {
    return <HasNotSearched />;
  }

  if (status === "error") {
    return <ErrorMessage />;
  }

  if (status === "pending") {
    return <Searching />;
  }

  const hasResults = data.length > 0;

  if (hasResults) {
    return <ResultList searchTerm={searchTerm} data={data} />;
  }

  return <NoResults />;
}

export default function App() {
  const [value, setValue] = React.useState("");
  const searchTerm = useDebounce(value, 300);
  const { data, status, isLoading } = useBookSearch(searchTerm);


  return (
    <div>
      <header className="app-header">
        <h1>
          <span>Query Library</span>
        </h1>
        <div className="search-wrapper">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
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
      </header>
      <main>
        <Results status={status} data={data} searchTerm={value} />
      </main>
    </div>
  );
}