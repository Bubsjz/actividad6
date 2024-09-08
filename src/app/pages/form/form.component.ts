import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { Iusuario } from '../../interfaces/iusuario';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})



export class FormComponent {

  modelForm: FormGroup
  arrUsers: Iusuario[] = []
  usersService = inject(UsersService)
  tipoTitle: string = "Nuevo"
  tipoButton: string = "Guardar"             //nota mia: para interpolar con actualizar
  activateRoute= inject(ActivatedRoute)     //nota mia: para redirigir        
  router = inject(Router)     
  usuarioId!: string


  

//validadores

  constructor() {                       
    this.modelForm = new FormGroup({
      first_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl(null, [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,6}$/)
      ]),
      image: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(\?.*)?$/)
      ]),
     }, [])
  }

  checkControl(formControlName: string, validator: string) {    
    return (this.modelForm.get(formControlName)?.hasError(validator)) && (this.modelForm.get(formControlName)?.touched)
  }


  //nota mía: detecto si se esta actualizando o creando user, si esta actualizando recupero datos y los meto en los campos

  ngOnInit() {
    this.activateRoute.params.subscribe(async(params:any) => {
        console.log(params.id)
      if(params.id) {
        this.usuarioId = params.id
        this.tipoTitle = "Actualizar"
        this.tipoButton = "Actualizar"
      }
      const usuario : Iusuario = await this.usersService.getById(this.usuarioId)

      this.modelForm.patchValue({               //nota mía: relleno campos
        first_name: usuario.first_name,
        last_name: usuario.last_name,
        email: usuario.email,
        image: usuario.image
      })
    })
  }


  getDataForm() {
    if (this.usuarioId) {
    //actualización

      const response: Iusuario = { _id: this.usuarioId, ...this.modelForm.value }
      this.usersService.update(response).then(() => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Usuario actualizado',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })
        this.router.navigate(['/user', this.usuarioId])
      }).catch(error => {
        alert("El usuario que intentas editar no existe")
        console.error(error);
      })
    } else {
      
      //inserción
      if (this.modelForm.valid) {
        const newUser: Iusuario = this.modelForm.value;  
        this.usersService.addUser(newUser).subscribe({
          next: (respuesta) => {
            Swal.fire({
              title: '¡Hecho!',
              text: 'Usuario creado',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            })
            console.log(respuesta);   
            this.modelForm.reset()
          },
          error: (error) => {
            console.error(error); 
          }
        });
      }
    }
  }
}






  


