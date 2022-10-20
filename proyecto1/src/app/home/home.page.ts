import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from "../app.component";
import { IonContent } from '@ionic/angular';
import Swal from 'sweetalert2';
import * as $ from "jquery";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

 
  BaseUrl = this.Link.BaseLink();

  @ViewChild(IonContent, { static: false }) private content: IonContent; 

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  carreras = []; 

  constructor(private storage: Storage,private Link: AppComponent) { 
    this.CarreraList();
  }

    CheckPhone($event){

    var Phone = $("#phonecarrera").val();
    var PhoneLength = Phone.length;

    if (PhoneLength<10 || PhoneLength>10) {

        Swal.fire({title:'Error', icon:'error', text: 'The phone provided is longer or shorter than 10 characters, please try again',heightAuto:false});
        $("#phonecarrera").val("");
    }

  }

  CheckEmail($event){


    var validRegex = "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
    var Email = $("#email").val();

     if (!Email.match(validRegex)) {

        Swal.fire({title:'Error', icon:'error', text: 'The email provided is not a valid email please provide a valid email',heightAuto:false});
        $("#email").val("");

     }

  }

  Checkcarrera($event){

    var carrera = $("#carrera").val();

    if(carrera!=""){

      $.ajax({
        url:this.BaseUrl+"index.php/Carreras/CheckcarreraBD",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{carrera:carrera},
        async: true,
        success:(data) =>{

          var obj = JSON.parse(data);

          if(obj!=""){

            Swal.fire({title:'Error', icon:'error', text: 'The user name is already in use, please try again',heightAuto:false});
            $("#carrera").val("");

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
              

                } 
            });
          }else{
            
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }

        }
      });

    }

  }

  SaveCarrera(){
    
    var name = $('#namecarrera').val();
    var duracion = $('#duracion').val();
    var tcarrera = $('#tcarrera').val();
    var phone = $('#phonecarrera').val();


    $('#preloader').show();
    $('#savebuttoncarrera').attr('disabled',true);

    if(name!="" && duracion!="" && tcarrera!="" && phone!=""){

      $.ajax({
        url:this.BaseUrl+"index.php/Carreras/SaveCarrera",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{namecarrera:name,duracion:duracion,tcarrera:tcarrera,phonecarrera:phone},
        async: true,
        success:(data) =>{
        $('#preloader').hide();
          $('#savebuttoncarrera').attr('disabled',false);

          Swal.fire({title:'Success', icon:'success', text: 'User has been saved successfully',heightAuto:false});

          $('#savebuttoncarrera').val("");
          $('#namecarrera').val("");
          $('#duracion').val("");
          $('#tcarrera').val("");
          $('#phonecarrera').val("");
          this.CarreraList();

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
              $("#savebuttoncarrera").attr('disabled',false);

                } 
            });
          }else{
            $("#preloader").hide();
            $("#savebuttoncarrera").attr('disabled',false);
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }

        }
      });


    }else{

      $("#preloader").hide();
      $("#savebuttoncarrera").attr('disabled',false);
      Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
    }

  }

 CarreraList(){

    $.ajax({
      url:this.BaseUrl+"index.php/Carreras/ActiveCarrerasList",
      type:'GET',
      crossDomain: true,
      timeout: 30000,
      async: true,
      success:(data) =>{

        var obj = JSON.parse(data);

        if(obj != ""){

            this.carreras = JSON.parse(data);

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
                

              } 
          });
        }else{

          Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
        }
      }
  
    });
  }

  EditCarrera(id){

    var id = id;

    $.ajax({
      url:this.BaseUrl+"index.php/Carreras/CarreraById",
      type:'POST',
      data:{id:id},
      crossDomain: true,
      timeout: 30000,
      async: true,
      success:(data) =>{

        var obj = JSON.parse(data);

        if(obj != ""){

          $("#savebuttoncarrera").hide();

          var id = obj[0].id_carrera;
          var name = obj[0].namecarrera;
          var duracion = obj[0].duracion;
          var tcarrera = obj[0].tcarrera;
          var phone = obj[0].phonecarrera;


          $("#id_c").val(id);
          $("#namecarrera").val(name);
          $("#duracion").val(duracion);
          $("#tcarrera").val(tcarrera);
          $("#phonecarrera").val(phone);


          $("#updatebuttoncarrera").attr("hidden",false);

          this.content.scrollToTop(); 

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
                

              } 
          });
        }else{

          Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
        }
      }
  
    });

  }

  UpdateCarrera(){

    var id = $('#id_c').val();
    var name = $('#namecarrera').val();
    var duracion = $('#duracion').val();
    var tcarrera = $('#tcarrera').val();
    var phone = $('#phonecarrera').val();


    $('#preloader').show();
    $('#updatebuttoncarrera').attr('disabled',true);

    if(id!="" && name!="" && duracion!="" && tcarrera!="" && phone!=""){

      $.ajax({
        url:this.BaseUrl+"index.php/Carreras/EditCarrera",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{id:id,namecarrera:name,duracion:duracion,tcarrera:tcarrera,phonecarrera:phone},
        async: true,
        success:(data) =>{

          $('#preloader').hide();
          $('#updatebuttoncarrera').attr('disabled',false);

          Swal.fire({title:'Success', icon:'success', text: 'User has been updated successfully',heightAuto:false});

          $('#id_c').val("");
          $('#namecarrera').val("");
          $('#duracion').val("");
          $('#tcarrera').val("");
          $('#phonecarrera').val("");


          $("#savebuttoncarrera").show();
          $("#updatebuttoncarrera").attr("hidden",true);

          this.CarreraList();

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
              $("#updatebuttoncarrera").attr('disabled',false);

                } 
            });
          }else{
            $("#preloader").hide();
            $("#updatebuttoncarrera").attr('disabled',false);
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }

        }
      });


    }else{

      $("#preloader").hide();
      $("#updatebuttoncarrera").attr('disabled',false);
      Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
    }
  }

  async DeleteCarrera(id){

    var id2 = id;

    $.ajax({
      url:this.BaseUrl+"index.php/Carreras/DeleteCarreraBD",
      type:'POST',
      data:{id2:id2},
      crossDomain: true,
      timeout: 30000,
      async: true,
      success:(data) =>{

        var obj = JSON.parse(data);

        if(obj=="TRUE"){

          Swal.fire({title:'Error', icon:'error', text: 'You can not delete your own user' ,heightAuto:false});
        this.CarreraList();
        }else{

          Swal.fire({title:'Success', icon:'success', text: 'User has been deleted successfully',heightAuto:false});
        this.CarreraList();
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
                

              } 
          });
        }else{

          Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
        }
      }
      
    });

  }


  async ngOnInit() {

    await this.storage.create();

  }

}
