import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTaskComponent } from './create-task/create-task.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: 'create-task', component: CreateTaskComponent },
  { path: 'task-list', component: TaskListComponent },
  { path: '', redirectTo: '/task-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
