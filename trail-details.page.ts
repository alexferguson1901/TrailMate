import { AfterViewInit, Component, ViewChild, ElementRef } from '@angular/core';
import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { TrailsService } from '../../services/trails.service';

@Component({
  selector: 'app-trail-details',
  templateUrl: './trail-details.page.html',
  styleUrls: ['./trail-details.page.scss']
})
export class TrailDetailsPageComponent implements AfterViewInit {
  photos: string[] = [];

  @ViewChild('contentArea', { static: false }) contentArea?: ElementRef;
  @ViewChild('someElement', { static: false }) someElement?: ElementRef;

  constructor(private camera: Camera, private trailsService: TrailsService) {}

  ngAfterViewInit(): void {
    if (this.contentArea?.nativeElement) {
      this.contentArea.nativeElement.setAttribute('class', 'trail-details-loaded');
    }
    if (this.someElement?.nativeElement) {
      this.someElement.nativeElement.setAttribute('class', 'my-class');
    }
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL
    };

    this.camera.getPicture(options).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.photos.push(base64Image);
    }).catch(err => {
      console.log('Camera issue:', err);
    });
  }

  saveTrail() {
    const trail = { name: 'Example Trail', photos: this.photos };
    this.trailsService.saveVisitedTrail(trail);
    alert("Trail Saved!");
  }
}
