import { useEffect, useState } from 'react';
import PhotosList from '../PhotosList/PhotosList';
import { RootStoreProvider, RootStore } from '../../store/rootstore';
import { Routes, Route, Router } from "react-router-dom";
import { history } from '../../history/history';
import './App.css';

const App = () => {
  const [rootStore, setRootStore] = useState()

  useEffect(() => {
    setRootStore(new RootStore())
  }, [])

  if (!rootStore) {
    return null
  }

  return (

    <RootStoreProvider value={rootStore} history={history}>
      <div className="app row">
            <Routes>
              <Route path="/photos" element={<PhotosList />} />
              {/* <Route index path="users" element={<UserList />} /> */}
            </Routes>
        
      </div>    
    </RootStoreProvider>
  );
}

export default App;
