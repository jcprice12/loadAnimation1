# loadAnimation1
Windows 10-esque JavaScript animation

### To Use ###
* Create a div that will house the load animation. Make sure to give it a position of relative or absolute (load animation will be centered inside of it)
* instantiate a new instance of the load animation
    * `var myAnimation = new MyLoadAnimation1(document.getElementById("mainContent"),75,12,4,["#2ECC71","#fdcb4e","#ff6876","#666ffd"]);` 
    * parameters are: parentDiv, totalDiameter, smallCircleDiameter, numberOfSmallCircles, arrayOfColors
    * the arrayOfColors can be any size greater than one. Each element in the array is a string representing the HEX code of a color
* call `startAll()` on the instance of your load animation to start the animation
* call `stopAnimation()` on the instance of your load animation to stop the animation
* call `stopAndRemove()` on the instance of your load animation to stop the animation and remove it from the page

No CSS needed. All you need is a parent container with relative or absolute positioning.
