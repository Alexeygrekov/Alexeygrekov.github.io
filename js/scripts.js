// Library ptsjs is from William Ngan at ptsjs.org
// Check if the element with id 'homepage-animation' exists before running Pts.js code
if (document.getElementById('homepage-animation')) {
  // Create the CanvasSpace and CanvasForm
  Pts.quickStart(document.getElementById("homepage-animation"), "#1a0000");

  // Declare and initialize space
  let space = window.space;

  // Resize enabled
  space.autoResize = true;
  // Adjust points based on screen width. For mobile we have less points
  let num_points = window.innerWidth > 768 ? 500 : 300; 
  // The amount of padding the navbar takes which is 72
  let mobile_navbar_padding = 72;
  // Calculate a scaling factor based on the screen width
  let scaleFactor = window.innerWidth > 768 ? 1 : 0.75; 

  let pts = new Group();
  let rotating_point = new Pt();
  let rotating_line = new Group();

  space.add({
    start: (bound) => {
      bound.width = window.innerWidth;
      bound.height = window.innerHeight - mobile_navbar_padding;
      // Calls resize to draw the points
      space.resize(bound);
      
      // Initialize points and rotating 
      pts = Create.distributeRandom(space.outerBound, num_points);
      rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.perpendicularFromPt);
    },

    //Loop to animate
    animate: () => {
      // Rotate points and rotating line 
      rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.perpendicularFromPt);
      pts.rotate2D(0.0004, space.center);
      rotating_point.rotate2D(-0.0006, space.center);
  
      const fillColors = ["#F04", "#0F9", "#09F"];
      const center = space.center;
      const halfScreenWidth = space.size.x / (2 * scaleFactor);

      //Perpendicular line is created to the rotating line
      pts.forEach((p, i) => {
        let lp = rotating_line(p);
        let distance = lp.$subtract(p).magnitude();
        let ratio = Math.min(1, 1 - distance / halfScreenWidth);
        let color = `rgba(200,200,200,${ratio})`;
        
        // Use the same stroke and fill color to reduce unnecessary calls
        form.stroke(color, ratio * 2).line([p, lp]);
        form.fillOnly(fillColors[i % 3]).point(p, 1.2);
      });
    },
  
    resize: () => {
      // Reinitialize points on resize
      pts = Create.distributeRandom(space.outerBound, num_points);
      // Reinitialize the rotating_line
      rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.rotating_lineFromPt);
    },

  });
  

  // Start the animation
  space.play();
}
