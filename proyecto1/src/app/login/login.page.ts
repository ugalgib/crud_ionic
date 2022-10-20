import { Component, OnInit } from '@angular/core';
import { Platform, MenuController  } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { AppComponent } from "../app.component";
import Swal from 'sweetalert2';
import * as $ from "jquery";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  BaseUrl = this.Link.BaseLink();

  constructor(private menuCtrl: MenuController, private router: Router, private storage: Storage, private Link: AppComponent) { }

  ionViewWillEnter(){
    this.menuCtrl.enable(false);
  }
  
  ionViewWillLeave(){
    this.menuCtrl.enable(true);
  }

  ionViewDidLeave() {
    this.menuCtrl.enable(true);
  }
  
  EsconderPanel(){
    $("#panelcontraseña").show();
    $("#panellogin").hide();
  }
  Login(){

    $("#preloader").show();
    $("#botonlogin").attr('disabled',true);
    $("#botonresetlogin").attr('disabled',true);
    $("#botonesconder").attr('disabled',true);

    var usuario = $("#user").val();
    var pass = $("#pass").val();

    if(usuario != "" && pass != ""){

      $.ajax({
        url:this.BaseUrl+"index.php/Session/validatelogin",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{usuario:usuario,pass:pass},
        async: true,
        success:(data) =>{
          var obj = JSON.parse(data);

          if (obj != "") {

            var msg = obj;

            if (msg == 'OK-') {

              $("#preloader").hide();
              $("#botonlogin").attr('disabled',false);
              $("#botonresetlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);

              this.storage.set('user', usuario);
              this.storage.set('pass', pass);
              this.router.navigate(['/home']);
              $("#user").val("");
              $("#pass").val("");
       
            }else if(obj == "IUOP"){
              $("#preloader").hide();
              $("#botonlogin").attr('disabled',false);
              $("#botonresetlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);
              Swal.fire({title:'Error', icon:'error', text: 'User or incorrect password',heightAuto:false});
            }else if (obj == "UWOA") {
              $("#preloader").hide();
              $("#botonlogin").attr('disabled',false);
              $("#botonresetlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);
              Swal.fire({title:'Error', icon:'error', text: 'User without access to this app',heightAuto:false});
            }else if (obj == "UWAS") {
              $("#preloader").hide();
              $("#botonlogin").attr('disabled',false);
              $("#botonresetlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);
              Swal.fire({title:'Error', icon:'error', text: 'User with an active session',heightAuto:false});
            }
          }
        },error:function(status, textStatus, jqXHR,errorThrown){

          if (status.statusText=="timeout") {

            Swal.fire({   
              title: 'Error',
              text: 'Your device is not connected to internet or your connection is very slow.\n Please try again' ,   
              icon: 'error',   
              heightAuto:false,
              allowOutsideClick: false,
              showCancelButton: false,   
              confirmButtonColor: "#DD6B55",   
              confirmButtonText: "OK",   
              cancelButtonText: "No, Cancelar",   
            }).then((result) => {
          if (result.value) {
              $("#preloader").hide();
              $("#botonlogin").attr('disabled',false);
              $("#botonresetlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);

                } 
            });
          }else{
            $("#preloader").hide();
            $("#botonlogin").attr('disabled',false);
            $("#botonresetlogin").attr('disabled',false);
            $("#botonesconder").attr('disabled',false);
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }
  
        }
      });  

    }else{
     
      $("#preloader").hide();
      $("#botonlogin").attr('disabled',false);
      $("#botonresetlogin").attr('disabled',false);
      $("#botonesconder").attr('disabled',false);
      Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
    }

}

ResetLogin(){

  $("#preloader").show();
  $("#botonresetlogin").attr('disabled',true);
  $("#botonlogin").attr('disabled',true);
  $("#botonesconder").attr('disabled',true);

  var usuarioreset = $("#user").val();
  var passreset = $("#pass").val();

  if(usuarioreset != "" && passreset != ""){

      $.ajax({
        url:this.BaseUrl+"index.php/Session/ResetLogin",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{usuarioreset:usuarioreset,passreset:passreset},
        async: true,
        success:(data) =>{
          var obj = JSON.parse(data);

          if (obj != "") {

            var msg = obj;

            if (msg == 'OK') {

              Swal.fire({title:'OK', icon:'success', text: 'Session has been restored successfully',heightAuto:false});

              $("#preloader").hide();
              $("#botonresetlogin").attr('disabled',false);
              $("#botonlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);

              $("#user").val("");
              $("#pass").val("");

            }else if(obj == "IUOP"){
              $("#preloader").hide();
              $("#botonresetlogin").attr('disabled',false);
              $("#botonlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);
              Swal.fire({title:'Error', icon:'error', text: 'User or incorrect password',heightAuto:false});
            }else if (obj == "UWOA") {
              $("#preloader").hide();
              $("#botonresetlogin").attr('disabled',false);
              $("#botonlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);
              Swal.fire({title:'Error', icon:'error', text: 'User without access to this app',heightAuto:false});
            }
          }

        },error:function(status, textStatus, jqXHR,errorThrown){

          if (status.statusText=="timeout") {

            Swal.fire({   
              title: 'Error',
              text: 'Your device is not connected to internet or your connection is very slow.\n Please try again' ,   
              icon: 'error',   
              heightAuto:false,
              allowOutsideClick: false,
              showCancelButton: false,   
              confirmButtonColor: "#DD6B55",   
              confirmButtonText: "OK",   
              cancelButtonText: "No, Cancelar",   
            }).then((result) => {
          if (result.value) {
              $("#preloader").hide();
              $("#botonresetlogin").attr('disabled',false);
              $("#botonlogin").attr('disabled',false);
              $("#botonesconder").attr('disabled',false);

                } 
            });
          }else{
            $("#preloader").hide();
            $("#botonresetlogin").attr('disabled',false);
            $("#botonlogin").attr('disabled',false);
            $("#botonesconder").attr('disabled',false);
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }
  
        }
      }); 
    }else{
      $("#preloader").hide();
      $("#botonresetlogin").attr('disabled',false);
      $("#botonlogin").attr('disabled',false);
      $("#botonesconder").attr('disabled',false);
      Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
    }

}

RestablecerContrasena(){

  $("#preloader").show();
  $("#botonrestablecer").attr('disabled',true);
  $("#botonmostrar").attr('disabled',true);

  var usuario = $("#usuariores").val();
  var correo = $("#correores").val();
  var telefono = $("#telefonores").val();

  if(usuario != "" && correo != "" && telefono != ""){

    $.ajax({
      url:this.BaseUrl+"index.php/Session/RestablecerContrasena",
      type:'POST',
      crossDomain: true,
      timeout: 30000,
      data:{usuario:usuario,correo:correo,telefono:telefono},
      async: true,
      success:(data) =>{
        var obj = JSON.parse(data);

        var contraseña = obj.contrasena;

        if (obj.mensaje == "TRUE") {

          $("#preloader").hide();   
          $("#botonrestablecer").attr('disabled',false);
          $("#botonmostrar").attr('disabled',false);    

          $("#usuariores").val("");
          $("#correores").val("");
          $("#telefonores").val("");

          Swal.fire({title:'OK', icon:'success', text: 'Password has been restored successfully, your password is: '+contraseña+'',heightAuto:false});

          $("#panelcontraseña").hide();
          $("#panellogin").show();

        }else{

          $("#preloader").hide();
          $("#botonrestablecer").attr('disabled',false);
          $("#botonmostrar").attr('disabled',false); 

          Swal.fire({title:'Error', icon:'error', text: 'Data is incorrect',heightAuto:false});

        }
        
      },error:function(status, textStatus, jqXHR,errorThrown){

        if (status.statusText=="timeout") {

          Swal.fire({   
            title: 'Error',
            text: 'Su dispositivo no cuenta con conexion a internet y/o su conexion es demasiado lenta.\n Intentelo de nuevo' ,   
            icon: 'error',   
            heightAuto:false,
            allowOutsideClick: false,
            showCancelButton: false,   
            confirmButtonColor: "#DD6B55",   
            confirmButtonText: "OK",   
            cancelButtonText: "No, Cancelar",   
          }).then((result) => {
        if (result.value) {
            $("#preloader").hide();
            $("#botonrestablecer").attr('disabled',false);
            $("#botonmostrar").attr('disabled',false);

            } 
          });
        }else{
          $("#preloader").hide();
          $("#botonrestablecer").attr('disabled',false);
          $("#botonmostrar").attr('disabled',false);
          Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
        }

      }
    });

  }else{
     
    $("#preloader").hide();
    $("#botonrestablecer").attr('disabled',false);
    $("#botonmostrar").attr('disabled',false);
    Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
  }
}
  MostrarPanel(){
    $("#panelcontraseña").hide();
    $("#panellogin").show();
  }

  async ngOnInit() {
    await this.storage.create();
    $("#panelcontraseña").hide();
  }

}
