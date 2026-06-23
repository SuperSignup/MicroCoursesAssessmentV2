/*
Overview:
This file is the base App of the react page, provides routes for homepage and detail page
*/

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage.jsx';
import DetailPage from './components/DetailPage.jsx';

function App() {
  console.log('App is rendering'); //useful for debugging by showing if the program reaches this point
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/detail' element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;