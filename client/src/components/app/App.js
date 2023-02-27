import { useEffect, useState } from 'react';
import PhotosList from '../PhotosList/PhotosList';
import Authorization from '../authorization/authorization';
import { RootStoreProvider, RootStore } from '../../store/rootstore';
import { Routes, Route, Navigate} from "react-router-dom";
import { history } from '../../history/history';
import './App.css';

const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"))
  const [rootStore, setRootStore] = useState()

  useEffect(() => {
    localStorage.getItem("token") ? setIsLoggedIn(true) : setIsLoggedIn(false)
  })

  useEffect(() => {
    setRootStore(new RootStore())
  }, [])

  if (!rootStore) {
    return null
  }

  return (

    <RootStoreProvider value={rootStore} history={history}>
      <div className="app">
        
        {isLoggedIn && <>
            <Routes>
              <Route path="photos" element={<PhotosList />} />
              {/* <Route path="/authorization" element={<Authorization />} /> */}
            </Routes>
          </>
        }
        
        {!isLoggedIn && <>
            <Routes>
              <Route index path="auth" element={<Authorization />} />
              <Route index path="*" element={<Navigate to="./auth"/>} />
            </Routes>
          </>
        }
            
        
      </div>    
    </RootStoreProvider>
  );
}

export default App;
