import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

interface Task {
  taskName: string;
  dueDate: string;
  people: any[];
  completed: boolean;
}
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private taskSubject = new BehaviorSubject<Task[]>([]);
  tasks$ = this.taskSubject.asObservable();

  addTask(task: Task){
    const tasks = this.taskSubject.getValue();
    tasks.push(task);
    this.taskSubject.next(tasks);
  }

  getTasks(){
    return this.tasks$;
  }

  toggleTaskCompletion (index: number){
    const tasks = this.taskSubject.getValue();
    tasks[index].completed = !tasks[index].completed;
    this.taskSubject.next(tasks);
  }


}
