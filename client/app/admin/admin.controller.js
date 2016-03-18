'use strict';

(function() {

class AdminController {

  constructor(User, $scope) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.scope = $scope;
  }

  // Update colors in database with new ones
  saveCustomColorTheme() {
    console.log('save button clicked');
    console.log(this.scope.customColor1);
    console.log(this.scope.customColor2);
    console.log(this.scope.customColor3);
    console.log(this.scope.customColor4);
    console.log(this.scope.customColor5);
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('fmgApp.admin')
  .controller('AdminController', AdminController);

})();
