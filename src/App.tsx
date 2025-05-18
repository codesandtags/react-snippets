import './App.css'
import CountryInfo from './components/country-info/CountryInfo'
import HackerNewsSearch from './components/hacker-news-search/HackerNewsSearch'
import TabAways from './components/tab-detection/TabAway'
import Timer from './components/timer/Timer'

function App() {
  return (
    <main>
      <h1>React Snippets</h1>
      <p>
        A set of `React Snippets` used for common projects.
      </p>

      <section>
        <HackerNewsSearch />
      </section>
    </main>
  )
}

export default App
