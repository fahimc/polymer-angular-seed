(function (){

	var TestSetup = {
		init: function (){
			this.setGlobal();
			document.addEventListener('DOMContentLoaded',this.onReady.bind(this));	
		},
		setGlobal: function (){
			window.expect = chai.expect;
			window.assert = chai.assert;
			mocha.setup('bdd');
		},
		onReady: function () {
			mocha.run();
		}
	};

	TestSetup.init();
})();

