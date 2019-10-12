import {
  Component,
  OnInit
} from '@angular/core';

import {
  Router, ActivatedRoute
} from '@angular/router';
import {
  MatTableDataSource,
  MatSnackBar
} from '@angular/material';

import {
  Issue
} from '../../issue.model';
import {
  IssueService
} from '../../issue.service'

@Component({
  selector: 'app-matrix-lists',
  templateUrl: './matrix-lists.component.html',
  styleUrls: ['./matrix-lists.component.css']
})
export class MatrixListsComponent implements OnInit {
  issues: Issue[];
  matrixes = [];
  matrixinfo = [];
  isMatrixWorld=false;
  matrixType="World";
  displayedColumns = ['date', 'matrix', 'actions'];
  constructor(private route: ActivatedRoute, private issueService: IssueService, private router: Router, private snackbar: MatSnackBar) {


  }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.fetchIssues(id);
  }
  
  ////this function will get all the matrix from the server(mongoDB)
  ///and will create a new matrixInfo that saves the lengths of the matrixes 
  fetchIssues(id) {
    this.issueService.getIslands(id).subscribe((data) => {
      console.log(data);      
      this.issues = data;
      for (let i = 0; i < data.length; i++) {
        let tempMatrix = JSON.parse(data[i].matrix);
        this.matrixes.push(tempMatrix);
        let height = tempMatrix.length;
        let width = tempMatrix[0].length;
        console.log(height + "  " + width)
        let arr = [];
        arr.push(width)
        arr.push(height);
        this.matrixinfo.push(arr)
        console.log(arr)
      }
    })
  }

  modify(i, j, k) {
    if (this.matrixes[i][j][k] == 0) {
      this.matrixes[i][j][k] = 1;
    } else {
      this.matrixes[i][j][k] = 0;
    }

    this.issueService.UpdateIsland(this.issues[i]._id, new Date(), JSON.stringify(this.matrixes[i])).subscribe((data: any) => {
      this.snackbar.open("Succesfully updated", "close", {
        duration: 1000
      })
    }, error => {
      console.log(error);
    });
  }

  editIssue(id) {
    alert("Button is clicked");
    this.router.navigate([`/edit/${id}`]);
  }

  deleteIssue(id) {
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues(0);
    })
  }
  changeAlgorithm(){
    if(this.isMatrixWorld==true){
      this.isMatrixWorld=false;
      this.matrixType="World";
      this.snackbar.open("Normal Matrix", "close", {
        duration: 1000
      })
    }
    else{
      this.isMatrixWorld=true;
      this.matrixType="Normal";

      this.snackbar.open("World Matrix ", "close", {
        duration: 1000
      })
    }
  }
  getIslandCount(i) {
    if(this.isMatrixWorld==false) {
    return numIslands(this.matrixes[i]);
    }
    else{
    return numIslandsInWorld(this.matrixes[i]);
    }
  }
  max = 10;
  min = 1;
  step = 1;
  value = 20;
  changecols(value, index) {
    console.log(value + "  " + index);
    let message;
    if (value > this.matrixes[index][0].length) {
      let count = value - this.matrixes[index][0].length;
      message=count+ " columns was added by random values to the right side"
      for (let i = 0; i< this.matrixes[index].length; i++) {
        for (let j = 0; j < count; j++) {
          let val = Math.floor(Math.random() * Math.floor(2));
             this.matrixes[index][i].push(val);
        }
      }

    }else{
      let count =  this.matrixes[index][0].length -value;
      message= count+ " columns  was removed from the right side"
      for (let i = 0; i< this.matrixes[index].length; i++) {
        for (let j = 0; j < count; j++) {
          console.log(  this.matrixes[index][i]);
             this.matrixes[index][i].splice(-1,1);
        }
      }
    }
    this.issueService.UpdateIsland(this.issues[index]._id, new Date(), JSON.stringify(this.matrixes[index])).subscribe((data: any) => {
      this.snackbar.open(message , "close", {
        duration: 1500
      })
    }, error => {
      console.log(error);
    });

  }
  changerows(value, index) {
    let message; /// this value to display the relevant message ( removed or added a new rows)
    if (value > this.matrixes[index].length) {
      let count = value - this.matrixes[index].length;
      message=count+ " rows was added by random values to the bottom"
      for (let i = 0; i < count; i++) {
        let arr = [];
        for (let j = 0; j < this.matrixes[index][0].length; j++) {
          let val = Math.floor(Math.random() * Math.floor(2));
          arr.push(val);
        }
        this.matrixes[index].push(arr);
      }
    } else {
      let count =this.matrixes[index].length - value ; 
      message=count+ " rows was removed from bottom"

      for (let i = 0; i < count; i++) {
        this.matrixes[index].splice(-1, 1);
      }
  
    }
    this.issueService.UpdateIsland(this.issues[index]._id, new Date(), JSON.stringify(this.matrixes[index])).subscribe((data: any) => {
      this.snackbar.open(message , "close", {
        duration: 1500
      })
    }, error => {
      console.log(error);
    });

  }
}
let numIslandsInWorld = function(gridWorld) {
  let markIslandInWorld = function(grid, x, y, visited,displayIlands,count) {
    if(x < 0 || x > gridWorld.length - 1 || y < 0 || y > gridWorld[x].length - 1) {
      return;
    }
    if(visitedWorld[x][y] === true) {
      return;
    }
    if(!visited[x][y] && grid[x][y]=='1'){
      displayIlands[x][y]=count;
    }else{
      displayIlands[x][y]='W';

    }
    visitedWorld[x][y] = true;
    if(gridWorld[x][y] == '0') {
      return;
    }
    markIslandInWorld(gridWorld, x - 1, y, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x + 1, y, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x, y - 1, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x, y + 1, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x-1, y+1, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x +1,y+1, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x-1,  y-1,visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, x+1, y -1,visitedWorld,displayIlands,count);
    if(x==0){
      markIslandInWorld(gridWorld, gridWorld.length - 1, y, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld, gridWorld.length -1,y+1, visitedWorld,displayIlands,count);
    markIslandInWorld(gridWorld, gridWorld.length -1,y-1, visitedWorld,displayIlands,count);
    }
    if(x==gridWorld.length - 1){
      markIslandInWorld(gridWorld, 0, y, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld, 0,y+1, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld,0,y-1, visitedWorld,displayIlands,count);
    }
     if(y==0){
      markIslandInWorld(gridWorld, x, gridWorld[x].length - 1, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld, x-1, gridWorld[x].length - 1, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld, x+1, gridWorld[x].length - 1, visitedWorld,displayIlands,count);
    }
    if(y==gridWorld[x].length - 1){
      markIslandInWorld(gridWorld, x, 0, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld, x-1, 0, visitedWorld,displayIlands,count);
      markIslandInWorld(gridWorld, x+1, 0, visitedWorld,displayIlands,count);
    }
  };
    let visitedWorld = [];
    let displayIlands=[];

    for(let i = 0; i < gridWorld.length; i++) {
      visitedWorld[i] = [];
      displayIlands[i]=[];
    }
    let count = 0;
    for(let x = 0; x < gridWorld.length; x++) {
      for(let y = 0; y < gridWorld[x].length; y++) {
        if(!visitedWorld[x][y] && gridWorld[x][y] == '1') {
          count++;
          markIslandInWorld(gridWorld, x, y, visitedWorld,displayIlands,count);
          displayIlands[x][y]=count;

        }
        visitedWorld[x][y] = true;
      }
    }
    let res=[];
    res.push(count , displayIlands);
      return res;  };

