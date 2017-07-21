import { Component  } from '@angular/core';
import { Router }   from '@angular/router';
import { DashboardService } from './dashboard.service';
import { Pictures } from './pictures';


@Component({
    templateUrl: 'dashboard.component.html',
    providers: [DashboardService]
})

export class DashboardComponent {
	dashboard = 'Hello....';
	dashboardView = true;
	searchmodel = {
		value : '',
		username:''
	}

	picturesList : Pictures[];

	constructor(private router: Router, private dashboardService: DashboardService) {
		
	}


	onSearch(searchValue: string) {
	    this.dashboardService.getPictures(searchValue).then(picturesList => {
	    	this.picturesList = picturesList;
	    });
	}

	onLogout() {
		this.dashboardView = false;
		this.router.navigateByUrl('/logout')
	}
}