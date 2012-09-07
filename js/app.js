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
			this.isLeader = hb.observable(false);
			this.toggleLeader = function() { self.isLeader(!self.isLeader()); };
			
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
			
			this.editable = hb.observable(true);
			this.editableToggleButtonName = hb.observable('disable');
			this.setIsEditable = function() {
				var value = self.editable();
				
				self.editable(!value);
				self.editableToggleButtonName (!value ? 'disable' : 'enable');
				
				console.log('editable: ' + !value);
			}
			
			this.notEditable = hb.observable(false);
			this.notEditableToggleButtonName = hb.observable('disable');
			this.setIsNotEditable = function() {
				var value = self.notEditable();
				
				self.notEditable(!value);
				self.notEditableToggleButtonName (!value ? 'enable' : 'disable');
				
				console.log('notEditable: ' + !value);
			}
			
			this.select = {
				caption: hb.observable("Select an item..."),
				options: hb.observableArray([{text: hb.observable('Item One')}])
			};
			this.select.addOption = function() {
				console.log('adding item');
				self.select.options.push({ 
					text: hb.observable(),
					focused: true //simple hack to allow auto-focusing on add
				});
			};
			this.select.removeOption = function(event, item) {
				console.log('removing item'); //TODO figure out how to get the index
				self.select.options.remove(item);
			};
			
			
			this.select.captionText = hb.computed(function() {
				var text = self.select.caption();
				return _.isString(text) ? text : "";
			});
		}
	
	var viewModel = new ViewModel();
	var view = new View('test-template', viewModel);
	view.appendTo('#app-container');
});
