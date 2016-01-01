var ApplePay,
    product,
    paymentDialog,
    paymentRequest,
    cb;

exports.setInstance = function(_ApplePay) {
	ApplePay = _ApplePay;

	paymentRequest = ApplePay.createPaymentRequest({
		merchantIdentifier : "merchant.de.hansknoechel.paydemo.stripe",
		merchantCapabilities : ApplePay.MERCHANT_CAPABILITY_3DS | ApplePay.MERCHANT_CAPABILITY_CREDIT | ApplePay.MERCHANT_CAPABILITY_DEBIT | ApplePay.MERCHANT_CAPABILITY_EMV,
		countryCode : "US",
		currencyCode : "USD",
		supportedNetworks : [ApplePay.PAYMENT_NETWORK_VISA, ApplePay.PAYMENT_NETWORK_MASTERCARD],
		requiredShippingAddressFields : ApplePay.ADDRESS_FIELD_POSTAL_ADDRESS,
		requiredBillingAddressFields : ApplePay.ADDRESS_FIELD_POSTAL_ADDRESS,
		shippingType : ApplePay.SHIPPING_TYPE_DELIVERY,
		applicationData : {
			"userId" : 1337
		}
	});

	paymentDialog = ApplePay.createPaymentDialog({
		paymentRequest : paymentRequest
	});

	paymentDialog.addEventListener("didSelectPayment", didSelectPayment);
	paymentDialog.addEventListener("didSelectShippingContact", didSelectShippingContact);
	paymentDialog.addEventListener("didSelectShippingMethod", didSelectShippingMethod);
	paymentDialog.addEventListener("willAuthorizePayment", willAuthorizePayment);
	paymentDialog.addEventListener("didAuthorizePayment", didAuthorizePayment);
	paymentDialog.addEventListener("close", willClose);
};

exports.setProduct = function(_product) {
	product = _product;
};

exports.process = function(_cb) {
	var items = [];
	var shippingMethods = [];
	
	if (product == null) {
		Ti.API.error("No product set. Use setProduct() before calling process().");
		return;
	}

	// Items
	items.push(ApplePay.createSummaryItem({
		itemType : ApplePay.PAYMENT_SUMMARY_ITEM_TYPE_FINAL,
		title : product.title,
		price : product.price
	}));

	items.push(ApplePay.createSummaryItem({
		itemType : ApplePay.PAYMENT_SUMMARY_ITEM_TYPE_FINAL,
		title : "Your Company",
		price : product.price
	}));

	// Shipping
	shippingMethods.push(ApplePay.createShippingMethod({
		identifier : "free_shipping",
		title : "Free Shipping",
		description : "3-5 working days",
		price : 0.0
	}));

	shippingMethods.push(ApplePay.createShippingMethod({
		identifier : "express_shipping",
		title : "Express Shipping",
		description : "1-2 working days",
		price : 10.0
	}));
	
	cb = _cb;

	paymentRequest.setSummaryItems(items);
	paymentRequest.setShippingMethods(shippingMethods);
		
	paymentDialog.show();
};

/**
 * Callbacks
 */

function didSelectPayment(e) {
	e.handler.complete(paymentRequest.getSummaryItems());
}

function didSelectShippingContact(e) {
	e.handler.complete(ApplePay.PAYMENT_AUTHORIZATION_STATUS_SUCCESS, paymentRequest.getShippingMethods(), paymentRequest.getSummaryItems());
}

function didSelectShippingMethod(e) {

	/**
	 * TODO:    (Demo) Update total price, insert item as penultimate element
	 *          Update the summary items if certain shipping method is selected

	 summaryItems.push(ApplePay.createSummaryItem({
	 itemType: ApplePay.PAYMENT_SUMMARY_ITEM_TYPE_FINAL,
	 title: "Extra Fee",
	 price: 13.37
	 }));
	 paymentRequest.setSummaryItems(summaryItems);
	 */

	e.handler.complete(ApplePay.PAYMENT_AUTHORIZATION_STATUS_SUCCESS, paymentRequest.getSummaryItems());
}

function willAuthorizePayment() {

}

function didAuthorizePayment(e) {

	// Send the encrypted payment data to your backend and send the completion handler afterwards.
	Ti.API.info("Payment successfully authorized: " + e.success);
	e.handler.complete(ApplePay.PAYMENT_AUTHORIZATION_STATUS_SUCCESS);
	
	// Provide the callback back to the main application
	cb(e);
}

function willClose(e) {

}

function openPaymentDialog(e) {
	if (e.buttonType == ApplePay.PAYMENT_BUTTON_TYPE_SETUP) {
		return;
		// Alert to setup Apple Pay. PKAddPaymentPassViewController is not supported, yet.
	}

	paymentDialog.show();
}