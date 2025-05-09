import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class TrailsService {

  apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

  constructor(private http: HttpClient, private firestore: AngularFirestore) {}

  getNearbyTrails(lat: number, lon: number): Observable<any> {
    return this.http.get(
      `https://www.hikingproject.com/data/get-trails?lat=${lat}&lon=${lon}&maxDistance=10&key=${this.apiKey}`
    );
  }

  saveVisitedTrail(trail: any) {
    return this.firestore.collection('visitedTrails').add(trail);
  }

  getVisitedTrails() {
    return this.firestore.collection('visitedTrails').snapshotChanges().pipe(
      // Add .map to include the document ID in the returned data
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as { [key: string]: any };
        const id = a.payload.doc.id;
        return { id, ...data };

      }))
    );
  }

  removeVisitedTrail(trailId: string) {
    return this.firestore.collection('visitedTrails').doc(trailId).delete();
  }
}
