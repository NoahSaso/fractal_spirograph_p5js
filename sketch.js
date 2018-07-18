var resolutionSlider, howManySlider, insideCheckbox, kSlider, showOrbitsCheckbox, graphColorRSlider, graphColorGSlider, graphColorBSlider;

// CONFIG
var resolution = 50,
  howMany = 10,
  inside = false,
  k = -4,
  showOrbits = true,
  graphColor = { r: 0, g: 255, b: 255 }
  ;
// CONFIG

var path = [],
  main,
  end,
  alreadySetup = false;

function setup() {
  if (!alreadySetup) {
    createCanvas(750, 750);

    createP('resolution:');
    resolutionSlider = createSlider(1, 100, resolution);
    createP('howMany:');
    howManySlider = createSlider(2, 30, howMany);
    insideCheckbox = createCheckbox('inside', inside);
    createP('k:');
    kSlider = createSlider(-10, 10, k);
    showOrbitsCheckbox = createCheckbox('showOrbits', showOrbits);
    createP('r:');
    graphColorRSlider = createSlider(0, 255, graphColor.r);
    createP('g:');
    graphColorGSlider = createSlider(0, 255, graphColor.g);
    createP('b:');
    graphColorBSlider = createSlider(0, 255, graphColor.b);
    alreadySetup = true;
  } else {
    path = [];
  }

  main = new Orbit(width / 2, height / 2, 170, 0);
  var next = main;
  for (var i = 0; i < howMany - 1; i++) {
    next = next.addChild();
  }
  end = next;
}

function draw() {
  background(51);

  if (resolutionSlider.value() != resolution || howManySlider.value() != howMany || insideCheckbox.checked() != inside || kSlider.value() != k || showOrbitsCheckbox.checked() != showOrbits || graphColorRSlider.value() != graphColor.r || graphColorGSlider.value() != graphColor.g || graphColorBSlider.value() != graphColor.b) {
    resolution = resolutionSlider.value();
    howMany = howManySlider.value();
    inside = insideCheckbox.checked();
    k = kSlider.value();
    showOrbits = showOrbitsCheckbox.checked();
    graphColor.r = graphColorRSlider.value();
    graphColor.g = graphColorGSlider.value();
    graphColor.b = graphColorBSlider.value();
    setup();
  }

  for (var i = 0; i < resolution; i++) {
    main.update();
    path.push(createVector(end.x, end.y));
  }

  if (showOrbits) {
    main.show();
  }

  beginShape();
  stroke(graphColor.r, graphColor.g, graphColor.b);
  noFill();
  for (var pos of path) {
    vertex(pos.x, pos.y);
  }
  endShape();
}