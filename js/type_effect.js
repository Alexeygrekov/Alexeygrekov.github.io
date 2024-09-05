// Wait for the DOM to be fully loaded before running the script
document.addEventListener("DOMContentLoaded", function() {

    // Select the elements for the typed text and cursor	
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");

    // Check if the elements exist
    if (!typedTextSpan || !cursorSpan) {
      console.error("Typed text or cursor element not found.");
      return;
    }

// Array of strings to type out
const textArray = ["Software Engineer"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 1000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  // Check if there are more characters left to type	
  if (charIndex < textArray[textArrayIndex].length) {
    // make the cursor blink while typing  
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    cursorSpan.classList.remove("typing");
  	setTimeout(erase, newTextDelay);
  }
}

function erase() {
	// Check if there are characters left to erase
	if (charIndex > 0) {
    // Add the "typing" class to make the cursor blink while erasing
    if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
    // Remove the last character
    typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    // When all characters are erased, remove the "typing" class
    cursorSpan.classList.remove("typing");
    textArrayIndex++;
    if(textArrayIndex>=textArray.length) textArrayIndex=0;
    setTimeout(type, typingDelay + 1100);
  }
}

if (textArray.length) {
    console.log(":) hi there");
    setTimeout(type, newTextDelay + 250);
  }
});
