// 'use strict';
//
// var proxyquire = require('proxyquire').noPreserveCache();
//
// var bookingFormNewCtrlStub = {
//   index: 'bookingFormNewCtrl.index',
//   show: 'bookingFormNewCtrl.show',
//   create: 'bookingFormNewCtrl.create',
//   update: 'bookingFormNewCtrl.update',
//   destroy: 'bookingFormNewCtrl.destroy'
// };
//
// var routerStub = {
//   get: sinon.spy(),
//   put: sinon.spy(),
//   patch: sinon.spy(),
//   post: sinon.spy(),
//   delete: sinon.spy()
// };
//
// // require the index with our stubbed out modules
// var bookingFormNewIndex = proxyquire('./index.js', {
//   'express': {
//     Router: function() {
//       return routerStub;
//     }
//   },
//   './bookingFormNew.controller': bookingFormNewCtrlStub
// });
//
// describe('BookingFormNew API Router:', function() {
//
//   it('should return an express router instance', function() {
//     bookingFormNewIndex.should.equal(routerStub);
//   });
//
//   describe('GET /api/bookingFormNews', function() {
//
//     it('should route to bookingFormNew.controller.index', function() {
//       routerStub.get
//         .withArgs('/', 'bookingFormNewCtrl.index')
//         .should.have.been.calledOnce;
//     });
//
//   });
//
//   describe('GET /api/bookingFormNews/:id', function() {
//
//     it('should route to bookingFormNew.controller.show', function() {
//       routerStub.get
//         .withArgs('/:id', 'bookingFormNewCtrl.show')
//         .should.have.been.calledOnce;
//     });
//
//   });
//
//   // describe('POST /api/bookingFormNews', function() {
//   //
//   //   it('should route to bookingFormNew.controller.create', function() {
//   //     routerStub.post
//   //       .withArgs('/', 'bookingFormNewCtrl.create')
//   //       .should.have.been.calledOnce;
//   //   });
//   //
//   // });
//
//   describe('PUT /api/bookingFormNews/:id', function() {
//
//     it('should route to bookingFormNew.controller.update', function() {
//       routerStub.put
//         .withArgs('/:id', 'bookingFormNewCtrl.update')
//         .should.have.been.calledOnce;
//     });
//
//   });
//
//   describe('PATCH /api/bookingFormNews/:id', function() {
//
//     it('should route to bookingFormNew.controller.update', function() {
//       routerStub.patch
//         .withArgs('/:id', 'bookingFormNewCtrl.update')
//         .should.have.been.calledOnce;
//     });
//
//   });
//
//   describe('DELETE /api/bookingFormNews/:id', function() {
//
//     it('should route to bookingFormNew.controller.destroy', function() {
//       routerStub.delete
//         .withArgs('/:id', 'bookingFormNewCtrl.destroy')
//         .should.have.been.calledOnce;
//     });
//
//   });
//
// });
