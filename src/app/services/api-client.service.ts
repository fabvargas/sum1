import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
 
  apiURL = "https://jsonplaceholder.typicode.com/comments?postId=1"
  comments:any[]=[]
  constructor(private http:HttpClient) {}

  getComments():Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(2),
    )
  }



}
