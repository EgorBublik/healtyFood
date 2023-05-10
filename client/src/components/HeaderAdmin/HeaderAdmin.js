import './headerAdmin.css'
import {DropdownButton, Dropdown} from 'react-bootstrap'
import { logOut } from '../api/api';
import { NavLink } from 'react-router-dom';


const HeaderAdmin = () => {
    return (
        <div className="header ">
            <div className="row">
                <div className="left-header col-6 ">
                    <DropdownButton title={'Меню '}>
                        
                        <Dropdown.Item eventKey="1">
                            <NavLink to={`/clients`}>
                                Список клиентов
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Item eventKey="2">
                            <NavLink to={`/doctors-list`}>
                                Назначение клиента
                            </NavLink>
                        </Dropdown.Item>

                        <Dropdown.Item eventKey="3">
                            <NavLink to={`/create-doctor`}>
                                Создание доктора
                            </NavLink>
                        </Dropdown.Item>
                        
                    </DropdownButton>
                </div>


                <div className="right-header col-5">
                    <button type="button" className="btn btn-outline-danger" onClick={logOut}>Выход</button>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin