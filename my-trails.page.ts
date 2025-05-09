import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TrailsService } from '../../services/trails.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-my-trails',
  templateUrl: './my-trails.page.html',
  styleUrls: ['./my-trails.page.scss']
})
export class MyTrailsPageComponent implements OnInit, AfterViewInit {
  trails: any[] = [];

  @ViewChild('contentArea', { static: false }) contentArea?: ElementRef;
  @ViewChild('someElement', { static: false }) someElement?: ElementRef;

  constructor(private trailsService: TrailsService) {}

  ngOnInit() {
    this.loadTrails();
  }

  ngAfterViewInit(): void {
    if (this.contentArea?.nativeElement) {
      this.contentArea.nativeElement.setAttribute('class', 'loaded');
    }
    if (this.someElement?.nativeElement) {
      this.someElement.nativeElement.setAttribute('class', 'my-class');
    }
  }

  loadTrails() {
    this.trailsService.getVisitedTrails().subscribe(data => {
      this.trails = data;
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.trails, event.previousIndex, event.currentIndex);
  }

  deleteTrail(index: number) {
    const removedTrail = this.trails.splice(index, 1)[0];
    if (removedTrail?.id) {
      this.trailsService.removeVisitedTrail(removedTrail.id);
    }
  }
}