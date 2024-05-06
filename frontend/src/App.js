import './assets/styles/styles.scss'
import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import AppHeader from './cmps/AppHeader';
import HomePage from './views/HomePage';
import CodeBlockDetails from './views/CodeBlockDetails';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getAllCodeBlocks } from './store/actions/codeBlocks.actions';
import CreateCodeBlock from './views/CreateCodeBlock';


function App() {
  
  const dispatch = useDispatch()

  // Fetching all codeBlocks and storing them in react redux store
  useEffect(() => {
    dispatch(getAllCodeBlocks())
  }, [dispatch])
  
  return (
    <Router>
      <section className='main-app main-layout'>
        <AppHeader />
        <section className='main-content'>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/createCode" element={<CreateCodeBlock />} />
            <Route path="/codeDetails/:id" element={<CodeBlockDetails />} />
          </Routes>
        </section>
      </section>
    </Router>
  );
}

export default App;
