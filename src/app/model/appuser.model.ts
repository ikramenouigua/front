import { ArrayType } from "@angular/compiler"

export class Appuser {
    id!:number
    firstName!:string
    lastName!:string
    adresse!:string
    phone!:string
    email!:string
    password!:string
    appUserRole!:string
    locked!:boolean
    enabled!:boolean
    username!:string
    authorities!:any
    accountNonExpired!:boolean
    credentialsNonExpired!:boolean
    accountNonLocked!:boolean

}
export enum State {
    init, 
    view, 
    edit, 
    create, 
    wait
  }