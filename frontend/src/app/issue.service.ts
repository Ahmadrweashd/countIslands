import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Issue } from './issue.model';
@Injectable({
  providedIn: 'root'
})
export class IssueService {
uri='http://localhost:4000';

  constructor(private http: HttpClient) { }

getIslands(id){
  return this.http.get<Issue[]>(`${this.uri}/islands/${id}`);
}
getIslandById(id){
  return this.http.get(`${this.uri}/islands/${id}`);
}

deleteIssue(id){
  return this.http.get(`${this.uri}/islands/delete/${id}`);
}

addIsland(date , matrix){
  const newIsland ={
    date:date,
    matrix:matrix
  };
  return this.http.post(`${this.uri}/islands/add`,newIsland);
}
UpdateIsland(id , date , matrix){
  const newIsland ={
    date:date,
    matrix:matrix
  };
  return this.http.post(`${this.uri}/islands/update/${id}`,newIsland);
}



}
