import './App.css'

import TranslationLanguage from './context/translation-language/TranslationLanguage'

function App() {
  return (
    <main>
      <h1>React Snippets</h1>
      <p>
        A set of `React Snippets` used for common projects.
      </p>

      <section>
        <TranslationLanguage />
      </section>
    </main>
  )
}

export default App
