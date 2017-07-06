var elementsToAnimate = [document.getElementById("circle1"), document.getElementById("circle2"), document.getElementById("circle3"), document.getElementById("circle4")];
var counter = 0;

//convert degrees to radians
function getRadians(degree){
	var radian = degree *(Math.PI / 180);
	return radian;
}

//get the appropriate x coordinate based on value of cos(degree)
function getXCoord(radius, halfOfElementWidth, degree){
	var xCoord = (radius + ((radius - halfOfElementWidth) * Math.cos(getRadians(degree)))) - halfOfElementWidth;
	return xCoord;
}

//get the appropriate y coordinate based on value of sin(degree)
function getYCoord(radius, halfOfElementHeight, degree){
	var yCoord = (radius + ((radius - halfOfElementHeight) * Math.sin(getRadians(degree)))) - halfOfElementHeight;
	return yCoord;
}

//main animate function
function animate(elementToAnimate, elementToAnimateWidth, elementToAnimateHeight, radiusOfContainer, degree, acceleration, moveSpeed){

	$(elementToAnimate).show();//just in case

	//redraw the element
	elementToAnimate.style.left = getXCoord(radiusOfContainer, (elementToAnimateWidth/2), degree) + "px";
	elementToAnimate.style.top = getYCoord(radiusOfContainer, (elementToAnimateHeight/2), degree) + "px";
	
	//update speed
	moveSpeed = moveSpeed + acceleration;
	degree = degree + moveSpeed;

	//decrease speed once halfway (sometimes won't be exact)
	if(degree >= 180){
		acceleration = acceleration * -1;
	}

	//stop if full revolution
	if(degree >= 360){
		counter++;
		if(counter == (elementsToAnimate.length)){
			counter = 0;
			setTimeout(function(){
				startAnimation(0, elementsToAnimate.length);
			},1000);
		}
		//prevent looping by returning
		return;
	}

	//loop to make "animation"
	setTimeout(function(){
		animate(elementToAnimate, elementToAnimateWidth, elementToAnimateHeight, radiusOfContainer, degree, acceleration, moveSpeed);
	}, 20);
}

//cascade elements in array
function startAnimation(current, stop){
	if(current < stop){
		animate(elementsToAnimate[current], $(elementsToAnimate[current]).width(), $(elementsToAnimate[current]).height(), ($("#loadContainer").width()/2), 0, 0.15, 3);
		setTimeout(function(){
			startAnimation((current + 1), stop);
		}, 100);
	}
}

//start everything up
startAnimation(0, elementsToAnimate.length);