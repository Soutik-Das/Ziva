function calculateBodyShape() {
  const shoulders = parseFloat(document.getElementById("shoulders").value);
  const chest = parseFloat(document.getElementById("chest").value);
  const waist = parseFloat(document.getElementById("waist").value);
  const hips = parseFloat(document.getElementById("hips").value);
  let result = "";

  // Check for valid input
  if (isNaN(shoulders) || isNaN(chest) || isNaN(waist) || isNaN(hips)) {
      result = "Please enter valid measurements.";
  } else {
      // Determine body shape
      const shoulderChestDifference = Math.abs(shoulders - chest);
      const chestWaistDifference = Math.abs(chest - waist);
      const waistHipDifference = Math.abs(waist - hips);

      if (Math.abs(waist - chest) <= 2 && Math.abs(waist - hips) <= 2) {
          result = "Oval: Waist and chest are similar in size with a rounded midsection.";
      } else if (Math.abs(shoulders - chest) <= 2 && Math.abs(chest - waist) <= 2 && Math.abs(waist - hips) <= 2) {
          result = "Rectangle: Shoulders, chest, and hips are about the same width with minimal waist definition.";
      } else if (shoulders > chest && shoulders > hips) {
          result = "Inverted Triangle: Broad shoulders and chest with a narrower waist and hips.";
      } else if (shoulders < chest && shoulders < hips && chest > waist && hips > waist) {
          result = "Trapezoid: Broad chest and shoulders tapering down to a narrower waist.";
      } else if (hips > shoulders && hips > chest) {
          result = "Triangle: Hips are wider than shoulders and chest.";
      } else {
          result = "Unclassified: Your body shape doesn't fit into one of the main categories.";
      }
  }

  // Display result
  document.getElementById("result").innerText = result;
}