import './header.css'
import {DropdownButton, Dropdown, Button} from 'react-bootstrap'
import { logOut } from '../api/api'

const Header = () => {
    return (
        <div className="header ">
            <div className="row">
                <div className="left-header col-6 row">
                    <div className="qw">
                        <DropdownButton 
                            title={'Имя клиента '}>
                            
                            <Dropdown.Item eventKey="1" active>Клиент 1</Dropdown.Item>
                            <Dropdown.Item eventKey="2">Клиент 2</Dropdown.Item>
                            <Dropdown.Item eventKey="3">Клиент 3</Dropdown.Item>
                            
                        </DropdownButton>

                    </div>
                </div>
                    
                <div className="right-header col-6">
                    <button type="button" className="btn btn-outline-danger" onClick={logOut}>Выход</button>
                </div>
            </div>
        </div>
    )
}

export default Header