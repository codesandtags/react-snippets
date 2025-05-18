import { useState, useEffect, type ChangeEvent } from "react";

type CountryData = {
  name: string;
  capital: string;
  region: string;
  population: number;
  area: number;
};


/**
 * CountryInfo React component displays information about a selected country.
 *
 * This component allows users to select a country from a dropdown list and fetches
 * relevant country data (name, capital, region, population, area) from the REST Countries API.
 * It handles loading and error states, and displays the fetched data in a table format.
 *
 * @component
 *
 * @example
 * ```tsx
 * <CountryInfo />
 * ```
 *
 * @returns {JSX.Element} The rendered country information section.
 */
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
    // Cleanup function to prevent state updates on unmounted component
    let ignore = false;

    const fetchCountryData = async () => {
      if (ignore) return;

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

    return () => {
      ignore = true;
    };
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