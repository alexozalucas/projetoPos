import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServices } from '../services/auth.services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  isLoading: boolean = false;

  constructor(private authService: AuthServices,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.isLoading = true;
    this.authService.register(this.form).subscribe(
      data => {        
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.isLoading = false
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        this.isLoading = false
      }
    );
  }

}
