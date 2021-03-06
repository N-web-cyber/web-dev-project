import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  logged = false;

  constructor() { }

  ngOnInit(): void {
    let token = localStorage.getItem('token');
    if (token) {
      this.logged = true;
    }
  }

  logout() {
    localStorage.clear();
    this.logged = false;
    location.reload();
  }

}
