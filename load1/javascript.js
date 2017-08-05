function MyLoadAnimation1(myElementsToAnimate,myLoadContainer){
	this.counter = 0;
	this.elementsToAnimate = myElementsToAnimate;
	this.loadContainer = myLoadContainer;
}

//convert degrees to radians
MyLoadAnimation1.prototype.getRadians = function(degree){
	var radian = degree *(Math.PI / 180);
	return radian;
}

//get the appropriate x coordinate based on value of cos(degree)
MyLoadAnimation1.prototype.getXCoord = function(radius, halfOfElementWidth, degree){
	var xCoord = (radius + ((radius - halfOfElementWidth) * Math.cos(this.getRadians(degree)))) - halfOfElementWidth;
	return xCoord;
}

//get the appropriate y coordinate based on value of sin(degree)
MyLoadAnimation1.prototype.getYCoord = function(radius, halfOfElementHeight, degree){
	var yCoord = (radius + ((radius - halfOfElementHeight) * Math.sin(this.getRadians(degree)))) - halfOfElementHeight;
	return yCoord;
}

//main animate function
MyLoadAnimation1.prototype.animate = function(elementToAnimate, elementToAnimateWidth, elementToAnimateHeight, radiusOfContainer, degree, acceleration, moveSpeed){

	var mySelf = this;

	$(elementToAnimate).show();//just in case

	//redraw the element
	elementToAnimate.style.left = this.getXCoord(radiusOfContainer, (elementToAnimateWidth/2), degree) + "px";
	elementToAnimate.style.top = this.getYCoord(radiusOfContainer, (elementToAnimateHeight/2), degree) + "px";
	
	//update speed
	moveSpeed = moveSpeed + acceleration;
	degree = degree + moveSpeed;

	//decrease speed once halfway (sometimes won't be exact)
	if(degree >= 180){
		acceleration = acceleration * -1;
	}

	//stop if full revolution
	if(degree >= 360){
		this.counter++;
		if(this.counter == (this.elementsToAnimate.length)){
			this.counter = 0;
			setTimeout(function(){
				mySelf.startAnimation(0, mySelf.elementsToAnimate.length);
			},1000);
		}
		//prevent looping by returning
		return;
	}

	//loop to make "animation"
	setTimeout(function(){
		mySelf.animate(elementToAnimate, elementToAnimateWidth, elementToAnimateHeight, radiusOfContainer, degree, acceleration, moveSpeed);
	}, 20);
}

//cascade elements in array
MyLoadAnimation1.prototype.startAnimation = function(current, stop){
	var mySelf = this;
	if(current < stop){
		this.animate(this.elementsToAnimate[current], $(this.elementsToAnimate[current]).width(), $(this.elementsToAnimate[current]).height(), ($(this.loadContainer).width()/2), 0, 0.15, 3);
		setTimeout(function(){
			mySelf.startAnimation((current + 1), stop);
		}, 100);
	}
}

//start everything up
//MyLoadAnimation1.prototype.startAnimation = function(0, elementsToAnimate.length);

var elementsToAnimate = [document.getElementById("circle1"), document.getElementById("circle2"), document.getElementById("circle3"), document.getElementById("circle4")];
var loadAnimation1 = new MyLoadAnimation1(elementsToAnimate,document.getElementById("loadContainer"));
loadAnimation1.startAnimation(0,elementsToAnimate.length);

