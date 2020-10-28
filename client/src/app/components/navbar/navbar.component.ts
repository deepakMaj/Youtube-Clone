import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean;
  user: any = {
    firstName: '',
    lastName: ''
  };

  constructor(private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router) {
    authService.loggedIn.subscribe(res => this.loggedIn = res);
  }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe(res => {
      if (res) {
        const token = localStorage.getItem("token");
        this.authService.getUserInfo(token).then(res => {
          this.user = res;
        });
      }
    })
  }

  openSidebar() {
    $('.ui.sidebar').sidebar('toggle');
  }

  onClickLogout() {
    this.authService.Logout();
    this.router.navigate(['/login']);
    this.flashMessage.show('You have logged out successfully', {
      cssClass: 'ui black message',
      timeout: 4000
    });
  }
}
