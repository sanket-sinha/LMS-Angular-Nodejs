import { Component, OnInit } from '@angular/core';
import { AnnoucementService } from '../shared/annoucement.service';
import { Annoucement } from '../shared/annoucement.model';

@Component({
  selector: 'app-annoucement',
  templateUrl: './annoucement.component.html',
  styleUrls: ['./annoucement.component.css']
})
export class AnnoucementComponent implements OnInit {
  showSucessMessage: boolean;
  showDeleteMessage: boolean;
  serverErrorMessages: any;
  today = new Date();
  constructor(private annoucementService: AnnoucementService) { }
  allannoucement: Array<Annoucement>=[]
  annoucement: Annoucement = {
    _id:"",
    title:"",
    description:"",
    date: this.today
  };
  ngOnInit() {
    this.refreshList();
  }

  postAnnoucement(){
    this.annoucement.date = this.today;
    this.annoucementService.postAnnoucement(this.annoucement).subscribe(
      res => {
        this.showSucessMessage = true;
        this.refreshList();
        setTimeout(() => this.showSucessMessage = false, 4000);
        
      },
      err => {
        console.log(err);
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
  
          this.serverErrorMessages = 'Something went wrong in upadate.';
      }
      
    );
  }

  clearform(){
    this.annoucement.title="";
    this.annoucement.description="";
  }

  refreshList(){
    this.clearform();
    this.annoucementService.getAllAnnoucement().subscribe(
      res=> { 
        this.allannoucement=res as Annoucement[];
        this.allannoucement.reverse();
      },
      err=> { console.log(err); }
    );
  }

  onDelete(id){
    if(confirm("are you sure to delete this record?")==true){
      this.annoucementService.deleteAnnoucement(id).subscribe(
        res=>{
          this.showDeleteMessage = true;
          setTimeout(() => this.showDeleteMessage = false, 4000);
          this.refreshList();
        },
        err => {
          console.log(err);
          if (err.status === 422) {
            this.serverErrorMessages = err.error.join('<br/>');
          }
          else
    
            this.serverErrorMessages = 'Something went wrong in upadate.';
        }
      );
    }
    
  }

}
