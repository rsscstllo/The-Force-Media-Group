'use strict';

(function() {

class AdminController {

  constructor(User) {
    // Use the User $resource to fetch all users
    this.users = User.query();

    // Initialize colors to default colors
    this.customColor1 = "#094d74";
    this.customColor2 = "#759cd8";
    this.customColor3 = "#9cb9d1";
    this.customColor4 = "#cfdaec";
    this.customColor5 = "#eef0f6";
  }

  saveCustomColorTheme() {
    console.log('save button clicked');
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('fmgApp.admin')
  .controller('AdminController', AdminController);

})();
