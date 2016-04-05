describe('moduleName', function() {

  var Test = {
    moduleName: 'moduleName',
    scope: {},
    controller: null,
    element: null,
    beforeEach: function (){
    },
    inject: {
      controller: function ($controller){
        Test.controller = $controller('moduleNameController', {
          $scope: Test.scope
        });
      },
      directive: function ($rootScope, $compile){
        var scope = $rootScope.$new();
        Test.element = '<module-name></module-name>';
        Test.element = $compile(Test.element)(scope);
        scope.$digest();
      }
    },
    unit: {
      controller: {
        describeTitle: 'moduleNameController()',
        hasController: {
          title: 'controller exists',
          execute: function () {
            assert(Test.controller);
            assert(Test.controller.init);
          } 
        }
      },
      directive: {
        describeTitle: '<module-name>',
        hasElement: {
          title: 'directive exists',
          execute: function () {
             assert(Test.element);
          }
        }
      }
    }
  };

  UnitTester.add(Test);
})