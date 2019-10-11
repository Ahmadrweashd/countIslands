import { Component, OnInit, Inject } from '@angular/core';
import { IssueService } from 'src/app/issue.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog ,MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = [];

  constructor( private snackbar: MatSnackBar,private issueService:IssueService, public dialog: MatDialog) { 
  }

  ngOnInit() {
    this.getDataFromServer();
  }
  deleteRow(id){
    this.issueService.deleteIssue(id).subscribe((data)=>{
      console.log(data)
      this.getDataFromServer();
      this.getDataFromServer();
      this.snackbar.open("Removed", "close", {
        duration: 1000
      })
    })
  }

   getDataFromServer(){
    this.issueService.getIslands(0).subscribe((data) => {
      this.data = data;
    })
   }
   createDefault(){
    this.issueService.addIsland(new Date(),'[[0,0,0],[0,0,0],[0,0,0]]').subscribe((data) => {
      console.log("default matrix was added");
      this.getDataFromServer();
      this.snackbar.open("Default Matrix Was Added Succesfully", "close", {
        duration: 1000
      })

    })
  }
  create() {
    const dialogRef = this.dialog.open(CreateDialog, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log();
      this.getDataFromServer();
    });
  }
}


@Component({
  selector: 'create',
  templateUrl: 'create.html',
})
export class CreateDialog {
  constructor(
    private issueService:IssueService,
    public dialogRef: MatDialogRef<CreateDialog>,
    private snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

   noThanks(): void {
    this.dialogRef.close();
   }
  createNewMatrix(matrix) {
   console.log(matrix);
   this.issueService.addIsland(new Date(), matrix).subscribe((data) => {
 })
    this.dialogRef.close();
    this.snackbar.open("New Matrix Was Added Succesfully", "close", {
      duration: 1000
    })
  }


}