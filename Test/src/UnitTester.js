var UnitTester = {
	moduleName: 'app',
	init: function (){
		beforeEach(this.beforeEach.bind(this));
		this.run.call(this._Test);
	},
	setInjector: function () {
		for (var key in this.inject){
			inject(this.inject[key]);
		}
	},
	run: function () {
		for (var key in this.unit){
			var currentUnit = this.unit[key];
			describe(currentUnit.describeTitle, function () {
				for (var key in currentUnit){
					if(key !== 'describeTitle')
					{
						it(currentUnit[key].title,currentUnit[key].execute);
					}
				}
			});
		}
	},
	beforeEach: function (){
		var app = module(this.moduleName);
		this.setInjector.call(this._Test);
		if(this._Test.beforeEach)this._Test.beforeEach();
	},
	_Test: {},
	add: function (Test) {
		this._Test = Test;
		this.init();
	}
};
