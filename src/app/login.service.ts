import { Injectable }    from '@angular/core';
import { Headers, Http } from '@angular/http';

import { User } from './user'; 

import 'rxjs/add/operator/toPromise';

@Injectable()
export class LoginService {
	//private headers = new Headers([{'Content-Type': 'application/json'}, {'Access-Control-Allow-Origin' : '*'}, {'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS'}, {'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization'}]);
	
	private headers = new Headers({'Content-Type': 'application/json'});

	private userUrl = '/assets/db/user.json';
	

	//private userUrl = 'http://api.flickr.com/services/rest?sort=relevance&parse_tags=1&content_type=7&extras=can_comment%2Ccount_comments%2Ccount_faves%2Cdescription%2Cisfavorite%2Clicense%2Cmedia%2Cneeds_interstitial%2Cowner_name%2Cpath_alias%2Crealname%2Crotation%2Curl_c%2Curl_l%2Curl_m%2Curl_n%2Curl_q%2Curl_s%2Curl_sq%2Curl_t%2Curl_z&per_page=25&page=1&lang=en-US&text=chennai&viewerNSID=&method=flickr.photos.search&csrf=&api_key=dac2adef4f9127104678b626ad39a16a&format=json&hermes=1&hermesClient=1&reqId=cb7a4da0&nojsoncallback=1'
	//private userUrl = 'http://www.omdbapi.com/?t=goldeneye&apikey=ec6483bd';
	
	//private userUrl = 'http://www.imdb.com/xml/find?json=1&nr=1&nm=on&q=jeniffer+garner';

	constructor(private http: Http) { }
	getUsers(): Promise<User[]> {
 	   return this.http.get(this.userUrl)
 	   		  .toPromise()
 	   		  .then(response => response.json() as User[])
 	   		  .catch(this.handleError);
    }

    create(name: string, password: string): Promise<User> {
    	return this.http
	      .put(this.userUrl, JSON.stringify({name: name, password: password}), {headers: this.headers})
	      .toPromise()
	      .then(res => res.json().data as User)
	      .catch(this.handleError);
 	}

    private handleError(error: any): Promise<any> {
    	console.error('An error occurred', error); // for demo purposes only
    	return Promise.reject(error.message || error);
  	}
}