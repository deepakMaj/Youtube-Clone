import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router) { }

  canActivate(): boolean {
    let result = false;
    this.authService.loggedIn.subscribe(res => {
      if (!res) {
        this.router.navigate(['/login']);
        result = false;
      }
      else {
        result = true;
      }
    });
    return result;
  }

}