let numIslands = function (grid) {
  let markIsland = function (grid, x, y, visited ,displayIlands,count) {
   
 
   
    if (x < 0 || x > grid.length - 1 || y < 0 || y > grid[x].length - 1) {
      return;
    }
    if (visited[x][y] === true) {
    
      return;
    }
    if(!visited[x][y] && grid[x][y]=='1'){
      displayIlands[x][y]=count;
    }else{
      displayIlands[x][y]='W';

    }

    visited[x][y] = true;

    if (grid[x][y] == '0') {
      return;
    }
    markIsland(grid, x - 1, y, visited,displayIlands,count);
    markIsland(grid, x + 1, y, visited,displayIlands,count);
    markIsland(grid, x, y - 1, visited,displayIlands,count);
    markIsland(grid, x, y + 1, visited,displayIlands,count);
    markIsland(grid, x-1, y+1, visited,displayIlands,count);
    markIsland(grid, x +1,y+1, visited,displayIlands,count);
    markIsland(grid, x-1,  y-1,visited,displayIlands,count);
    markIsland(grid, x+1, y -1,visited,displayIlands,count);
  };

  let visited = [];
  let displayIlands=[];
  for (let i = 0; i < grid.length; i++) {
    visited[i] = [];
    displayIlands[i]=[];
  }
  let count = 0;
  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[x].length; y++) {
      if (!visited[x][y] && grid[x][y] == '1') {
        count++;
        markIsland(grid, x, y, visited,displayIlands,count);
        displayIlands[x][y]=count;
      }
      
      visited[x][y] = true;
    }
  }

  let res=[];
res.push(count , displayIlands);
  return res;
};

