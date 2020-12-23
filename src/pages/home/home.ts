import { Component } from "@angular/core";
import { NavController, AlertController , reorderArray, ToastController} from "ionic-angular";
import { TodoProvider } from "../../providers/todo/todo";
import { ArchivedTodosPage } from "../archived-todos/archived-todos";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  todo: Array<any> = [];
  reorderIsEnable: boolean =false;
  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private  todoService: TodoProvider ,
    private toast: ToastController
  ) {
    this.todo = this.todoService.getTodo();
  }
  gotToHome(){
    this.navCtrl.push(ArchivedTodosPage);
  }
  toggleReorder(){
    this.reorderIsEnable = !this.reorderIsEnable;
  }
  itemReorder(event){
    reorderArray(this.todo, event);
  }
  openTodoAlert() {
    let addNew = this.alertCtrl.create({
      title: "Add A Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type: "text",
          name: "newTodoInput"
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Add",
          handler: (input)=>{
            this.todoService.addTodo(input.newTodoInput);
            addNew.onDidDismiss(()=>{
              let todoAddToast = this.toast.create({
                message: 'Todo Added !',
                duration: 2000
              });
              todoAddToast.present();
            });
            
          }
        }
      ]
    });
    addNew.present();
  }
  delete(a){
    this.todo = this.todoService.removeTodo(a);
    let todoAddToast = this.toast.create({
      message: 'Todo Archived !',
      duration: 2000
    });
    todoAddToast.present();
  }
  editTodo(a){
    let editTodo = this.alertCtrl.create({
      title: "Edit A Todo",
      message: "Edit your Todo",
      inputs: [
        {
          type: "text",
          name: "editTodoInput",
          value:this.todo[a]
        }
      ],
      buttons: [
        {
          text: "Cancel"
        },
        {
          text: "Save",
          handler: (input)=>{
            this.todoService.editTodo(input.editTodoInput,a);
            editTodo.onDidDismiss(()=>{
              let todoAddToast = this.toast.create({
                message: 'Todo Changed !',
                duration: 2000
              });
              todoAddToast.present();
            });
            
          }
        }
      ]
    });
    editTodo.present();
  }
}
