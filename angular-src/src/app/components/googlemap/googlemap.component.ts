import {Component, OnChanges, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";

declare var google: any;

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})

export class GooglemapComponent implements OnInit {
  shipmentid: String;

  constructor(
    private authService:AuthService,
    private router:Router,
    private flashMessageService:FlashMessagesService
  ) {
  }

  ngOnInit() {
      var myLatLng = {lat:22.55314748, lng:77.54150391};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: myLatLng
      });
  }

  onGoogleMapSubmit(){

    const intransit = {
      shipmentid: this.shipmentid
    }

    var flightPlanCoordinates = "";
    var jsonArr = [];
    this.authService.getIntransits(intransit).subscribe(data=>{
      if(data.success){
        if(data.intransit.length < 1){
          this.flashMessageService.show("No data for this shipment", {cssClass:'alert-danger'});
        }
        var myLatLng = {lat:parseFloat(data.intransit[0].lat), lng:parseFloat(data.intransit[0].lng)};
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 10,
          center: myLatLng
        });
        //this.flashMessageService.show(data.intransit[1].shipment, {cssClass:'alert-success'});
        for (var i = 0; i < data.intransit.length; i++) {
          var position = data.intransit[i];
          jsonArr.push({lat:parseFloat(position.lat),lng:parseFloat(position.lng)});

          var iconBase = '../assets/';
          var icons = {
            intransit: {
              icon: iconBase + 'pin.png'
            },
            library: {
              icon: iconBase + 'library_maps.png'
            },
            info: {
              icon: iconBase + 'info-i_maps.png'
            }
          };

          var marker = new google.maps.Marker({
            position: {lat:+position.lat, lng:+position.lng},
            icon: iconBase + 'pin.png',
            // label: beach,
            map: map
          });
        }


        var flightPath = new google.maps.Polyline({
          path: jsonArr,
          geodesic: true,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        flightPath.setMap(map);


      }else{
        this.flashMessageService.show("Something went wrong buddy", {cssClass:'alert-danger'});
      }
    });

  }
}
