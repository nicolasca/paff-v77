import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Layout></Layout>
    </div>
    </BrowserRouter>
    
  );
}

export default App;
