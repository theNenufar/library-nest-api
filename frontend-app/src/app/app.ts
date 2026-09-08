import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserService } from './users/user.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe({
      next: users => {
        console.log('Usuários recebidos:', users);
        this.users = users;
      },
      error: error => {
        console.error('Erro ao buscar usuários:', error);
      }
    });
  }
}
