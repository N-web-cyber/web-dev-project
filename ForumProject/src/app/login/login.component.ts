import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = '';
  password = '';
  constructor(private route: Router,
              private userService: UserService) { }

  ngOnInit(): void {
  }

  clear(): void {
    this.username = '';
    this.password = '';
  }

  login(): void {
    this.userService.login(this.username, this.password).subscribe(res => {
      localStorage.setItem('token', res.token);
      this.clear();
      this.route.navigate(['/']);
    });
  }
}
