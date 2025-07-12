import * as React from "react";
import Results from "./Results";
import { getData } from "./utils";

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData("2024")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
  }, []);

  return (
    <main className="stack">
      <h1>Marathon Results</h1>
      {data.length > 1 ? <Results data={data} /> : <div>Loading...</div>}
    </main>
  );
}
