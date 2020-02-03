import { Component, OnInit } from '@angular/core';
import html2canvas from 'html2canvas';
import * as jsPDF from 'jspdf';
import { CertificateService } from '../shared/certificate.service';

@Component({
  selector: 'app-get-certificate',
  templateUrl: './get-certificate.component.html',
  styleUrls: ['./get-certificate.component.css']
})
export class GetCertificateComponent implements OnInit {

  constructor(private course: CertificateService) { }

  certificate={
    coursename: String,
    studentname: String,
    date: String
  };

  ngOnInit() {
    this.certificate=this.course.certificate;
  }


  onClick(){
    var doc = new jsPDF({ orientation: 'l'});
    var imgData= html2canvas(document.getElementById('content'));
    imgData.then(canvas=>{
      var img=canvas.toDataURL("image/png");
      var a=document.createElement('a');
      a.href=img;
      a.download=this.certificate.coursename+".png";
      a.click()
      doc.addImage(img,'JPEG',0,0,774,548);
      doc.save(this.certificate.coursename+'.pdf');
    });
  }
  
}
