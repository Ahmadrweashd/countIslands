import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {RouterModule,Routes} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {MatToolbarModule ,MatFormFieldModule, MatInputModule,MatOptionModule , MatSelectModule, MatIconModule , MatButtonModule , MatCardModule , MatTableModule , MatSnackBarModule , MatDividerModule} from '@angular/material';
import {MatSliderModule} from '@angular/material/slider';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatrixListsComponent } from './components/matrix-lists/matrix-lists.component';
import {FormsModule} from '@angular/forms';
import {IssueService} from './issue.service';

import {MatDialogModule} from '@angular/material/dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent, CreateDialog } from './components/home/home.component';


const routes:Routes=[
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home' , component:HomeComponent} ,
  {path:'matrixlists/:id' , component:MatrixListsComponent} 
];


@NgModule({
  declarations: [
    AppComponent,
    MatrixListsComponent,
    NavbarComponent,
    HomeComponent,
    CreateDialog
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule ,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule,
    MatOptionModule ,
    MatSelectModule,
    MatIconModule ,
    MatButtonModule ,
    MatCardModule , 
    MatTableModule ,
    MatSnackBarModule , 
    MatDividerModule,
    MatSliderModule,
    FormsModule,
    MatDialogModule,

  ],
  providers: [IssueService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateDialog
  ]
})
export class AppModule { }
