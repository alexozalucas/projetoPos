import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AppConstants } from '../constants/app.constants';
import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;

  constructor(private authService: AuthService,
               private tokenStorage: TokenStorageService,
               private route: ActivatedRoute, 
               private userService: UserService,
               private router: Router) {
                 console.log(this.googleURL)
                }

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParamMap.get('token');
    const error: string = this.route.snapshot.queryParamMap.get('error');
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    else if (token) {
      this.tokenStorage.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {          
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    }
    else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user); 
        this.router.navigate(['/home'])         
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    this.router.navigate(['/home']) 
    //window.location.reload();
  }

  

}





