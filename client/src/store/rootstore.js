import { PhotoStore } from "./photo/photoStore";
import { useContext, createContext } from "react";

export class RootStore {
    
    constructor() {    
        this.photoStore = new PhotoStore(this)
    }
}

const RootStoreContext = createContext({});
export const RootStoreProvider = RootStoreContext.Provider;
export const useStores = () => useContext(RootStoreContext);