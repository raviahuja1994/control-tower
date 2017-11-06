import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class MapService {
  authToken: any;
  user: any;
  token: any;
  intransit: any;
  status: any;
  shipment: any;

  constructor(
    private http: Http
  ) { }

  getIntransits(intransit){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/users/getintransit', intransit,{headers: headers})
      .map(res => res.json());
  }


  getShipmentsByStatus(status){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/maps/getshipments', status,{headers: headers})
      .map(res => res.json());
  }

  getTrack(shipment){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:4000/maps/track', shipment,{headers: headers})
      .map(res => res.json());
  }

}
