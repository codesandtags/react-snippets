import './App.css'

import Repos from './react-query/repos/Repos.tsx'

function App() {
  return (
    <div className="app-container">
      {/* Header with site title */}
      <header className="site-header">
        <h1>React Snippets</h1>
        <p>A collection of useful code snippets for React developers.</p>
      </header>

      {/* Main content area */}
      {/* <main className="main-content">
        <section className="snippet-section">
          <h2>React Query Deduplication Example</h2>
          <DeduplicationExample />
        </section>
      </main> */}
      
      <main>
        <Repos />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>Built with React & CSS Variables</p>
      </footer>
    </div>
  );
}

export default App
