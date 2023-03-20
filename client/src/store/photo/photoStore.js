import { makeAutoObservable} from "mobx"
import { getPhotos as getPhotosAPI} from "../../components/api/api"

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
    // setCarriers(carriers) {
    //     this.carriers = carriers
    // }

    // setLoading(isLoading) {
    //     this.isLoading = isLoading
    // }

    

    // async removeCarrier(id) {
    //     deleteCarrierAPI(id)
    // }

    // allCarriers() {
    //     return this.carriers
    // } 
}

