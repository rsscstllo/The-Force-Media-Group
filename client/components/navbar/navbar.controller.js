'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }, {
	'title': 'About Me',
	'state': 'bio'
  }, {
	'title': 'Blog',
	'state': 'blog'
  }, {
	'title': 'Booking',
	'state': 'booking'
  }, {
	'title': 'Store',
	'state': 'store'
  }
  
  ];


  isCollapsed = true;
  //end-non-standard

  constructor(Auth) {
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
  }
}

angular.module('fmgApp')
  .controller('NavbarController', NavbarController);
