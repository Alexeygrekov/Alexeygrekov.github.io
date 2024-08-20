// Source code licensed under Apache License 2.0. 
// Copyright © 2017 William Ngan. (https://github.com/williamngan/pts)
// Code from: https://ptsjs.org/demo/edit/?name=line.perpendicularFromPt

// Create the CanvasSpace and CanvasForm
Pts.quickStart(document.getElementById("homepage-animation"), "#1a0000");

// Resize enabled
space.autoResize = true;
// Adjust points based on screen width. For mobile we have less points
let num_points = window.innerWidth > 768 ? 500 : 300; 
// The amount of padding the navbar takes
let mobile_navbar_padding = 10;
// Calculate a scaling factor based on the screen width
let scaleFactor = window.innerWidth > 768 ? 1 : 2; 

// Self-executing function
(() => {

  let pts = new Group();
  let rotating_point = new Pt();
  let rotating_line = new Group();

  space.add({
    start: (bound) => {
      bound.width = window.innerWidth;
      bound.height = window.innerHeight - mobile_navbar_padding;
      // Resize will call the resize function below, drawing the points and
      // rotating line.
      space.resize(bound)
    },

    // Animate the canvas via a loop
    animate: () => {
      // Rotate line
      rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.perpendicularFromPt);
      // Rotate Points
      pts.rotate2D(0.0004, space.center);
      rotating_point.rotate2D(-0.0006, space.center);

      // For each point, find and fill a line perpendicular to rotating_line
      pts.forEach((p, i) => {
        let lp = rotating_line(p);
        // Calculate the ratio between the distance from the point to the
        // rotating_line to the canvas width divided by 2.
        let ratio = Math.min(1, 1 - lp.$subtract(p).magnitude() / (space.size.x / (2 * scaleFactor)));
        // Color the lines perpendicular to the point and rotating_line
        form.stroke(`rgba(200,200,200,${ratio}`, ratio * 2).line([p, lp]);
        // Color the points on the canvas
        form.fillOnly(["#F04", "#0F9", "#09F"][i % 3]).point(p, 1.2);
      });

    },

    resize: () => {
      // If the screen is resized, reinitialize the points on the canvas
      pts = Create.distributeRandom(space.outerBound, num_points);
      // Reinitialize the rotating_line
      rotating_line = new Group(space.center.$subtract(0.1), rotating_point).op(Line.rotating_lineFromPt);
    },

  });

  // Start the animation
  space.play();
})();
