import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Authorization from '../authorization/authorization';
import AdminFunction from '../AdminFunction/AdminFunction'
import { RootStoreProvider, RootStore } from '../../store/rootstore';
import { Routes, Route, Navigate} from "react-router-dom";
import { history } from '../../history/history';
import './App.css';
import DiarysList from '../diary/Diary';
import AssignClients from '../AdminFunction/AssignClients/AssignClients';
import DiarysClientList from '../DiaryClient/DiaryClient';

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
        <Routes>
        </Routes>

        {isLoggedIn && <>
          <Header/>

            <Routes>
              {/* <Route path="photos" element={<PhotosList />} /> */}
              <Route index path="diary" element={<DiarysList />} />
              <Route path="admin-function" element={<AdminFunction/>} />
              <Route path="assignClients/:idDoctor" element={<AssignClients doctor={true} />} />

            </Routes>
          </>
        } 
        
        {!isLoggedIn && <>
            <Routes>
              <Route index path="auth" element={<Authorization />} />
              <Route path='diary-client/' element={<DiarysClientList/>}/>
              <Route index path="*" element={<Navigate to="./auth"/>} />
            </Routes>
          </>
        }
        
        
            
        
      </div>    
    </RootStoreProvider>
  );
}

export default App;
