import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {MapService} from "../../services/map.service";
import {Router} from "@angular/router";
import {FlashMessagesService} from "angular2-flash-messages";
import {promise} from "selenium-webdriver";
import all = promise.all;
declare var google: any;


@Component({
  selector: 'app-googletrack',
  templateUrl: './googletrack.component.html',
  styleUrls: ['./googletrack.component.css']
})



export class GoogletrackComponent implements OnInit {
  trackbystatus:String;
  shipmentids:any[];
  selectedshipments: any[];
  jsonArr = [];
  flag: false;
  map: any;
  myLatLng: any;
  markers = [];
  id: any;


  constructor(
    private authService:AuthService,
    private mapService:MapService,
    private router:Router,
    private flashMessageService:FlashMessagesService
  ) {
  }


    ngOnInit() {

      this.populateShipmentListdefault();
      this.myLatLng = {lat:22.55314748, lng:77.54150391};
      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 3,
        center: this.myLatLng
      });

    }
/*onSearchSubmit(){
    const getstatus = {
      trackbystatus:this.trackbystatus
    }

  this.authService.searchforstatus(getstatus).subscribe(data => {
    if(data.success) {


      this.flashMessageService.show(data.shipment.shipmentid, {cssClass: 'alert-danger'});

    }else{
      window.alert("no");
    }
  });
}
*/
  onRowClick(event){
    console.log(event);
    // setTimeout(this.markers[event.data.shipmentid].setAnimation(google.maps.Animation.BOUNCE), 200);
    this.markers[event.data.shipmentid].setAnimation(google.maps.Animation.BOUNCE);
    this.stopAnimation(this.markers[event.data.shipmentid]);
  }


  stopAnimation(marker) {
    setTimeout(function () {
      marker.setAnimation(null);
    }, 3000);
  }

  onRowSelect(event) {

    const intransit = {
      shipmentid:event.data.shipmentid
    }
    this.drawMarkers(intransit);
  }

  drawMarkers(intransit){
    this.mapService.getTrack(intransit).subscribe(data=>{
      if(data.success){
        if(data.intransit.length < 1){
          this.flashMessageService.show("No data for this shipment", {cssClass:'alert-danger'});
        }

        //this.flashMessageService.show(data.intransit[1].shipment, {cssClass:'alert-success'});
        for (var i = 0; i < data.intransit.length; i++) {
          var position = data.intransit[i];
          this.jsonArr.push({lat:parseFloat(position.lat),lng:parseFloat(position.lng)});

          this.myLatLng = {lat:parseFloat(data.intransit[i].lat), lng:parseFloat(data.intransit[i].lng)};
          this.map.setZoom(5);
          this.map.setCenter(this.myLatLng);

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
            icon: iconBase + 'truck1.png',
            //label: position.shipmentid,
            animation: google.maps.Animation.DROP,
            map: this.map
          });
            marker.metadata = { id: position.shipmentid };
            this.markers[position.shipmentid] = marker;
        }

      }else{
        this.flashMessageService.show("Something went wrong buddy", {cssClass:'alert-danger'});
      }
    });
  }


  onTableHeaderCheckboxToggle(event) {
    if (event.checked) {
      for (var i = 0; i < this.shipmentids.length; i++) {
        const intransit = {
          shipmentid:this.shipmentids[i].shipmentid
        }
        this.drawMarkers(intransit);
      }
    } else {
      if(this.shipmentids.length > 0) {
        for (var i = 0; i < this.shipmentids.length; i++) {
          this.markers[this.shipmentids[i].shipmentid].setMap(null);
          delete this.markers[this.shipmentids[i].shipmentid];
        }
      }
    }
  }

  onRowUnselect(event) {
    if(this.markers[event.data.shipmentid]){
      this.markers[event.data.shipmentid].setMap(null);
      delete this.markers[event.data.shipmentid];
    }
  }

  deleteMarkers() {
  this.clearMarkers();
  this.markers = [];
}

  clearMarkers() {
  this.setMapOnAll(null);
}

  setMapOnAll(map) {
  for (var i = 0; i < this.markers.length; i++) {
    this.markers[i].setMap(map);
  }
}


  populateShipmentList(){
    var shipmentids = [];
    const status = {
      "status":this.trackbystatus
    };

    this.mapService.getShipmentsByStatus(status).subscribe(data=> {
        if(data.success){
          if(data.shipments.length < 1){
            this.flashMessageService.show("No Shipments with this status", {cssClass:'alert-danger'});
          }

          for (var i = 0; i < data.shipments.length; i++) {
            var shipment = data.shipments[i];
            shipmentids.push({shipmentid:shipment.shipmentid});
            this.shipmentids=shipmentids;
          }
        }else{
          this.flashMessageService.show("Something went wrong", {cssClass:'alert-danger'});
        }
      },
      err => {console.log(err);
        return false;
      });
  }
  populateShipmentListdefault(){
    var shipmentids = [];
    const status = {
      "status": ""
    };

    this.mapService.getShipmentsByStatus(status).subscribe(data=> {
        if(data.success){
          if(data.shipments.length < 1){
            this.flashMessageService.show("No Shipments with this status", {cssClass:'alert-danger'});
          }

          for (var i = 0; i < data.shipments.length; i++) {
            var shipment = data.shipments[i];
            shipmentids.push({shipmentid:shipment.shipmentid});
            this.shipmentids=shipmentids;
          }
        }else{
          this.flashMessageService.show("Something went wrong", {cssClass:'alert-danger'});
        }
      },
      err => {console.log(err);
        return false;
      });
  }

}
