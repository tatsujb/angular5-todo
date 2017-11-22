import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HomeService {
  constructor (
    private http: Http
  ) {}
  getToDo() {
      return this.http.get(`http://localhost:3000/todos`)
        .map((res: Response) => res.json());
  }
  getToDoId(id: string) {
    return this.http.get(`http://localhost:3000/todos/${id}`)
      .map((res: Response) => res.json());
  }
  postToDo(body: object) {
    return this.http.post(`http://localhost:3000/todos`, body)
      .map((res: Response) => res.json());
  }
  putToDoId(id: string, body: object) {
    return this.http.put(`http://localhost:3000/todos/${id}`, body)
      .map((res: Response) => res.json());
  }
  deleteToDoId(id: string) {
    return this.http.delete(`http://localhost:3000/todos/${id}`)
      .map((res: Response) => res.json());
  }
}
