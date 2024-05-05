import './assets/styles/styles.scss'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import HomePage from './views/HomePage';
import CodeBlockDetails from './views/CodeBlockDetails';


function App() {
  return (
    <Router>
      <section className='main-app main-layout'>
        <AppHeader />
        <section className='main-content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/codeDetails/:id" element={<CodeBlockDetails />} />
          </Routes>
        </section>
      </section>
    </Router>
  );
}

export default App;
