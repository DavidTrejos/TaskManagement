import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { TaskService } from '../task.service';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
      taskForm: FormGroup;

      constructor( private fb: FormBuilder,private taskService: TaskService) {
        this.taskForm = this.fb.group({
          taskName: ['',[Validators.required, Validators.minLength(5)]],
          dueDate: ['', Validators.required],
          people: this.fb.array([])
        });
      }

      get people(): FormArray {
        return this.taskForm.get('people') as FormArray;
      }

      addPerson(){
        const personForm = this.fb.group({
          fullName: ['', [Validators.required, Validators.minLength(5)]],
          age: ['',[Validators.required, Validators.min(18)]],
          skills: this.fb.array([this.fb.control('', Validators.required)])
        });
        this.people.push(personForm);
      }

      removePerson(index: number){
        this.people.removeAt(index);
      }

      addSkill(personIndex: number) {
      const skills = this.people.at(personIndex).get('skills') as FormArray;
      skills.push(this.fb.control('', Validators.required));
      }

     removeSkill(personIndex: number, skillIndex: number) {
     const skills = this.people.at(personIndex).get('skills') as FormArray;
     skills.removeAt(skillIndex);
     }

    getSkills(person: any): FormArray {
      return person.get('skills') as FormArray;
    }

  submitTask() {
    if (this.taskForm.valid) {
      const newTask = this.taskForm.value;
      newTask.completed = false;
      this.taskService.addTask(newTask);
      console.log('Task submitted:', this.taskForm.value);
      this.taskForm.reset();
    }
  }
   }
