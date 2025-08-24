import './App.css'

import { DeduplicationExample } from './react-query/deduplication-example/DeduplicationExample'
import { MediaContainer } from './react-query/media-devices/MediaDevices';

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
        <MediaContainer />
      </main>

      {/* Footer */}
      <footer className="site-footer">
        <p>Built with React & CSS Variables</p>
      </footer>
    </div>
  );
}

export default App
