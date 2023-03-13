import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/rootstore'; 
import { useEffect, useState } from 'react';
import {format, getMinutes} from 'date-fns'
import './diary.css'

const DiarysList = observer(() => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    
    const [updatePhotos, setUpdatePhotos] = useState(0)

    const store = useStores()
    const photos = store.photoStore.photos
    
    useEffect(() => {
        store.photoStore.getPhotos()
    }, [updatePhotos])

    useEffect(() => {
        lastWeek()
    }, [])
    

    const filterPhotos = photos.filter((photo) => {
        return new Date(photo.dateTime).getTime() >= startDate.getTime() && new Date(photo.dateTime).getTime() <= endDate.getTime() + 24 * 60 * 60 * 1000
    })    
    
    const sortedImages = filterPhotos.reduce((acc, image) => {
        const date = format(new Date(image.dateTime), 'yyyy-MM-dd');
        if (!acc[date]) {
            acc[date] = []
        }
        acc[date].push(image)
        return acc
    }, {}) 
    

    function lastWeek (dateStr) {
        if (!dateStr) dateStr = new Date().getTime();
        var dt = new Date(dateStr);
        dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        dt = new Date(dt.getTime() - (dt.getDay() > 0 ? (dt.getDay() - 1) * 1000 * 60 * 60 * 24 : 6 * 1000 * 60 * 60 * 24));
        var endDate = new Date(dt.getTime() + 1000 * 60 * 60 * 24 * 7 - 1);
        var dt1 = new Date(dateStr)
        if(endDate >= new Date()){
            endDate = new Date(dt1.getFullYear(), dt1.getMonth(), dt1.getDate(), endDate.getHours(), endDate.getMinutes(), endDate.getSeconds());
        }
        console.log(endDate)
        setStartDate(dt)
        setEndDate(endDate)
        return
    }

    const getDays = (day) => {
        switch (day) {
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
            case 7: 
                return "Воскресенье"
        }
    }

    const rangeWeek = (func) => {
        
        var dateStr = new Date().getTime();
        var dt = new Date(dateStr);
        dt = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
        var end = new Date(endDate);
        var start = new Date(startDate)
        
        switch(func) {
            case 'prev': 
                if (dt.getDay() > 0 ) {
                    var start = start.setTime(start.getTime() - (60 * 60 * 24 * 1000 * 7))
                    var start = new Date(start)
                    var end = end.setTime(end.getTime() - (60 * 60 * 24 * 1000 * dt.getDay()))
                    var end = new Date(end)
                }    
                break;

            case 'next':
                if (end >= dt){
                    break;
                } else {
                    var start = start.setTime(start.getTime() + (60 * 60 * 24 * 1000 * 7))
                    var start = new Date(start)
                    var end = end.setTime(end.getTime() + (60 * 60 * 24 * 1000 * dt.getDay()))
                    var end = new Date(end)
                }
                break;
        }
        
        setStartDate(start)
        setEndDate(end)
    }

    return (

        <div className="diary">
            <div className='container'>
                <div className="date-switcher btn-group" role="group" aria-label="Basic example">
                    <button type="button" onClick={() => rangeWeek('prev')} className="btn btn-secondary"> {'<'} </button>
                    <button type="" className="btn-secondary">{new Date(startDate).toLocaleDateString('ru-RU')} — {new Date(endDate).toLocaleDateString('ru-RU')} </button>
                    <button type="button" onClick={() => rangeWeek('next')} className="btn btn-secondary"> {'>'} </button>
                </div>

                <div className='diary-items'>
                    {
                        Object.keys(sortedImages).map(date => (
                            <div key={date}>
                                <h2>{getDays(new Date(date).getDay())}</h2>
                                <div>
                                    {sortedImages[date].map(image => (
                                        // <div className=''>
                                            <img className='.img-thumbnail' width="350" height="300" src={`http://localhost:4001/images/${image.fileName}.jpg`} alt='food'/>
                                        // </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>        
        </div>
    )

})

export default DiarysList