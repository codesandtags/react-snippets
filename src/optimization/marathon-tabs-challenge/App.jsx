import * as React from "react";
import Results from "./Results";
import { getData } from "./utils";
import { Tabs, TabContent, TabTrigger, TabList } from "./Tabs";
import Overview from "./Overview";
import Awards from "./Awards";

export default function App() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    getData("2024")
      .then((res) => res.json())
      .then((d) => {
        setData(d);
      });
  }, []);

  if (!data.length) {
    return <main>Loading...</main>;
  }

  return (
    <main className="stack">
      <Tabs defaultTabId="overview">
        <TabList>
          <TabTrigger tabId="overview">Overview</TabTrigger>
          <TabTrigger tabId="results">Results</TabTrigger>
          <TabTrigger tabId="awards">Awards</TabTrigger>
        </TabList>
        <TabContent tabId="overview">
          <h1>Overview</h1>
          <Overview results={data} />
        </TabContent>
        <TabContent tabId="results">
          <h1>Results</h1>
          <Results data={data} />{" "}
        </TabContent>
        <TabContent tabId="awards">
          <h1>Awards</h1>
          <Awards results={data} />
        </TabContent>
      </Tabs>
    </main>
  );
}
