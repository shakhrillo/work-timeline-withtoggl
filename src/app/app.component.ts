import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private token:string = '8bd821127979c5cb1188000df1ee8cbd';
  public user;
  public userWeekReport;
  selectedWorkSpace:number = 0;
  constructor(private core: AppService){
    this.core.authUser(this.token).subscribe((res:any)=>this.user=res.data);
  }
  
  getInfo(id){
    this.core.infoWeek(this.token, id).subscribe((res:any)=>this.userWeekReport=res);
  }
  startTheProject(id, description){
    this.core.startPorject(this.token, id, description)
    .subscribe(console.log);
  }
}
