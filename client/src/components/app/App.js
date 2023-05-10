import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import Authorization from '../authorization/authorization';
import { RootStoreProvider, RootStore } from '../../store/rootstore';
import { Routes, Route, Navigate} from "react-router-dom";
import { history } from '../../history/history';
import './App.css';
import DiarysList from '../diary/Diary';
import AssignClients from '../AdminFunction/DoctorList/AssignClients/AssignClients';
import DiarysClientList from '../DiaryClient/DiaryClient';
import DoctorsList from '../AdminFunction/DoctorList/DoctorsList';
import CreateDoctor from '../AdminFunction/CreateDoctor/CreateDoctor';
import ClientList from '../AdminFunction/ClientsList/ClientList';

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
          {/* <HeaderAdmin/> */}
          {/* <Header/> */}

            <Routes>
              {/* <Route path="photos" element={<PhotosList />} /> */}
              <Route index path="diary" element={<DiarysList />} />
              <Route path='doctors-list' element={<DoctorsList/>} />
              <Route path="doctors-list/:idDoctor" element={<AssignClients doctor={true} />} />
              <Route path="create-doctor" element={<CreateDoctor/>} />
              <Route path="clients" element={<ClientList/>} />
              <Route path="clients/:telegramIdClient" element={<DiarysList/>} />
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
