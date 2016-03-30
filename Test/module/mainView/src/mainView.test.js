describe('mainView', function() {

  var Test = {
    moduleName: 'mainView',
    scope: {},
    controller: null,
    element: null,
    beforeEach: function (){
    },
    inject: {
      controller: function ($controller,$rootScope){
        Test.controller = $controller('mainViewController', {
          $scope: Test.scope,
          $rootScope: $rootScope
        });
      },
      directive: function ($rootScope, $compile){
        var scope = $rootScope.$new();
        Test.element = '<main-view></main-view>';
        Test.element = $compile(Test.element)(scope);
        scope.$digest();
      }
    },
    unit: {
      controller: {
        describeTitle: 'mainViewController()',
        hasController: {
          title: 'controller exists',
          execute: function () {
            assert(Test.controller);
            assert(Test.controller.init);
          } 
        }
      },
      directive: {
        describeTitle: '<main-view>',
        hasElement: {
          title: 'directive exists',
          execute: function () {
             assert(Test.element);
          }
        },
        hasExampleComponent: {
          title: '<example-component> loaded',
          execute: function () {
             assert(Test.element.find('example-component'));
          }
        }
      }
    }
  };

  UnitTester.add(Test);
})