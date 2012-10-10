$(document).ready(function() {
	var hb = Handlebind;

	var ApplicationModel = function(options) {
		
		this.pages = hb.observableArray([]);
		
		this.title = hb.observable('Untitled');
		this.template = hb.observable('EmptyPage');
		this.context = hb.observable({});
		
		var self = this;
		this.addPage = function(page) {
			page = page || {};
			
			_.defaults(page, {
				title: 'Untitled',
				template: 'EmptyPage',
				context: {}
			});
			
			page.link = '#' + page.title;
			
			self.pages.push(page);
		};
		
		this.setPage = function(index) {
			var page = self.pages()[index];
			if(page) {
				self.title(page.title);
				self.template(page.template);
				self.context(page.context);
			}
		}
	};

	var ListModel = function(options) {
		options = options || {};
		
		_.defaults(options, {
			title: 'Untitled List',
			items: [],
			itemTemplate: 'Item'
		});
		
		this.title = hb.observable(options.title);
		this.style = hb.observable(options.style);
		this.items = hb.observableArray(options.items);	
		this.itemTemplate = hb.observable(options.itemTemplate);
		
		this.newItem = hb.observable();
		
		var self = this;
		this.addItem = function() {
			var item = self.newItem();
			if(_.isString(item) && item.length > 0) {
				self.items.push(hb.observable(item));
				self.newItem();
			}
		}
		
		//XXX this targeting behavior of templates is not useful for events... (or maybe anything else)
		this.removeItem = function(event, template) {
			//XXX the binding objects to the name and context are being sanitized...
			var items = self.items();
			var index = _(items).map(function(item) { return item(); }).indexOf(template.context);
			
			if(index >= 0) {
				items.splice(index, 1);
				self.items(items);
			}
		}
	};
	
	var ReportModel = function(options) {
		options = options || {};
		
		_.defaults(options, {
			name: 'John Doe',
			password: 'password'
		});
		
		this.name = hb.observable(options.name);
		this.password=  hb.observable(options.password);
	}
	
	var model = new ApplicationModel();
	model.addPage({
		title: 'List',
		template: 'List',
		context: new ListModel()
	});
	model.addPage({
		title: 'Report',
		template: 'Report',
		context: new ReportModel()
	});
	
	var options = {
		routes: {}	
	};
	
	for(var i = 0; i < model.pages().length; i++) {
		var page = model.pages()[i];
		(function() {
			var captureOfI = i;
			options.routes[page.title] = page.title; 
			options[page.title] = function() {
				model.setPage(captureOfI);
			};
		})();
	}
	
	var Router = Backbone.Router.extend(options);
	var router = new Router();
	
	var view = new hb.View('Application', model);
	view.replaceIn('#app-container');
	
	Backbone.history.start();
});