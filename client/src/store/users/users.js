import { makeAutoObservable } from "mobx"

export class Users {
    constructor() {
        makeAutoObservable(this)
    }
}