import { Component, AfterViewChecked, ViewChild, Inject, forwardRef  } from '@angular/core';
import { NgForm, FormsModule  } from '@angular/forms';
import { Router }   from '@angular/router';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { LoginService } from './login.service';
import { User } from './user'; 

@Component ({
	selector : "login",
	templateUrl : "login.component.html"
})

export class LoginComponent implements AfterViewChecked  {
	login = "Login";
	signup = "Register";
	loginFlag = true;
	authFlag = false;
	loginName;
	
	model = {
		name : '',
		username : ''
	};
	
	userList : User[];
	constructor(private router: Router, private loginService: LoginService) {}

	onSubmit() {
	    this.loginService.getUsers().then(userList => {
	    	if (userList.filter(report => report.name === this.model.username)[0]) {
	    		this.loginFlag = false;
	    		this.userList = userList;
	    		this.loginName = this.model.username;
	    		this.router.navigateByUrl('/dashboard');
	    	} else {
	    		this.authFlag = true;
	    	}
	    });
	}

	onRegister(name: string, password: string): void {
	    name = name.trim();
	    if (!name && !password) { return; }

	    this.loginFlag = false;
	    this.router.navigateByUrl('/dashboard');

	    this.loginService.create(name, password)
	      .then(user => {
	        this.userList.push(user);
	    });
	}

	signupForm: NgForm;
	@ViewChild('signupForm') currentForm: NgForm;

 	ngAfterViewChecked() { 
		this.buildForm();
 	}

	buildForm() {
	   if (this.currentForm === this.signupForm) { return; }
    	this.signupForm = this.currentForm;
	    if (this.signupForm) {
	        this.signupForm.valueChanges.subscribe(data => this.onValueChanged(data));
	    }
	}

	onValueChanged(data?: any) {
    	if (!this.signupForm) { return; }
    	const form = this.signupForm.form;
		for (const field in this.formErrors) {
		   
		   this.formErrors[field] = '';
		   const control = form.get(field);

		   if (control && control.dirty && !control.valid) {
		     const messages = this.validationMessages[field];
		     for (const key in control.errors) {
		     this.formErrors[field] += messages[key] + ' ';
		   }
		}
	  }
	} 

	validationMessages = {
	  'name': {
	    'required':      'Name is required.',
	    'minlength':     'Name must be at least 4 characters long.',
	    'maxlength':     'Name cannot be more than 24 characters long.'
	  },
	  'email': {
	    'required':      'Email is required.',
	    'pattern': 'Enter proper mail id'
	  },
	  'optradio': {
	    'required':      'Gender is required.'
	  },
	  'password1': {
	    'required':      'Password is required.',
	    'pattern':       'Password Must Contain only alphabets'
	  }
	}

	formErrors = {
	  'name': '',
	  'email': '',
	  'optradio': '',
	  'password1':''
	}
}