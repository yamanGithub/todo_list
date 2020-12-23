import { Injectable } from '@angular/core';

/*
  Generated class for the TodoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TodoProvider {
  private todos = [];
  private archivedTodo = [];
  constructor() {
    console.log('Hello TodoProvider Provider');
  }
  getTodo(){
    return this.todos;
  }
  getArchivedTodo(){
    return this.archivedTodo;
  }
  addTodo(t){
    this.todos.push(t);
  }
  removeTodo(a){
    this.archivedTodo.push(this.todos[a]);
    return this.todos.slice(0,a).concat(this.todos.slice(a + 1));
  }
  editTodo(a,i){
    this.todos[i]=a;
  }
}
