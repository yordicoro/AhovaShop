import { Component, signal, OnInit, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './core/layout/navbar/navbar.component';
import { Store } from '@ngrx/store';
import { AuthActions } from 'clothing-core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  private store = inject(Store);
  protected readonly title = signal('front-office');

  ngOnInit() {
    this.store.dispatch(AuthActions.initAuthentication());
  }
}
