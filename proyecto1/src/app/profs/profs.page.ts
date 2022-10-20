import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from "../app.component";
import { IonContent } from '@ionic/angular';
import Swal from 'sweetalert2';
import * as $ from "jquery";

@Component({
  selector: 'app-profs',
  templateUrl: './profs.page.html',
  styleUrls: ['./profs.page.scss'],
})
export class ProfsPage implements OnInit {

 
  BaseUrl = this.Link.BaseLink();

  @ViewChild(IonContent, { static: false }) private content: IonContent; 

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  profs = []; 
  profesores: any;

  constructor(private storage: Storage,private Link: AppComponent) { 
    this.ProfList();
  }

    CheckPhone($event){

    var Phone = $("#phone").val();
    var PhoneLength = Phone.length;

    if (PhoneLength<10 || PhoneLength>10) {

        Swal.fire({title:'Error', icon:'error', text: 'The phone provided is longer or shorter than 10 characters, please try again',heightAuto:false});
        $("#phone").val("");
    }

  }

  CheckEmail($event){


    var validRegex = "[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})";
    var Email = $("#emailprof").val();

     if (!Email.match(validRegex)) {

        Swal.fire({title:'Error', icon:'error', text: 'The email provided is not a valid email please provide a valid email',heightAuto:false});
        $("#emailprof").val("");

     }

  }

  CheckProf($event){

    var prof = $("#prof12").val();

    if(prof!=""){

      $.ajax({
        url:this.BaseUrl+"index.php/Profesores/CheckProfBD",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{prof:prof},
        async: true,
        success:(data) =>{

          var obj = JSON.parse(data);

          if(obj!=""){

            Swal.fire({title:'Error', icon:'error', text: 'The user name is already in use, please try again',heightAuto:false});
            $("#user12").val("");

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

  SaveProf(){
    
    var name = $('#nameprof').val();
    var lastname = $('#lastnameprof').val();
    var email = $('#emailprof').val();


    $('#preloader').show();
    $('#savebuttonprof').attr('disabled',true);

    if(name!="" && lastname!="" && email!=""){

      $.ajax({
        url:this.BaseUrl+"index.php/Profesores/SaveProf",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{nameprof:name,lastnameprof:lastname,emailprof:email},
        async: true,
        success:(data) =>{
        $('#preloader').hide();
          $('#savebuttonprof').attr('disabled',false);

          Swal.fire({title:'Success', icon:'success', text: 'User has been saved successfully',heightAuto:false});

          $('#savebuttonprof').val("");
          $('#nameprof').val("");
          $('#lastnameprof').val("");
          $('#emailprof').val("");
          this.ProfList();

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
              $("#savebuttonprof").attr('disabled',false);

                } 
            });
          }else{
            $("#preloader").hide();
            $("#savebuttonprof").attr('disabled',false);
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }

        }
      });


    }else{

      $("#preloader").hide();
      $("#savebuttonprof").attr('disabled',false);
      Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
    }

  }

  ProfList(){

    $.ajax({
      url:this.BaseUrl+"index.php/Profesores/ActiveProfList",
      type:'GET',
      crossDomain: true,
      timeout: 30000,
      async: true,
      success:(data) =>{

        var obj = JSON.parse(data);

        if(obj != ""){

            this.profesores = JSON.parse(data);

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

  EditProf(id){

    var id = id;

    $.ajax({
      url:this.BaseUrl+"index.php/Profesores/ProfById",
      type:'POST',
      data:{id:id},
      crossDomain: true,
      timeout: 30000,
      async: true,
      success:(data) =>{

        var obj = JSON.parse(data);

        if(obj != ""){

          $("#savebuttonprof").hide();

          var id = obj[0].id_prof;
          var name = obj[0].nameprof;
          var lastname = obj[0].lastnameprof;
          var email = obj[0].emailprof;

          $("#id_p").val(id);
          $("#nameprof").val(name);
          $("#lastnameprof").val(lastname);
          $("#emailprof").val(email);

          $("#updatebuttonprof").attr("hidden",false);

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

  UpdateProf(){

    var id = $('#id_p').val();
    var name = $('#nameprof').val();
    var lastname = $('#lastnameprof').val();
    var email = $('#emailprof').val();


    $('#preloader').show();
    $('#updatebuttonprof').attr('disabled',true);

    if(id!="" && name!="" && lastname!="" && email!="" ){

      $.ajax({
        url:this.BaseUrl+"index.php/Profesores/EditProf",
        type:'POST',
        crossDomain: true,
        timeout: 30000,
        data:{id:id,nameprof:name,lastnameprof:lastname,emailprof:email},
        async: true,
        success:(data) =>{

          $('#preloader').hide();
          $('#updatebuttonprof').attr('disabled',false);

          Swal.fire({title:'Success', icon:'success', text: 'User has been updated successfully',heightAuto:false});

          $('#id_p').val("");
          $('#nameprof').val("");
          $('#lastnameprof').val("");
          $('#emailprof').val("");


          $("#savebuttonprof").show();
          $("#updatebuttonprof").attr("hidden",true);

          this.ProfList();

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
              $("#updatebuttonprof").attr('disabled',false);

                } 
            });
          }else{
            $("#preloader").hide();
            $("#updatebuttonprof").attr('disabled',false);
            Swal.fire({title:'Error', icon:'error', text: 'An internal server error has occurred please contact the site admin',heightAuto:false});
          }

        }
      });


    }else{

      $("#preloader").hide();
      $("#updatebuttonprof").attr('disabled',false);
      Swal.fire({title:'Warning', icon:'warning', text: 'There is missing info on the form',heightAuto:false});
    }
  }

  async DeleteProf(id){

    var id2 = id;

    let prof =  await this.storage.get('prof');

    $.ajax({
      url:this.BaseUrl+"index.php/Profesores/DeleteProfBD",
      type:'POST',
      data:{id2:id2,prof:prof},
      crossDomain: true,
      timeout: 30000,
      async: true,
      success:(data) =>{

        var obj = JSON.parse(data);

        if(obj=="TRUE"){

          Swal.fire({title:'Error', icon:'error', text: 'You can not delete your own user' ,heightAuto:false});

        }else{

          Swal.fire({title:'Success', icon:'success', text: 'User has been deleted successfully',heightAuto:false});
          this.ProfList();
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