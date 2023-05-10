import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react';
import { useStores } from '../../../../store/rootstore'; 
import { useParams, useNavigate } from 'react-router-dom';
import { assignPatientToDoctor, deleteAssignPatientToDoctor } from '../../../api/api';

const AssignClients = observer(() => {

    const [updateClients, setUpdateClients] = useState(0)
    const store = useStores()
    const navigate = useNavigate()
    const clients = store.usersStore.users
    const { idDoctor } = useParams()

    const pushBtn = (action, clientId) => {
        switch (action) {
            case 'delete': 
                deleteAssignPatientToDoctor(idDoctor, clientId)
                navigate('/doctors-list')
                break;
            case 'add':
                assignPatientToDoctor(idDoctor, clientId)
                navigate('/doctors-list')                
                break;
        }
    }
    
    useEffect(() => {
        store.usersStore.getClients()
    }, [updateClients])
    
    return (
        <div className="container">
            {clients.map((client) => (
                <div className="row">
                    <div className="col-1">
                        <h5>{client.username}</h5> 
                    </div>
                    <div className="col-3">                        
                        {
                            client.doctor?.id == idDoctor && <button type="button" onClick={() => pushBtn('delete', client.id)} class="btn btn-danger">Удалить</button>                            
                        }
                        {
                            client.doctor?.id != idDoctor && <button type="button" onClick={() => pushBtn('add', client.id)} class="btn btn-success">Добавить</button>                            
                        }
                    </div>
                </div>
            ))}
        </div>
    )
})

export default AssignClients