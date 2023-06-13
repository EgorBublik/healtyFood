import { makeAutoObservable, observable} from "mobx"
import axios from "axios"

export class AuthStore {
    
    username
    token = ''
    role

    constructor() {
        makeAutoObservable(this)
        this.loadTokenFromLocalstorage()
    }

    setToken(token) {
        if (!token) return
        this.token = token
        localStorage.setItem("token", token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } 

    setUsername(username) {
        this.username = username
    }

    setRole(role) {
        this.role = role
        localStorage.setItem("role", role);
    }

    loadTokenFromLocalstorage() {
        const token = localStorage.getItem("token")
        const role = localStorage.getItem("role")        
        this.setToken(token)
        this.setRole(role)
    }
}

