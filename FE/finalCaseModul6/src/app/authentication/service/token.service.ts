import { Injectable } from '@angular/core';
const TOKEN_KEY = 'Token_key';
const NAME_KEY = 'Name_key';
const ROLE_KEY = 'Role_key';
const AVATAR_KEY = 'Avatar_key';
const USERNAME_KEY = 'Username_key';
const ID_KEY = 'Id_key';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private roles: Array<string> = [];
  constructor() { }

  // tslint:disable-next-line:typedef
  public setAvartar(avatar: string){
    window.sessionStorage.removeItem(AVATAR_KEY);
    window.sessionStorage.setItem(AVATAR_KEY, avatar);
  }
  public getAvatar(): string {
    // @ts-ignore
    return window.sessionStorage.getItem(AVATAR_KEY);
  }

  public setToken(token: string){
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string{
    // @ts-ignore
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
  public getId(): string{
    // @ts-ignore
    return window.sessionStorage.getItem(ID_KEY);
  }
  public setId(id: number){
    window.sessionStorage.removeItem(ID_KEY);
    // @ts-ignore
    window.sessionStorage.setItem(ID_KEY,id);
  }

  // tslint:disable-next-line:typedef
  public setUserName(username: string){
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
  public getUserName(): string{
    // @ts-ignore
    return window.sessionStorage.getItem(USERNAME_KEY);
  }

  public setName(name: string){
    window.sessionStorage.removeItem(NAME_KEY);
    window.sessionStorage.setItem(NAME_KEY, name);
  }
  public getName(): string {
    // @ts-ignore
    return window.sessionStorage.getItem(NAME_KEY)
  }
  public setRoles(roles: string[]){
    window.sessionStorage.removeItem(ROLE_KEY);
    window.sessionStorage.setItem(ROLE_KEY,JSON.stringify(roles));
  }
  // @ts-ignore
  public getRoles(): string[]{
    this.roles = [];
    if(sessionStorage.getItem(TOKEN_KEY)){
      // @ts-ignore
      JSON.parse(sessionStorage.getItem(ROLE_KEY)).forEach(role =>{
        this.roles.push(role.authority);
      })
      return this.roles
  }

}
}
