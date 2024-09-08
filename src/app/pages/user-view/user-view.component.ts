import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { Iusuario } from '../../interfaces/iusuario';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-user-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user-view.component.html',
  styleUrl: './user-view.component.css'
})
export class UserViewComponent {

  usuario! : Iusuario
  usersService = inject(UsersService)
  activateRoute = inject(ActivatedRoute)
  router = inject(Router)


async ngOnInit() {
    //nota mía: el activateroute captura el valor de la url para saber que servicio unico tengo que cargar
    this.activateRoute.params.subscribe(async (params:any) => {
    //console.log(params)
    try {
    let id = params.id
    this.usuario = await this.usersService.getById(id)
    } catch (error) {
    alert("No se ha podido recuperar el usuario")
    }
    })
  }


  async delete(id: string | undefined) {
    if (id) {
      const confirmacion = confirm("¿Deseas borrar el usuario cuyo id es: " + id + "?");
      if (confirmacion) {
        try {
          await this.usersService.delete(id);
          Swal.fire({
            title: '¡Hecho!',
            text: 'Usuario borrado',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });
          this.router.navigate(['/home']);
        } catch (error) {
          alert("El usuario que intentas borrar no existe")
          console.log(error);
        }
      }
    }
  }

}
