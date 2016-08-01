import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';

@Component({
    selector: 'cc-navbar',
    moduleId: module.id,
    templateUrl: './navbar.component.html',
    directives: [ROUTER_DIRECTIVES]
})
export class NavbarComponent {}
