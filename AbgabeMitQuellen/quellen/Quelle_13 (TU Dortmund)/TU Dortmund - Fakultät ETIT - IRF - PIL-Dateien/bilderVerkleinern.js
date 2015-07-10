/* Verkleinert Bilder, so dass sie auf schmalen Viewport passen */
var resizedImages = new Array(); // Array fuer imageStructs
var dispTriggerSize = 1000; // Definition, unterhalb welcher Bildschirmgroesse Prozedur durchlaufen werden soll
var initWidth = returnWidth(); // Anfaengliche Aufloesung
var initHeight = (window.innerHeight > 0) ? window.innerHeight : screen.height;
var initRotation = currentRotation(); // Anfaengliche Ausrichtung
var timeout = false; // Timeoutsteuerung fuer animiertes Fensterveraendern

function currentRotation(){ // Funktion, die Rotationswinkel liefert
	var width = returnWidth();
	var height = (window.innerHeight > 0) ? window.innerHeight : screen.height;
	
	if(width > height){
		return 0;
	} else {
		return 90;
	}
}

function shouldTrigger(width){ // Funktion, die bestimmt, ob gezoomt werden kann, oder verkleinert werden soll
	if(initWidth > dispTriggerSize){
		return false;
	}
	var currentRot = currentRotation();
	
	if(initRotation == 0 && currentRot == 90){
		return width >= (initHeight - initHeight*1/20); // Toleranzbereich
	} else if(initRotation == 0 && currentRot == 0){
		return width >= (initWidth - initWidth*1/20);
	} else if(initRotation == 90 && currentRot == 90){
		return width >= (initWidth - initWidth*1/20);
	} else if(initRotation == 90 && currentRot == 0){
		return width >= (initHeight - initHeight*1/20);
	}
	
	return false;
}

function imageStruct(image, originalWidth, originalHeight){ // Datenstruktur fuer Bild und urspruengliche Breite/Hoehe
	this.image = image;
	this.originalWidth = originalWidth;
	this.originalHeight = originalHeight;
	this.originalRatio = originalWidth/originalHeight;	
}

function imageInArray(array, image){ // Zum Ueberpruefen, ob Bild in einem imageStruct im Array ist
	for(var i = 0; i < array.length; i++) {
		if(array[i].image == image){
			return true;
		}
	}
	return false;
}

function returnImage(array, image){ // imageStruct anhand von Bild aus Array holen
	for(var i = 0; i < array.length; i++) {
		if(array[i].image == image){
			return array[i];
		}
	}
	return null;
}

function returnWidth(){ // Browserabhaengig Breite ermitteln
	var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
	var isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
	
	if(isChrome || isSafari){
		return screen.width;
	} else {
		return (window.innerWidth > 0) ? window.innerWidth : screen.width;
	}
}

function imageResize() {
	var width = returnWidth();
	var propFactor = (1/(width)) * 54; // Berechnung, welcher Anteil von Bildbreite zuzueglich abgezogen werden soll
	
	if(width <= dispTriggerSize){
		if(shouldTrigger(width)){
			var imgNodes = document.getElementsByTagName("img");
	 		var images = [].slice.call(imgNodes);
			for(var i = 0; i < images.length; i++) {
				var actualWidth = images[i].width;
				var actualHeight = images[i].height;
				var adaptedWidth = (width - width * propFactor); 
				var adaptedHeight = actualHeight * (adaptedWidth/actualWidth);
				if(actualWidth >= adaptedWidth){
					if(!imageInArray(resizedImages, images[i])){
						resizedImages.push(new imageStruct(images[i], actualWidth, actualHeight)); // Bild merken
					}
					images[i].width = adaptedWidth;
					images[i].height = adaptedHeight;
				} else {			
					storedImage = returnImage(resizedImages, images[i]);
					if(storedImage != null){
						if(adaptedWidth < storedImage.originalWidth){
							storedImage.image.width = adaptedWidth;
							storedImage.image.height = adaptedWidth / storedImage.originalRatio;	
						} else if(storedImage.originalWidth < width){
							storedImage.image.width = storedImage.originalWidth;
							storedImage.image.height = storedImage.originalHeight;
						}
					}
				}
			}
		}
   } else { // Initialzustand wiederherstellen
   		if(resizedImages.length > 0){
   			for(var i = 0; i < resizedImages.length; i++){
   				resizedImages[i].image.width = resizedImages[i].originalWidth;
   				resizedImages[i].image.height = resizedImages[i].originalHeight;
   			}
   			resizedImages = new Array();
   		}
   }
}

function timeoutHandler(){
	 if(timeout !== false){
	    clearTimeout(timeout);
   	 }
	 timeout = setTimeout(imageResize, 300);	
}

if(window.addEventListener){ // Eventhandling IE
	window.addEventListener("load", timeoutHandler);
	window.addEventListener("resize", timeoutHandler);
} else if(window.attachEvent){
	window.attachEvent("onload", timeoutHandler);
	window.attachEvent("onresize", timeoutHandler);
}
