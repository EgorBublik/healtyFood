import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/rootstore'; 
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {format, startOfWeek, endOfWeek, previousMonday, nextMonday, startOfDay} from 'date-fns'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './diaryClient.css'

const DiarysClientList = observer(() => {
    
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    
    const [updatePhotos] = useState(0)

    const store = useStores()
    const photos = store.photoStore.photos
    // const { idClient } = useParams()

    const [show, setShow] = useState({
        state: false,
        fileName: ''
    });

    const handleClose = () => setShow({state: false});
    const handleShow = (e) => setShow({state: true, fileName : e.target.src});

    useEffect(() => {
        console.log('telegsdfsefsfd', window.Telegram.WebApp)
        store.photoStore.getPhotosUser(window.Telegram.WebApp.initDataUnsafe.user.id)
    }, [updatePhotos])

    useEffect(() => {
        getDatesOfWeek(new Date())
    }, [])


    const filterPhotos = photos.filter((photo) => {
        return new Date(photo.date).getTime() >= startDate.getTime() && new Date(photo.date).getTime() <= endDate.getTime() + 24 * 60 * 60 * 1000
    })    
    
    const sortedImages = filterPhotos.reduce((acc, image) => {
        const date = format(new Date(image.date), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(image)
        return acc
    }, {}) 

    const getDatesOfWeek = (date) => {

        const startWeek = startOfWeek(date, { weekStartsOn: 1 });
        let endWeek = endOfWeek(date, {weekStartsOn: 1});
        if(endWeek >= date){
            endWeek = new Date(date.getFullYear(), date.getMonth(), date.getDate(), endWeek.getHours(), endWeek.getMinutes(), endWeek.getSeconds());
        }
        setStartDate(startWeek)
        setEndDate(endWeek)

        return;
    }
   
    const rangeWeek = (func) => {
        switch(func) {
            case 'prev':         
                setStartDate(previousMonday(startDate))
                setEndDate(endOfWeek(previousMonday(startDate), {weekStartsOn: 1}))
            break;

            case 'next':
                if (nextMonday(startDate) >= new Date()){
                    break;
                } else {
                    setStartDate(nextMonday(startDate))
                    setEndDate(endOfWeek(nextMonday(startDate), {weekStartsOn: 1}))
                }
            break;
        }
    }

    const getDays = (day) => {
        switch (day) {
            case 0: 
                return "Воскресенье"
            case 1: 
                return "Понедельник"
            case 2: 
                return "Вторник"
            case 3: 
                return "Среда"
            case 4: 
                return "Четверг"
            case 5: 
                return "Пятница"
            case 6: 
                return "Суббота"
            
        }
    }

    return (

        <div className="diary container">
            <div className='date-switcher'>
                <div className="date-switcher btn-group" role="group">
                    <button className="btn btn-secondary" type="button" onClick={() => rangeWeek('prev')}> {'<'} </button>
                    <button className="btn btn-outline-secondary middle-button" type="button" >
                        {
                           startOfDay(new Date()) > new Date(startDate) ? 
                            `${new Date(startDate).toLocaleDateString('ru-RU')} — ${new Date(endDate).toLocaleDateString('ru-RU')}` 
                            : new Date(startDate).toLocaleDateString('ru-RU')
                        } 
                    </button>
                    <button className="btn btn-secondary" type="button" onClick={() => rangeWeek('next')}> {'>'} </button>
                </div>
            </div>        
            <>
                <Modal show={show.state} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Что-то если надо</Modal.Title>
                    </Modal.Header>
                    
                    <Modal.Body>
                        
                        <img className='food-picture-modal-img' src={show.fileName} alt='food'/>
                        <div>
                            <div className="card-header">
                                Комментарии:
                            </div>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>User: </b>
                                    Cras justo odio
                                </li>
                                <li className="list-group-item">
                                    <b>Doctor: </b>
                                    Dapibus ac facilisis in
                                </li>

                                <li className="list-group-item">
                                    <textarea style={{width: '100%'}} defaultValue='1223'/>
                                    <div>
                                        <button className="btn btn-primary">Добавить</button>
                                    </div>
                                </li>
                            </ul>
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
            <div className='diary-group-items'>
                {
                    Object.keys(sortedImages).map(date => (
                        <div key={date} className='diary-items'>
                            <h2>{getDays(new Date(date).getDay())}, {new Date(date).getDate()}.{new Date(date).getMonth() < 9 ? `0${new Date(date).getMonth()}` : new Date(date).getMonth()}</h2>
                            <div className='food-pictures'>
                                {sortedImages[date].map(image => (
                                    <div key={image.id} className='food-picture'>
                                        <img className='food-picture-img' onClick={handleShow} src={`http://localhost:4001/images/${image.fileName}.jpg`} alt='food'/>
                                        <div className="time-bg"></div>
                                        <div className="time">{new Date(image.date).getHours()}:{new Date(image.date).getMinutes()}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
                
            </div>
        </div>
    )

})

export default DiarysClientList