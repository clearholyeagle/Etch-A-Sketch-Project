let passes = 0;

function createNewGrid() {
  // Prompt the user for the number of squares per side
  const squaresPerSide = prompt("Enter the number of squares per side (maximum 100):");
  
  // Convert the input to a number and validate it
  const numSquares = parseInt(squaresPerSide);
  if (isNaN(numSquares) || numSquares <= 0 || numSquares > 100) {
    alert("Invalid input. Please enter a number between 1 and 100.");
    return;
  }
  
  // Calculate the new square size based on the container width
  const container = document.getElementById('container');
  const containerWidth = container.offsetWidth;
  const squareSize = containerWidth / numSquares;
  
  // Clear the existing grid
  while (container.firstChild) {
    container.firstChild.remove();
  }
  
  // Create the new grid
  container.style.gridTemplateColumns = `repeat(${numSquares}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${numSquares}, 1fr)`;
  
  for (let i = 0; i < numSquares * numSquares; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;
    container.appendChild(square);
    
    square.addEventListener('mouseenter', () => {
      passes = 0;
      changeSquareColor(square);
    });
  
    square.addEventListener('mouseleave', () => {
      passes = 0;
      changeSquareColor(square);
    });
  
    square.addEventListener('mousemove', () => {
      if (passes < 10) {
        passes++;
        changeSquareColor(square);
      }
    });
  }
}

function changeSquareColor(square) {
  const randomColor = getRandomRGB();
  const blackenedColor = addBlack(randomColor, passes * 0.1);
  square.style.backgroundColor = blackenedColor;
}

function getRandomRGB() {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  return `rgb(${red}, ${green}, ${blue})`;
}

function addBlack(color, amount) {
  const rgbValues = color.match(/\d+/g);
  const red = Math.floor(rgbValues[0] * (1 - amount));
  const green = Math.floor(rgbValues[1] * (1 - amount));
  const blue = Math.floor(rgbValues[2] * (1 - amount));
  return `rgb(${red}, ${green}, ${blue})`;
}

window.addEventListener('DOMContentLoaded', (event) => {
  createNewGrid();
});


  








