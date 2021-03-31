import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Tracker} from './tracker.interface'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  constructor(public http:HttpClient) { }

  storett(tt:any){
    this.http.post("http://localhost:3000/tracker",tt).
    subscribe(result=>console.log(result),error=>console.log(error));
  }

  gettt()
  {
    //this.http.get("http://localhost:3000/tracker").subscribe()
    return this.http.get<any[]>("http://localhost:3000/tracker").pipe(map(data=>data));
  }

  


  
}
