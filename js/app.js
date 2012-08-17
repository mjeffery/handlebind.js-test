$(document).ready(function() {
	var hb = Handlebind,
		View = Handlebind.View;
	
	var ViewModel = function() {
			var self = this;
		
			this.cssClass =  hb.observable("blue");
			this.firstName = hb.observable("tim");
			this.lastName =  hb.observable("schaffer");
			this.fullName =  hb.computed(function() {
				return '<b>' + this.firstName() + ' ' + this.lastName() + '</b>';
			}, this);
			
			this.showNested = hb.observable(true);
			
			this.toggleNames = function() {
				var first = self.firstName();
				if(first === 'belinda')
					self.firstName('tim');
				else
					self.firstName('belinda');
					
				console.log('first: ' + viewModel.firstName());
				console.log('name: ' + viewModel.fullName());
			};
			
			this.toggleNested = function() {
				self.showNested(!self.showNested());
				console.log('show:' + self.showNested());
			};
			
			this.toggleColors = function() {
				var color = self.cssClass();
				self.cssClass(color === 'red' ? 'blue' : 'red');
			}
			
			this.nested = {
				firstName: hb.observable('lola'),
				lastName: hb.observable('perkins'),
				isSelected: hb.observable(false)
			}
			this.nested.fullName=  hb.computed(function() {
				return '<b>' + this.firstName() + ' ' + this.lastName() + '</b>';
			}, this.nested);
			
			this.nested.setIsSelected= function() {
				self.nested.isSelected(true);
				console.log("set isSelected");
			}
		}
	
	var viewModel = new ViewModel();
	var view = new View('test-template', viewModel);
	view.appendTo('#app-container');
});