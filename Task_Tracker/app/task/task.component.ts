import { Component, OnInit } from '@angular/core';
import { TrackerService } from '../tracker.service';
@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent  implements OnInit{
  trackers: any= [];
  hasData : boolean = false;

  constructor(public ttracker:TrackerService) { }
 
  ngOnInit(){
    this.getData();
  }


  getData(){
    this.ttracker.gettt().subscribe((data: {})=>{
        console.log(data);
        this.trackers=data;
        this.hasData=true;
    })

  }

  storeData(pForm:any){
    console.log("<==========>",pForm,"<---------->")
    this.ttracker.storett(pForm);
  }
}
