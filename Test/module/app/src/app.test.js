describe('app', function() {

  var Test = {
    moduleName: 'app',
    scope: {},
    controller: null,
    element: null,
    inject: {
      controller: function ($controller,$rootScope){
        Test.controller = $controller('appController', {
          $scope: Test.scope,
          $rootScope: $rootScope
        });
      },
      directive: function ($rootScope, $compile){
        var scope = $rootScope.$new();
        Test.element = '<div></div>';
        Test.element = $compile(Test.element)(scope);
        scope.$digest();
      }
    },
    unit: {
      controller: {
        describeTitle: 'appController()',
        hasController: {
          title: 'controller exists',
          execute: function () {
            assert(Test.controller);
            assert(Test.controller.init);
          } 
        }
      },
      directive: {
        describeTitle: 'Directive',
        hasElement: {
          title: 'directive exists',
          execute: function () {
          }
        }
      }
    }
  };

  UnitTester.add(Test);
})