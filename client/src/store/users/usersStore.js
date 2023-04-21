import { makeAutoObservable} from "mobx"
import { getUsers as getUsersAPI, getDoctors as getDoctorsAPI, getClients as getClientsAPI} from "../../components/api/api"

export class UsersStore {
    
    users = []
    isLoading = true

    constructor() {
        makeAutoObservable(this)
    }
    
    setUsers(users) {
        this.users = users
    }
    
    setLoading(isLoading) {
        this.isLoading = isLoading
    }

    async getUsers() {
        
        this.setLoading(true)
        const result = await getUsersAPI()
        const users = result.data
        
        this.setUsers(users)
        this.setLoading(false);

    }

    async getDoctors() {
        
        this.setLoading(true)
        const result = await getDoctorsAPI()
        const doctors = result.data
        
        this.setUsers(doctors)
        this.setLoading(false);

    }

    async getClients() {
        
        this.setLoading(true)
        const result = await getClientsAPI()
        const clients = result.data
        
        this.setUsers(clients)
        this.setLoading(false);

    }
}

