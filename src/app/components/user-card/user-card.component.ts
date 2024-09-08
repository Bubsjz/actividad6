import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Iusuario } from '../../interfaces/iusuario';
import { UsersService } from '../../services/users.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {

usersService = inject(UsersService)
@Input() myUser!: Iusuario
@Output() userDeleted: EventEmitter<string> = new EventEmitter()


async delete(id: string | undefined) {
  if (id) {
    const confirmacion = confirm("¿Deseas borrar el usuario cuyo id es: " + id + "?");
    if (confirmacion) {
      try {
        await this.usersService.delete(id)
        Swal.fire({
          title: '¡Hecho!',
          text: 'Usuario borrado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.userDeleted.emit(id)
      } catch (error) {
        alert("El usuario que intentas borrar no existe")
        console.log(error)
      }
    }
  }
}

}
