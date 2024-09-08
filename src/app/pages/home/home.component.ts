import { Component, inject } from '@angular/core';
import { UserCardComponent } from '../../components/user-card/user-card.component';
import { Iusuario } from '../../interfaces/iusuario';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {



  usersService = inject(UsersService)
  arrUsers: Iusuario[] = []
  currentPage: number = 1
  usersEachPage: number = 10



  ngOnInit() {
    this.usersService.getAll().then(users => {this.arrUsers = users
       //console.log(users)
  })
  }

  removeUser(id: string) {    //nota mia: filtrar usuario eliminado en user-card (si se recarga aparece de nuevo ya que la api no es modificable)
    this.arrUsers = this.arrUsers.filter(user => user._id !== id)
  }
  }




