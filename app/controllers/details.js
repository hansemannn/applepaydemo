var ApplePay,
	product;

/**
 * Constructor
 */
(function constructor(_product) {
	
	product = _product;
	
	configureApplePay();
	setUI();
})(arguments[0] || {});

function setUI() {
	$.window.setTitle(product.title);
	$.image.setImage("/images/products/" + product.identifier + ".jpg");
	$.title.setText(product.title);
	$.price.setText("$ " + parseFloat(product.price).toFixed(2));

	$.window.add(createApplePayButton());
}

function configureApplePay() {
	ApplePay = require("ti.applepay");

	ApplePay.setupPaymentGateway({
		name : ApplePay.PAYMENT_GATEWAY_STRIPE,
		apiKey : "<YOUR_STRIPE_API_KEY>"
	});
}

function createApplePayButton() {
	var btn = ApplePay.createPaymentButton({
		type : ApplePay.PAYMENT_BUTTON_TYPE_BUY,
		style : ApplePay.PAYMENT_BUTTON_STYLE_WHITE_OUTLINE,
		top: 50
	});
	btn.addEventListener("click", showPaymentDialog);

	return btn;
}

function showPaymentDialog() {
	var PaymentHandler = require("PaymentHandler");
	
	PaymentHandler.setProduct(product);
	PaymentHandler.setInstance(ApplePay);
	PaymentHandler.process(function(e) {
		Ti.API.warn("SUCCESS: "+JSON.stringify(e));
	});
}