'use strict';

(function() {

class AdminController {

  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();

    this.customColor1 = "";
    this.customColor2 = "";
    this.customColor3 = "";
    this.customColor4 = "";
    this.customColor5 = "";
  }

  saveCustomColorTheme() {
    console.log('save button clicked');
    // this.customColor1 = customColor1;
    // this.customColor2 = customColor2;
    // this.customColor3 = customColor3;
    // this.customColor4 = customColor4;
    // this.customColor5 = customColor5;

    console.log(this.customColor1);
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('fmgApp.admin')
  .controller('AdminController', AdminController);

})();
