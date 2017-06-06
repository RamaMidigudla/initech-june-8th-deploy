import { Component, OnInit } from '@angular/core';
import { ServiceRequestInfoService } from 'app/service/service-request-info.service';
import { ServiceRequest } from '../model/serviceRequest';
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { WindowRef } from '../service/window.service';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-view-service-request',
  templateUrl: './view-service-request.component.html'
})
export class ViewServiceRequestComponent implements OnInit {

  serviceRequest;
  nativeWindow: any

  constructor(private serviceRequestInfoService: ServiceRequestInfoService,
    private router: Router,
    private route: ActivatedRoute,
    private winRef: WindowRef) {
      this.nativeWindow = winRef.getNativeWindow();
    }

  

  ngOnInit() {
    this.serviceRequestInfoService.getBySRId(this.route.snapshot.params['serviceRequestId'])
      .subscribe(serviceRequest => this.serviceRequest = serviceRequest);
  }



 onSelect(serviceRequestId) {
    //var newWindow = this.nativeWindow.open('/#/link');
     //newWindow.location = 
     this.router.navigate(['/threeViewer', serviceRequestId]);
  }

  onSelectThermal(serviceRequestId) {
    this.router.navigate(['/viewThermal', serviceRequestId]);
  }

   onSelectSketch(serviceRequestId) {
    this.serviceRequestInfoService.getSketch(serviceRequestId)
    .subscribe(res => {
        saveAs(res, 'sketch.png');
    })
  }


}
