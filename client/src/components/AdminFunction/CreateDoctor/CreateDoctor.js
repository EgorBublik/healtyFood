import { observer } from 'mobx-react-lite'
import { useForm } from "react-hook-form";
import { useState } from 'react'
import { createDoctor } from '../../api/api';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const CreateDoctor = observer (() => {
    
    const [errors, setErrors] = useState()
    const {register, handleSubmit } = useForm({});

    const [show, setShow] = useState({
        state: false,
        message: ''
    });

    const handleClose = () => setShow({state: false, message: ''});
    const handleShow = (message) => {
        setShow({state: true, message: message});
    }

    const create = async (data, e) => {
        await createDoctor(data)
            .then(handleShow('Доктор создан'))
            .catch(() => {
                handleShow('Что-то пошло не так')
                setErrors('Неправильный ввод данных')
            })
        // ???????????????????????????????????????????????????????????????????????????????????????????????????????????
    }

    return (
        
        <div className="admin-function container">
            <div className="create-doctor">
                <form className=''>
                    <div className="mb-3">
                        <label className="form-label">Логин доктора</label>
                        <input type="text" 
                            className="form-control new-post-label"
                            placeholder="Login"k
                            {...register('username', {required: 'Поле обязательное к заполению'})}
                            />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Пароль доктора</label>
                        <input type="password" 
                            className="form-control new-post-label"
                            placeholder="Password"
                            {...register('password', {required: 'Поле обязательное к заполению'})}
                            />
                    </div>
                    {errors && <p style={{color:'red'}}>{errors}</p>}
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit((data, e) => create(data, e))}>Создать</button>
                </form>

                <>
                    <Modal show={show.state} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Что-то если надо</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                            
                            <div className="message-create">
                                {show.message}
                            </div>
                        </Modal.Body>
                        
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleClose}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
            
        </div>
    )
})

export default CreateDoctor