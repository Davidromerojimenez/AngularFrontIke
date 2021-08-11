import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user = {
    name: '',
    email: '',
    password: ''
  }

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit (){

    this.authService.signUp(this.user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/signin'])
      },
      err => {
        console.log(err);
      }
    );
  }

}
