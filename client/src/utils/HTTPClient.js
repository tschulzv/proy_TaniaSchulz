import axios from "axios";

class HTTPClient {
    constructor(){
        this.instance = axios.create({
            baseURL: "http://localhost:8000"
        })
    }

    // USER DATA
    getUser() {
        return this.instance.get("/user");
    }

    editUser(data){
        return this.instance.put("/user/edit", data);
    }

    // SESSIONS
    getSessions(){
        return this.instance.get("/sessions/")
    }

    getTodaySessions(){
        return this.instance.get("/sessions/today")
    } 

    createSession(data){
        return this.instance.post("/sessions/create", data);
    }

    // RESOURCES
    getrResources(){
        return this.instance.get("/resources/")
    }

    getOneResource(id){
        return this.instance.get("/resources/"+id);
    }

    editResource(id, data){
        return this.instance.put("/resources/"+id+"/edit", data);
    }

    createResource(data){
        return this.instance.post("/resources/create", data);
    }


}   

export default HTTPClient;
