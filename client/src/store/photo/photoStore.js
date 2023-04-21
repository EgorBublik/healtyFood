import { makeAutoObservable} from "mobx"
import { getPhotos as getPhotosAPI, getPhotosUser as getPhotosUserAPI} from "../../components/api/api"

export class PhotoStore {
    
    photos = []
    isLoading = true

    constructor() {
        makeAutoObservable(this)
    }
    
    setPhotos(photos) {
        this.photos = photos
    }
    
    setLoading(isLoading) {
        this.isLoading = isLoading
    }

    async getPhotos() {
        
        this.setLoading(true)
        const result = await getPhotosAPI()
        const photos = result.data
        
        this.setPhotos(photos)
        this.setLoading(false);

    }

    async getPhotosUser(idClient) {
        console.log(idClient)
        this.setLoading(true)
        const result = await getPhotosUserAPI(idClient)
        const photos = result.data
        
        this.setPhotos(photos)
        this.setLoading(false);

    }

}

