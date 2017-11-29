import { Component, OnInit, NgZone } from '@angular/core';
import { HomeService } from './service/home.service';
import {$} from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  id: string;
  btnText = 'Ajouter une tâche à faire';
  todoTitle = 'title';
  todoText = 'TODO';
  dueDate: string;
  todo = [];
  addingVar: Object;
  modifying = false;
  colorOne = '';
  colorTwo = '';
  start_time = new Date();
  formtxt = 'Utilise ce formulaire pour ajouter un todo';

  constructor(private homeService: HomeService, private zone: NgZone ) {
  }

  ngOnInit() {
    this.loadlist();
  }

  startEditing(id, name, description, dueDate) {
    this.modifying = !this.modifying;
    this.id = id;
    this.btnText = 'Modifier';
    this.todoTitle = name;
    this.todoText = description;
    this.dueDate = dueDate;
    this.colorOne = 'colorOne';
    this.colorTwo = 'colorTwo';
    this.formtxt = 'Modifiez les valeurs';
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
      this.todoTitle = 'title';
      this.todoText = 'TODO';
      this.dueDate = '';
      this.btnText = 'Ajouter une tâche à faire';
      this.modifying = !this.modifying;
      this.colorOne = '';
      this.colorTwo = '';
      this.formtxt = 'Utilise ce formulaire pour ajouter un todo';
    }else {
      this.addingVar = {name: this.todoTitle, description: this.todoText, date: Date.now(), dueDate: this.dueDate };
      this.homeService.postToDo(this.addingVar).subscribe(
        function(response) { console.log('Success Response', response); },
        function(error) { console.log('Error happened', error); },
        function() { }
      );
      this.loadlist();
    }
    location.reload();
  }

  deleteItem(id) {
    this.homeService.deleteToDoId(id).subscribe(
      response => console.log('suppresion réussie'),
      error =>  console.log('Error happened', error));
    this.loadlist();
    location.reload();
  }

  titleHasError() {
    return false;
  }
}

