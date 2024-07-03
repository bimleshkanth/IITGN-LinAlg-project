let numProducts;
let numOrders;
let t;
let prices = [];
let orders = [];
let roundedPrices = [];
let toggles = [];
let orderNames = [];
let productNames = [];


function setup() {
  createCanvas(windowWidth, windowHeight+500);
  numProducts = int(prompt("Enter number of products:"));
  numOrders = int(prompt("Enter number of orders:"));
  t = int(prompt("Enter value of t:"));

//   // Resize canvas if there are many orders
//   if (numOrders * 30 + 500 > windowHeight - 50) {
//     resizeCanvas(windowWidth - 50, numOrders * 30 + 500);
//   }

  // Initialize prices and orders
  for (let i = 0; i < numProducts; i++) {
    prices.push(random(0.01, 0.99));
    roundedPrices.push(0);
    productNames.push("Product " + (i + 1)); // Assign product names
  }

  for (let i = 0; i < numOrders; i++) {
    let order = [];
    for (let j = 0; j < numProducts; j++) {
      let sum =0;
      for (let p=0; p < orders.length;p++){
        sum = sum + orders[p][j];
      }
      if (sum < t){
        order.push(floor(random(0, 2))); // Randomly 0 or 1 for whether the product is included
      }else{
        order.push(0);
      }
      
    }
    orders.push(order);
    orderNames.push("Order " + (i + 1)); // Assign order names
  }
  
  // Initialize toggles for rounding decisions
  for (let i = 0; i < numProducts; i++) {
    toggles.push(false); // False means round down, true means round up
  }

  noLoop();
}

function draw() {
  background(255);
  drawGrids();
}

function drawGrids() {
  textSize(12);
  fill(0);
  

  let gridWidth = numProducts * 100; // Adjust as needed for product names
  let gridHeight = numOrders * 30;

  // Center alignment calculation
  let x = (width - gridWidth) / 2;
  let y = 50; // Top aligned with additional spacing

  // Draw product names above orders grid
  textSize(16); // Increase font size for "Orders"
  textStyle(BOLD); // Make "Orders" bold
//   textAlign(CENTER);
  text("Orders", x, y - 20); // Label for product names
  textSize(12); // Increase font size for "Orders"
  textStyle(BOLD); // Make "Orders" bold
  for (let j = 0; j < numProducts; j++) {
    text(productNames[j], x + j * 100 + 20, y-6); // Adjusted text position for product names
  }

  // Draw orders grid with order names
//   text("Orders", x, y - 20);
  for (let i = 0; i < numOrders; i++) {
    text(orderNames[i], x - 65, y + i * 30 + 20); // Display order names
    for (let j = 0; j < numProducts; j++) {
      fill(200);
      rect(x + j * 100, y + i * 30, 100, 30); // Adjusted rect width to 100 for tight alignment
      fill(0);
      text(orders[i][j], x + j * 100 + 40, y + i * 30 + 20); // Adjusted text position
    }
  }

  // Draw prices and rounding switches grid with product names
  y += numOrders * 30 + 60; // More spacing
  textSize(16); // Increase font size for "Orders"
  textStyle(BOLD); // Make "Orders" bold
  text("Prices and Rounding: (Click on product prices to round it up or down)", x, y - 20);
  for (let j = 0; j < numProducts; j++) {
    // text(productNames[j], x + j * 100 + 20, y - 30); // Display product names above columns
    fill(200);
    rect(x + j * 100, y, 100, 30); // Adjusted rect width to 100 for tight alignment
    fill(0);
    text(prices[j].toFixed(2), x + j * 100 + 5, y + 20);
    fill(200);
    rect(x + j * 100, y + 30, 100, 30); // Adjusted rect width to 100 for tight alignment
    fill(0);
    let toggleValue = toggles[j] ? ceil(prices[j]) : floor(prices[j]);
    text(toggleValue, x + j * 100 + 40, y + 50); // Adjusted text position
    roundedPrices[j] = toggleValue;
  }

  // Draw before and after rounding grid
  y += 2 * 30 + 60; // More spacing
  text("Total Prices Before and After Rounding", x, y - 20);
  for (let i = 0; i < numOrders; i++) {
    let totalBefore = 0;
    let totalAfter = 0;
    for (let j = 0; j < numProducts; j++) {
      if (orders[i][j] == 1) {
        totalBefore += prices[j];
        totalAfter += roundedPrices[j];
      }
    }
    fill(200);
    rect(x, y + i * 30, 200, 30); // Adjusted rect width to 200 for tight alignment
    fill(0);
    text(totalBefore.toFixed(2), x + 5, y + i * 30 + 20);
    fill(200);
    rect(x + 200, y + i * 30, 200, 30); // Adjusted rect width to 200 for tight alignment
    fill(0);
    text(totalAfter.toFixed(2), x + 205, y + i * 30 + 20);

    // Check discrepancy
    if (abs(totalAfter - totalBefore) > t) {
      fill(255, 0, 0);
    } else {
      fill(0, 255, 0);
    }
    rect(x + 400, y + i * 30, 100, 30); // Adjusted rect width to 100 for tight alignment
    fill(0);
    text(abs(totalAfter - totalBefore).toFixed(2), x + 405, y + i * 30 + 20);
  }
}

function mousePressed() {
  // Toggle rounding decision on click
  let x = (width - numProducts * 100) / 2;
  let y = 50 + numOrders * 30 + 60; // Adjusted top alignment
  for (let j = 0; j < numProducts; j++) {
    if (mouseX > x + j * 100 && mouseX < x + j * 100 + 100 &&
        mouseY > y && mouseY < y + 30) {
      toggles[j] = !toggles[j];
      redraw();
      break;
    }
  }
}
