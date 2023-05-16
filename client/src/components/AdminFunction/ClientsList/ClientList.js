import { observer } from 'mobx-react-lite'
import { useStores} from '../../../store/rootstore'
import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

const ClientList = observer (() => {
        
    const [updateClients] = useState(0)

    const store = useStores()
    const clients = store.usersStore.users
    

    useEffect(() => {
        store.usersStore.getClients()
    }, [updateClients])

    return (
        <div className="admin-function container">
            <ul class="list-group">
                {
                    clients.map((client) => {
                        return (
                            <NavLink to={`/clients/${client.telegramId}`}>
                                <li class="list-group-item">
                                    {client.username}
                                </li> 
                            </NavLink>
                        )
                    })
                }
            </ul>
        </div>
    )
})

export default ClientList