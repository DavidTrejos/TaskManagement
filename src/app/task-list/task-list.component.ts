import {Component, OnInit} from '@angular/core';
import {TaskService} from "../task.service";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$ = this.taskService.getTasks();
  filteredTasks = this.tasks$;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
    this.filteredTasks = this.tasks$;
  }

  toggleCompletion(index: number) {
    this.taskService.toggleTaskCompletion(index);
  }



  filterTasks(filter: string) {
    this.filteredTasks = this.tasks$.pipe(
      map(tasks => {
        if (filter === 'completed') {
          return tasks.filter(task => task.completed);
        } else if (filter === 'pending') {
          return tasks.filter(task => !task.completed);
        } else {
          return tasks;
        }
      })
    );
  }
}
