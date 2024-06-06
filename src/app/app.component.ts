import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ReactiveFormsModule,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{

  signupForm!: FormGroup;

  mockProjectName = 'Test';
  maockMail = 'tests@gmail.com';

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      'projectName' : new FormControl(null, [Validators.required, Validators.minLength(3), this.forbiddenProjectName.bind(this)]),
      'mail' : new FormControl(
        null, 
        [Validators.required, Validators.email], 
        [this.forbiddenEmail.bind(this)]),
      'projectStatus' : new FormControl('Stable')
    })
  }

  

  projectStatuses = ['Stable', 'Critical', 'Finished']

  title = 'assignment-7';

  onSubmit() {
    console.log(this.signupForm);
  }

  forbiddenProjectName(control: FormControl): {[s:string]:boolean} | null{
    if(this.mockProjectName === control.value) {
      return {'forbiddenProjectName' : true};
    }
    return null;
  }

  forbiddenEmail(control: AbstractControl) : Promise<{[s:string]:boolean}> | Observable<{[s:string]:boolean}> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(()=> {
        if(this.maockMail === control.value) {
          resolve({'forbiddenMail': true});
        } else {
          resolve(null);
        }
      }, 1500);
    })
    return promise;
  }
}
