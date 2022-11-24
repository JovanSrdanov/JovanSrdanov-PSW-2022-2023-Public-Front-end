import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AllegrieService } from 'src/app/Services/allegrie.service';
import { DoctorService } from 'src/app/Services/doctor.service';
import { UserService } from './user.service';

export interface Gender {
  value: number;
  viewValue: string;
}

export interface BloodType {
  value: number;
  viewValue: string;
}

export interface Allergies {
  name: string;
  id: string;
}

export interface Doctor {
  id: string;
  name: string;
  surname: string
  patientCount: number;
}

export interface UserInfo {
  userLoginDto: {
    username: string,
    password: string
  }
  addressRequestDto: {
    city: string,
    country: string,
    street: string,
    streetNumber: string
  },
  name: string,
  surname: string,
  birthdate: string,
  gender: number,
  jmbg: string,
  email: string,
  phoneNumber: string,
  bloodType: number,
  allergieIds: string,
  choosenDoctorId: string
}





@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  maxDate = new Date();


  bloodType: BloodType[] = [
    { value: 0, viewValue: 'A POS' },
    { value: 1, viewValue: 'A NEG' },
    { value: 3, viewValue: 'B POS' },
    { value: 4, viewValue: 'B NEG' },
    { value: 5, viewValue: 'O POS' },
    { value: 6, viewValue: 'O NEG' },
    { value: 7, viewValue: 'AB POS' },
    { value: 8, viewValue: 'AB NEG' },
  ];
  selectedBloodType = this.bloodType[0].value;

  genders: Gender[] = [
    { value: 0, viewValue: 'Male' },
    { value: 1, viewValue: 'Female' },
  ];
  selectedGender = this.genders[0].value;

  doctors: Doctor[] = [{ id: "", name: '', surname: "", patientCount: 0 }];

  selectedDoctor = this.doctors[0].id;


  allergiesList: Allergies[] = [];
  allergiesListSelected = new FormControl("");

  hide = true;
  registrationForm = new FormGroup({

    password: new FormControl<string>('', [Validators.required]),
    username: new FormControl<string>('', [Validators.required]),
    number: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    street: new FormControl<string>('', [Validators.required]),
    country: new FormControl<string>('', [Validators.required]),
    name: new FormControl<string>('', [Validators.required]),
    surname: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required]),
    phoneNumber: new FormControl<string>('', [Validators.required]),
    birthDate: new FormControl((new Date()).toISOString().substring(0, 10), [Validators.required]),

    jmbg: new FormControl<string>('', [Validators.required])
  });

  errorMessage: string = "Fill the form data correctly";

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date())
    let today = new Date();
    return day < today;
  };


  constructor(private readonly router: Router, private readonly allegrieService: AllegrieService, private readonly doctorService: DoctorService, private readonly userService: UserService) { }

  ngOnInit(): void {

    this.allegrieService.getsAllegries().subscribe(res => {

      this.allergiesList = res
      console.table(res);
    }
    )
    this.doctorService.getDoctorsWithLeastPatients().subscribe(res => {

      this.doctors = res;
      this.selectedDoctor = this.doctors[0].id;
    }
    );

  }
  get form() {
    return this.registrationForm.controls;
  }

  registerUser(): void {


    let dto: UserInfo = {

      userLoginDto: {
        username: this.form.username.value ?? "",
        password: this.form.password.value ?? "",
      },
      addressRequestDto: {
        streetNumber: this.form.number.value ?? "",
        city: this.form.city.value ?? "",
        street: this.form.street.value ?? "",
        country: this.form.country.value ?? "",
      },


      name: this.form.name.value ?? "",
      surname: this.form.surname.value ?? "",
      birthdate: this.form.birthDate.value ?? "",
      gender: this.selectedGender,
      jmbg: this.form.jmbg.value ?? "",
      phoneNumber: this.form.phoneNumber.value ?? "",
      email: this.form.email.value ?? "",
      bloodType: this.selectedBloodType,
      allergieIds: this.allergiesListSelected.value ?? "",
      choosenDoctorId: this.selectedDoctor

    }

    console.log(dto);
    this.userService.registerUser(dto).subscribe(res => { })
  }

}
