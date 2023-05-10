import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { useStores } from '../../../store/rootstore'; 
import { NavLink } from 'react-router-dom';

const DoctorsList = observer (() => {
    
    const [updateDoctors] = useState(0)

    const store = useStores()
    const doctors = store.usersStore.users
    
    useEffect(() => {
        store.usersStore.getDoctors()
    }, [updateDoctors])

    return (
        
        <div className="admin-function container">
            
            <div className="doctors">
                <ul className="list-group">
                    {doctors.map((doctor) => {
                        return (
                            <NavLink to={`/doctors-list/${doctor.id}`} doctor={doctor.username}>
                                <div className="list-group-item list-group-item-action" aria-current="true">
                                    {doctor.username}
                                </div>                
                            </NavLink>
                        )
                    })}
                    
                </ul>
            </div>
        </div>
    )
})

export default DoctorsList