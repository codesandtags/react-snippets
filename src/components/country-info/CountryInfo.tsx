import { useState, useEffect, type ChangeEvent } from "react";

type CountryData = {
  name: string;
  capital: string;
  region: string;
  population: number;
  area: number;
};

export default function CountryInfo() {
  const [countryCode, setCountryCode] = useState<string>("AU");
  const [data, setData] = useState<CountryData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setCountryCode(country);
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      const url = `https://restcountries.com/v2/alpha/${countryCode}`;
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch country data");
        const data: CountryData = await response.json();
        setData(data);
        setError(null);
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Unknown error"));
        setData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCountryData();
  }, [countryCode]);

  return (
    <section>
      <header>
        <h2>Country Info:</h2>

        <label htmlFor="country">Select a country:</label>
        <div>
          <select id="country" value={countryCode} onChange={handleChange}>
            <option value="AU">Australia</option>
            <option value="CA">Canada</option>
            <option value="CN">China</option>
            <option value="FR">France</option>
            <option value="DE">Germany</option>
            <option value="IN">India</option>
            <option value="JP">Japan</option>
            <option value="MX">Mexico</option>
            <option value="GB">United Kingdom</option>
            <option value="US">United States of America</option>
          </select>
          {isLoading && <span>Loading...</span>}
          {error && <span>{error.message}</span>}
        </div>
      </header>

      {data && (
        <article>
          <h2>{data.name}</h2>
          <table>
            <tbody>
              <tr>
                <td>Capital:</td>
                <td>{data.capital}</td>
              </tr>
              <tr>
                <td>Region:</td>
                <td>{data.region}</td>
              </tr>
              <tr>
                <td>Population:</td>
                <td>{data.population}</td>
              </tr>
              <tr>
                <td>Area:</td>
                <td>{data.area}</td>
              </tr>
            </tbody>
          </table>
        </article>
      )}
    </section>
  );
}