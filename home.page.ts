import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { TrailsService } from '../../services/trails.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html'
})
export class HomePage implements OnInit {
  trails: any[] = [];

  constructor(
    private geo: Geolocation,
    private trailsService: TrailsService
  ) {}

  ngOnInit() {
    this.geo.getCurrentPosition().then(pos => {
      this.trailsService.getNearbyTrails(pos.coords.latitude, pos.coords.longitude).subscribe(data => {
        this.trails = data.trails;
      });
    }).catch(err => {
      console.error('Error getting location', err);
    });
  }
}