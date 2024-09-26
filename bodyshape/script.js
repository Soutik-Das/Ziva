function calculateBodyShape() {
  const shoulders = parseFloat(document.getElementById("shoulders").value);
  const bust = parseFloat(document.getElementById("bust").value);
  const waist = parseFloat(document.getElementById("waist").value);
  const hips = parseFloat(document.getElementById("hips").value);
  let result = "";

  // Check for all measurements being provided
  if (isNaN(shoulders) || isNaN(bust) || isNaN(waist) || isNaN(hips)) {
      result = "Please enter valid measurements.";
  } else {
      // Calculate body shape with more inclusive criteria
      const shoulderHipDifference = Math.abs(shoulders - hips);
      const bustHipDifference = Math.abs(bust - hips);
      const bustWaistDifference = Math.abs(bust - waist);

      if (shoulderHipDifference <= 2 && bustHipDifference <= 2 && waist < bust && waist < hips) {
          result = "Hourglass: Balanced shoulders and hips with a smaller waist.";
      } else if (shoulders > hips && shoulders > bust) {
          result = "Inverted Triangle: Shoulders are broader than hips.";
      } else if (hips > shoulders && hips > bust) {
          result = "Triangle (Pear): Hips are wider than shoulders.";
      } else if (Math.abs(shoulders - bust) <= 4 && Math.abs(bust - hips) <= 4 && Math.abs(waist - bust) <= 4) {
          result = "Rectangle: Shoulders, bust, and hips are about the same width, with minimal waist definition.";
      } else if (waist > shoulders && waist > bust && waist > hips) {
          result = "Round (Apple): Waist is larger than shoulders, bust, and hips.";
      } else {
          result = "Unclassified: Your body doesn't fit into one of the main categories.";
      }
  }

  // Display the result
  document.getElementById("result").innerText = result;
}