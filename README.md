# Ti.Shopping
Ti.Shopping is an example application on how to use the Ti.ApplePay module with Titanium Mobile. It requires the [Ti.ApplePay](http://shop.hans-knoechel.de/product/ti-applepay) module and iOS 9.

<img width="1094" src="http://abload.de/img/example8bjv1.png">

## Running the Sample

### Via Appcelerator Studio

* Import it via *Dashboard* if available.
* Or import it via *File > Import... > Git > Git Repository as New Project*
	* Select *URI* and enter:

			https://github.com/hansemannn/applepaydemo

* Select a device to build to via *Run > Run As*.

### Via CLI

1. Clone the repository:

		git clone https://github.com/hansemannn/applepaydemo

2. To run it with `appc run` first import it to the platform:

		appc new --import --no-services

3. Build to device:

		[appc run | ti build] -p ios -T device
