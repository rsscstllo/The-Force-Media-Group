/**
 * Created by Gavin on 2/3/16.
 */

'use strict';

(function() {

  class SignUpHeaderController {

    constructor(SignUp) {
      this.SignUp = SignUp;
      this.phoneNumber = undefined;
    }


    createContact() {
      var SignUp = this.SignUp;
      var phoneNumber = this.phoneNumber;
      SignUp.createContact(phoneNumber).success(function(data) {
        console.log(data);

        if(!data.Response.Errors) {
          SignUp.sendConfirmationMessage(phoneNumber).success(function (data) {
            alert("You've subscribed. A confirmation message has been sent to your phone.")
          });
        }
        else if(data.Response.Errors[0] == "PhoneNumber: This phone number is already in your contacts list.") {
          alert("You\'ve already registered");
        }

      });
    }




  }

  angular.module('fmgApp')
    .controller('SignUpHeaderController', SignUpHeaderController);


})();
