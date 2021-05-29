import { Injectable } from '@angular/core';

/*
    Just a simple service that keeps some global variables.
 */

@Injectable({
    providedIn: 'root'
})
export class Globals {
    globalEventDistributor: any;
    apiEndPoint;
}
