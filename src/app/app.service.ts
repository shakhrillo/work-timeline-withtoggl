import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
declare var Buffer:any;
@Injectable()
export class AppService {

    constructor(private http:HttpClient) { }

    authUser(token){
        return this.http.get(`https://www.toggl.com/api/v8/me`, {
            headers: {
				Authorization: `Basic ${new Buffer(`${token}:api_token`, 'utf8').toString('base64')}`
			}
        })
    }
    infoWeek(token, id){
        return this.http.get(`https://toggl.com/reports/api/v2/details`, {
            headers: {
				Authorization: `Basic ${new Buffer(`${token}:api_token`, 'utf8').toString('base64')}`
            },
            params:{
                workspace_id:id,
                user_agent:'mr.jhon1327@gmail.com'
            }
        })
    }
    startPorject(token, id, description){
        return this.http.post(`https://www.toggl.com/api/v8/time_entries/start`, {
            time_entry:{
                wid:id,
                description:description,
                created_with:"Shakhrillo"
            }
        },{
            headers: {
				Authorization: `Basic ${new Buffer(`${token}:api_token`, 'utf8').toString('base64')}`
            }
        })
    }
    getAgileBoards(){
        let url = 'https://mobiledev.myjetbrains.com/youtrack/rest/admin/agile';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Access-Control-Allow-Origin': 'http://localhost:4200/',
              'Access-Control-Allow-Methods': 'GET'
            })
        };
        return this.http.get(url);
    }
}