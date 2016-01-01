/**
 * Constructor
 */
(function constructor(args) {
	$.nav.open();
	displayProducts();
})(arguments[0] || {});

/**
 * Display products in Ti.UI.ListView
 */
function displayProducts() {
	var items = [];

	var products = [{
		identifier : "imac27",
		title : "iMac 27\"",
		price : 1799
	},{
		identifier : "iphone6s",
		title : "iPhone 6S",
		price : 649
	},{
		identifier : "watchsport",
		title : "Apple Watch Sport",
		price : 399
	}];

	_.each(products, function(product) {
		items.push({
			data: product,
			properties : {
				accessoryType : Titanium.UI.LIST_ACCESSORY_TYPE_DISCLOSURE,
				height : Ti.UI.SIZE
			},
			image : {
				image : "/images/products/" + product.identifier + ".jpg"
			},
			title : {
				text : product.title
			},
			subtitle : {
				text : "$ " + parseFloat(product.price).toFixed(2)
			}
		});		
	});

	$.listSection.setItems(items);
	
	delete products;
	delete items;
}

/**
 * Opens the details page of the selected product
 */
function openDetails(e) {
	var details = Alloy.createController("details", e.section.getItemAt(e.itemIndex).data);
	$.nav.openWindow(details.getView());	
}
