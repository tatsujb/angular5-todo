import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  itemCount: number = 0;
  btnText: string = 'Add an item';
  todoTitle: string = 'title';
  todoText: string = 'TODO';
  todo = [];
  addingVar: Object;
  dueDate: string;
  constructor() { }

  ngOnInit() {
    this.itemCount = this.todo.length;
  }

  addItem() {
    // {{1288323623006 | date:"dd/MM/yyyy 'at' h:mma"}}
    this.addingVar = {title: this.todoTitle, content: this.todoText, date: Date.now(), dueDate: this.dueDate };
    this.todo.push(this.addingVar);
    this.itemCount = this.todo.length;
  }

  // search(term:string) {
  //   let promise = new Promise((resolve, reject) => {
  //     let apiURL = `${this.apiRoot}?term=${term}&media=music&limit=20`;
  //     this.http.get(apiURL)
  //       .toPromise()
  //       .then(
  //         res => { // Success
  //           this.results = res.json().results;
  //           resolve();
  //         },
  //         msg => { // Error
  //           reject(msg);
  //         }
  //       );
  //   });
  //   return promise;
  // }
}
