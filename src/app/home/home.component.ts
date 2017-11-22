import { Component, OnInit } from '@angular/core';
import { HomeService } from './service/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  id: string;
  btnText = 'Ajouter un TODO';
  todoTitle = 'title';
  todoText = 'TODO';
  dueDate: string;
  todo = [];
  addingVar: Object;
  modifying = false;

  constructor(private homeService: HomeService) { }
s
  ngOnInit() {
    this.loadlist();
  }

  startEditing(id, name, description, dueDate) {
    this.modifying = true;
    this.id = id;
    this.btnText = 'Modifier';
    this.todoTitle = name;
    this.todoText = description;
    this.dueDate = dueDate;
  }

  loadlist() {
    this.homeService.getToDo().subscribe(
      response => this.todo = response,
      error =>  console.log('Error happened', error));
  }

  addItem() {
    if (this.modifying) {
      this.addingVar = {name: this.todoTitle, description: this.todoText, date: Date.now(), dueDate: this.dueDate };
      this.homeService.putToDoId(this.id, this.addingVar).subscribe(
        response => console.log('suppresion réussie'),
        error =>  console.log('Error happened', error));
      this.loadlist();
      this.btnText = 'Ajouter un TODO';
      this.todoTitle = 'title';
      this.todoText = 'TODO';
      this.dueDate = '';
      this.btnText = 'Modifier';
    }else {
      this.addingVar = {name: this.todoTitle, description: this.todoText, date: Date.now(), dueDate: this.dueDate };
      this.homeService.postToDo(this.addingVar).subscribe(
        function(response) { console.log('Success Response', response); },
        function(error) { console.log('Error happened', error); },
        function() { }
      );
      this.loadlist();
    }
  }

  deleteItem(id) {
    this.homeService.deleteToDoId(id).subscribe(
      response => console.log('suppresion réussie'),
      error =>  console.log('Error happened', error));
    this.loadlist();
  }

  loadItem() {
    this.homeService.getToDo().subscribe(
      function(response) { console.log('Success Response' + response); },
      function(error) { console.log('Error happened' + error); },
      function() { console.log('the subscription is completed'); }
    );
  }
}

