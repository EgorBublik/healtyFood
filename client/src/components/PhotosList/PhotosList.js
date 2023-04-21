import { observer } from 'mobx-react-lite'
import { useStores } from '../../store/rootstore'; 
import { useEffect, useState } from 'react';
import './PhotosList.css'

const PhotosList = observer(() => {
    const [updatePhotos, setUpdatePhotos] = useState(0)

    const store = useStores()
    const photos = store.photoStore.photos
    
    useEffect(() => {
        store.photoStore.getPhotos()
    }, [updatePhotos])
    
    return (

        <div className="App">
            <div className='container'>
                <div className="header row d-flex justify-content-around">
                <div className="col-2">
                    <button type="button" className="header-btn btn btn-outline-primary">Информация</button>
                </div>
                <div className="col-2">
                    <button type="button" className="header-btn btn btn-outline-primary">Сон</button>
                </div>
                <div className="col-2">
                    <button type="button" className="header-btn btn btn-outline-primary">Еда</button>
                </div>    
                </div>
                <div className="image-block">
                    {photos.map((photo, index) => {
                        return (
                            <div className='col-10 row'>
                                <div className='col-4'>
                                    <img className='.img-thumbnail' width="350" height="300" src={`${photo.fileName}.jpg`} alt='food'/>
                                </div>
                                <div className='col-6'>
                                    <span> UserName: {photo.username}</span>
                                </div>
                            </div>        
                        )
                    })}
                </div>
            </div>
            
        </div>
    )
})

export default PhotosList