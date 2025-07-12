import * as React from "react";
import ResultItem from "./ResultItem";
import AgeSlider from "./AgeSlider";
import SearchInput from "./SearchInput";
import { generateResultsLabel } from "./utils";

const Results = React.memo(function Results({ data }) {
  const [ageRange, setAgeRange] = React.useState([0, 100]);
  const [value, setValue] = React.useState("");
  const deferredValue = React.useDeferredValue(value);
  const deferredAgeRange = React.useDeferredValue(ageRange);

  const filteredData = React.useMemo(() => {
    return data.filter(({ firstName, lastName, age }) => {
      const searchMatch = `${firstName} ${lastName}`
        .toLowerCase()
        .includes(deferredValue.toLowerCase());

      const [min, max] = deferredAgeRange;
      const ageMatch = age >= min && age <= max;
      return searchMatch && ageMatch;
    });
  }, [data, deferredValue, deferredAgeRange]);

  const isPending = ageRange !== deferredAgeRange || deferredValue !== value;

  return (
    <div className="stack">
      <SearchInput onChange={setValue} value={value} />
      <div className="filter-bar">
        {generateResultsLabel(filteredData.length)}
        <div className="filters">
          <span>Age:</span>
          <AgeSlider
            min={0}
            max={100}
            onChange={(range) => setAgeRange(range)}
          />
        </div>
      </div>
      <ul style={{ opacity: isPending ? 0.5 : 1 }}>
        {filteredData.map((d) => {
          return <ResultItem key={d.runnerId} {...d} />;
        })}
      </ul>
    </div>
  );
});

export default Results;
