import { makeAutoObservable } from "mobx"

export class Photo {
    constructor() {
        makeAutoObservable(this)
    }
}