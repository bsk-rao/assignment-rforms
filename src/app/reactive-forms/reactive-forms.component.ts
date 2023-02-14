import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormBuilder , FormGroup, FormControl, Validators} from '@angular/forms'
@Component({
  selector: 'app-reactive-forms',
  templateUrl: './reactive-forms.component.html',
  styleUrls: ['./reactive-forms.component.css']
})
export class ReactiveFormsComponent implements OnInit {

  employeeForm : FormGroup
  employees : Employee[] = []
  isSubmit: boolean = false;
  @ViewChild('cancelButton') cancel : ElementRef<HTMLElement> | undefined
  buttonName : string = "Register"
  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group( {
      id: [''],
      firstName : ['', [Validators.required]],
      lastName : ['', Validators.required],
      email : ['', [Validators.required,Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(10)]],
      company : ['', Validators.required],
      gender : ['', Validators.required],
      dob : ['', Validators.required],
      password : ['', Validators.required],
      confirmPassword : ['', [Validators.required, this.matchPassword.bind(this)]]
    })
    this.employees = [
      {
          "id" : 1,
          "firstName": "Sri",
          "lastName": "Ravi",
          "email": "sri@gmail.com",
          "phone": "9898998989",
          "company": "Acc",
          "gender": "male",
          "dob": "2023-02-16",
          "password": "HELLO",
          "confirmPassword": "HELLO"
      },
      {
          "id" : 2,
          "firstName": "Sankar",
          "lastName": "Rao",
          "email": "sankarrao@gmail.com",
          "phone": "9898099889",
          "company": "Cap",
          "gender": "male",
          "dob": "2023-02-01",
          "password": "HELLO",
          "confirmPassword": "HELLO"
      }
  ]
  }

  ngOnInit(): void {
    console.log("I am on ngOnit")
    console.log(this.employeeForm.get('firstName')?.errors)
  }
  onRegister() {
    this.isSubmit = true;
    if(this.employeeForm.valid) {
      const id = this.employeeForm.get('id')?.value
      const index = this.employees.findIndex(item=> item.id==id)
      if(index!=-1) {
        this.employees.splice(index,1)
      }
      var formValue = { id: this.employees.length+1, ...this.employeeForm.value}
      this.employees.push(formValue);
      this.cancel?.nativeElement.click();
      this.isSubmit = false;
    }
    console.log("I am in onRegister");
    console.log(this.employeeForm.value);
  }

  onEdit(employee : Employee) {
    this.buttonName = "Update"
    this.employeeForm.patchValue(this.employees.find(item=> item.email==employee.email) || {})
  }

  onDelete(employee : Employee) {
    const index = this.employees.findIndex(item=> item.email==employee.email)
    this.employees.splice(index,1)
  }

  onCancel() {
    this.employeeForm.reset();
    this.buttonName = "Register";
  }

  matchPassword(control : FormControl) : { [s: string] : boolean } | null {
    if(!(control.value===this.employeeForm?.get('password')?.value)) {
      return {'passwordNotMatch' : true}
    }
    return null
  }
  checkOnlyNumber(event : any) {
    const val = event.which;
    if(val>=48 && val<=57) {
      return true;
    }
    return false;
  }
}



export class Employee {
      id: number | undefined
      firstName: string | undefined
      lastName: string | undefined
      email: string | undefined
      phone: string | undefined
      company: string | undefined
      gender: string | undefined
      dob: string | undefined
      password: string | undefined
      confirmPassword: string | undefined
}
