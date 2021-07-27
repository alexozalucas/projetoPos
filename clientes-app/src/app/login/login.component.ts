import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { TokenStorageService } from '../services/token-storage.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import { AuthServices } from '../services/auth.services';





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
  googleURL = environment.GOOGLE_AUTH_URL;
  token: string;
  error: string;
  isLoading: boolean = false;


  constructor(private authService: AuthServices,
    private tokenStorage: TokenStorageService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router) {

  }
  init(){
    debugger
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.error = this.route.snapshot.queryParamMap.get('error');
  }

  ngOnInit(): void {
    //this.route.queryParams.subscribe((params) => console.log(params))
    debugger
    this.token = this.route.snapshot.queryParamMap.get('token');
    this.error = this.route.snapshot.queryParamMap.get('error');


    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    }
    else if (this.token) {
      this.tokenStorage.saveToken(this.token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
          this.isLoading = false;
        }
      );
    }
    else if (this.error) {
      this.errorMessage = this.error;
      this.isLoginFailed = true;
      this.isLoading = false;
    }
  }

  onSubmit(): void {

    this.isLoading = true;
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      },
      err => {
        this.isLoading = false;
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        if (!this.errorMessage) {
          this.errorMessage = "Não foi possivel se comunicar com o servidor!"
        }
        if (err.error.status == 401) {
          this.errorMessage = "Usuário/senha incorreto!"
        }
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


  signInWithGoogle() {
    window.location.href = this.googleURL;

    this.isLoading = true;

  }
  verificarToken() {

    // window.location.href = this.googleURL;



    //const routeFragment: Observable<string> = this.route.fragment;      
    //routeFragment.subscribe(fragment => {
    //let token: string = window.location.href = this.googleURL;
    //this.token = fragment.match(/^(.*?)&/)[1].replace('token=', '');
    //console.log(this.token)
    //});



  }




}








