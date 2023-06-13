import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import { RootStoreProvider, RootStore } from '../../store/rootstore';
import { Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { history } from '../../history/history';
import Header from '../Header/Header';
import HeaderAdmin from '../HeaderAdmin/HeaderAdmin';
import Authorization from '../authorization/authorization';
import DiariesList from '../diary/Diary';
import AssignClients from '../AdminFunction/DoctorList/AssignClients/AssignClients';
import DiariesClientList from '../DiaryClient/DiaryClient';
import DoctorsList from '../AdminFunction/DoctorList/DoctorsList';
import CreateDoctor from '../AdminFunction/CreateDoctor/CreateDoctor';
import ClientList from '../AdminFunction/ClientsList/ClientList';
import './App.css';

const App = observer(() => {

  const [rootStore, setRootStore] = useState()


  useEffect(() => {
    setRootStore(new RootStore())
  }, [])

  useEffect(() => {
    rootStore?.authStore?.loadTokenFromLocalstorage()
  }, [rootStore])

  if (!rootStore) {
    return null
  }

  const isLoggedIn = Boolean(rootStore.authStore.token)
  
  const isAdmin = rootStore.authStore.role === 'admin'
  const isDoctor = rootStore.authStore.role === 'doctor'
  console.log('rootstore: ', rootStore)
  
  return (

    <RootStoreProvider value={rootStore} history={history}>
      <div className="app">

        { isAdmin && 
          <>
            <HeaderAdmin/>

            <Routes>
              <Route index path="diary" element={<DiariesList />} />
              <Route path='doctors-list' element={<DoctorsList/>} />
              <Route path="doctors-list/:idDoctor" element={<AssignClients doctor={true} />} />
              <Route path="create-doctor" element={<CreateDoctor/>} />
              <Route path="clients" element={<ClientList/>} />
              <Route path="clients/:telegramIdClient" element={<DiariesList/>} />
            </Routes>
          </>
        }

        {isDoctor && 
         <>
            <Header/>

            <Routes>
              <Route index path="diary" element={<DiariesList />} />
              <Route path="clients" element={<ClientList/>} />
              <Route path="clients/:telegramIdClient" element={<DiariesList/>} />
            </Routes>
         </>
        } 
        
        {!isLoggedIn && <>
            <Routes>
              <Route index path="auth" element={<Authorization />} />
              <Route path='diary-client/' element={<DiariesClientList/>}/>
              <Route index path="*" element={<Navigate to="./auth"/>} />
            </Routes>
          </>
        }
        
      </div>    
    </RootStoreProvider>
  );
})

export default App;
