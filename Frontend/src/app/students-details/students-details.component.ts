import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-students-details',
  templateUrl: './students-details.component.html',
  styleUrls: ['./students-details.component.css']
})
export class StudentsDetailsComponent implements OnInit {

  allStudentsData: Array<User>=[];
  filterQuery="";
  rowsOnPage = 10;
  sortBy = "start date";
  sortOrder = "asc";
  today = Date();

  constructor(private userService: UserService ) { }

  ngOnInit() {
    this.userService.getStudents().subscribe(res=>{
      this.allStudentsData=res as User[];
    },
    err=>{
      console.log(err);
    });
  }


  print(){
    var filename='Student Details '+  this.today + '.xlsx';
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.allStudentsData);
    const workBook: XLSX.WorkBook = { Sheets: { 'data': worksheet },SheetNames:['data']};
    XLSX.writeFile(workBook, filename);
  }
}
