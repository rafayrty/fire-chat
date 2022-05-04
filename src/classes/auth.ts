export default class Auth{

    private user: Object;

    constructor(){
        this.user = {};
    }

    public fetchUser(){
        if(Object.keys(this.user).length===0){
            this.user = localStorage.getItem('user') ?? {};
            if(Object.keys(this.user).length===0) return null;
        }
        return this.user;
    }

    set addUser(value:Object){
        localStorage.setItem('user',JSON.stringify(value));
        this.user = value;
    }

}