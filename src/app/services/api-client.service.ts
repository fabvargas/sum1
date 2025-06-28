import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
 
  
  apiFoodListUrl="https://www.themealdb.com/api/json/v1/1/filter.php?i=Beef"

  apiFoodUrl="https://www.themealdb.com/api/json/v1/1/lookup.php?i="

  comments:any[]=[]
  constructor(private http:HttpClient) {}


  getFoodList():Observable<any>{
    return this.http.get(this.apiFoodListUrl).pipe(
      retry(2),
    )
  }

 getFood(id:string):Observable<any>{
    return this.http.get(this.apiFoodUrl+id).pipe(
      retry(2),
    )
  }


}
