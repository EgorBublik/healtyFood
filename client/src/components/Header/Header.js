import './header.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { logOut } from '../api/api'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/rootstore'
import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'

const Header = observer(() => {

    const [updateClients] = useState(0)

    const store = useStores()
    const clients = store.usersStore.users
    
    useEffect(() => {
        store.usersStore.getDoctors()

    }, [updateClients])
    

    return (
        <div className="header">
            <div className="row">
                <div className="left-header col-6 row">
                    <div className="qw">
                        {console.log(clients)}
                        <DropdownButton 
                            title={'Имя клиента '}>
                            {
                                clients.map((client, index) => {
                                    console.log('index ', index)
                                    return (
                                        <Dropdown.Item eventKey={index}>
                                            <NavLink to={`/clients/${client.telegramId}`}>
                                                {client.username}
                                            </NavLink>
                                        </Dropdown.Item>        
                                    )
                                })
                            }
                            
                        </DropdownButton>

                    </div>
                </div>
                    
                <div className="right-header col-6">
                    <button type="button" className="btn btn-outline-danger" onClick={logOut}>Выход</button>
                </div>
            </div>
        </div>
    )
})

export default Header