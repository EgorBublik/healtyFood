import { AuthStore } from "./auth/authStore";
import { PhotoStore } from "./photo/photoStore";
import { UsersStore } from "./users/usersStore"
import { useContext, createContext } from "react";

export class RootStore {
    
    constructor() {    
        this.photoStore = new PhotoStore(this)
        this.usersStore = new UsersStore(this)
        this.authStore = new AuthStore(this)
    }
}

const RootStoreContext = createContext({});
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);