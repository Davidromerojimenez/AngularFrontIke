import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  user = {
    email: '',
    password: ''
  }
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.authService.signIn(this.user)
    .subscribe(
      res => {

        console.log(res);
        console.log(res['access_token']);

        localStorage.setItem('elToken', res['access_token']);

        this.router.navigate(['/products'])
      },
      err => console.log(err)

    )
  }

}
