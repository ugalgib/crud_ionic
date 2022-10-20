import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from "jquery";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  URL_Link = "http://localhost/BACKEND_PROYECTO/";

  constructor(private router: Router, private storage: Storage, private platform: Platform) {
    this.initializeApp();
  }

  BaseLink(){
    return this.URL_Link;

  }

  initializeApp() {
    this.platform.ready().then(async() => {

      this.platform.backButton.subscribeWithPriority(9999, () => {
        document.addEventListener('backbutton', function (event) {
          event.preventDefault();
          event.stopPropagation();
          console.log('hello');
        }, false);
      });

      await this.storage.create();

    });
  }
  
  

  async LogOut(){
    // alert("Close session event ");
    let usuario =  await this.storage.get('user');

    $.ajax({
      url:this.URL_Link+"index.php/Session/logout",
      type:'POST',
      crossDomain: true,
      timeout: 30000,
      data:{usuario:usuario},
      async: true,
      success:(data) =>{

        this.storage.clear();

        if (this.platform.is('ios')) {

          this.router.navigate(['/login']);

          }else if(this.platform.is('mobileweb')){
              
              this.router.navigate(['/login']);

            }else if(this.platform.is('android')){

              navigator['app'].exitApp();
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
