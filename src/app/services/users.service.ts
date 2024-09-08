import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Iusuario } from '../interfaces/iusuario';
import { firstValueFrom, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private baseUrl: string = "https://peticiones.online/api/users"
  private http = inject(HttpClient)


  getAll(): Promise<Iusuario[]> {  
    return Promise.all([          //nota mía: directamente que me saque todos los usuarios en la misma página
      firstValueFrom(this.http.get<any>(`${this.baseUrl}?page=1`)), 
      firstValueFrom(this.http.get<any>(`${this.baseUrl}?page=2`))
    ]).then(([response1, response2]) => {
      return [...response1.results, ...response2.results]
    });
    };

  addUser(user: Iusuario): Observable<Iusuario> {    
    return this.http.post<Iusuario>(this.baseUrl, user);
    }

  delete(id: string): Promise<Iusuario[]> {
    return firstValueFrom(this.http.delete<any>(`${this.baseUrl}/${id}`))
  }

  getById(id: string): Promise<Iusuario> {
    return firstValueFrom(this.http.get<Iusuario>(`${this.baseUrl}/${id}`));
  }

  update(body: Iusuario): Promise<Iusuario> {
    let id = body._id
    
  return firstValueFrom(this.http.put<Iusuario>(`${this.baseUrl}/${id}`, body))

}
}







//   getAll(): Promise<Iusuario[]> {
//    }

//   getById(id: string): Promise<Iusuario> {
//    }

//   delete(id: string): Promise<> {

//    }
   
//   insert(body: IEmployee): Promise<> {

//   }

//   update(body: IEmployee): Promise<> {

// }



