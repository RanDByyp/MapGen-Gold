//Canvas and Map
const cellSize = 8;

//Window Size
const innerWidth = window.innerWidth;
const innerHeight = window.innerHeight;

//Display Size
const canvasWidth = (Math.ceil(innerWidth/8)-8)*8;
const canvasHeight = (Math.ceil(innerHeight/8)-8)*8;

//Map Size
var mapWidth = canvasWidth/8;
var mapHeight = canvasHeight/8;

//Current Map
var mapLoaded;

//Draw Elements
sprites = [];
colors = [];

//UI Elements
var slidersHeightRange = [];
var textFieldsColor = [];
var textFieldSeed;
var sliderFallOff;
var sliderNoiseScale;
var buttonNewMap;
var radioVisuals = [];
var cellDataBox;

//-----UI Element Values
var fallOff;
var noiseScale;
var gradient;
var prevColors = []
var prevHeightRanges = [];
var heightRanges = [];
var visualsType;
var outline;

var mapSeed = Math.floor(Math.random()*100000);

//Toggles - Temps
var allowDraw = true;
var storedTime = new Date();

function preload()
{
    //Pre-Load Sprite Images
    sprites[0] = {image: loadImage('images/water.png'), name: "Deep Water"};
    sprites[1] = {image: loadImage('images/water-shallow.png'), name: "Shallow Water"};
    sprites[2] = {image: loadImage('images/sand.png'), name: "Beach/Sand"};
    sprites[3] = {image: loadImage('images/grass-light.png'), name: "Short Grass"};
    sprites[4] = {image: loadImage('images/grass-medium.png'), name: "Medium Grass"};
    sprites[5] = {image: loadImage('images/grass-heavy.png'), name: "Tall Grass"};
    sprites[6] = {image: loadImage('images/mountain.png'), name: "Mountains"};
    sprites[7] = {image: loadImage('images/mountain-snow.png'), name: "Tall Mountains"};

    //Pre-Set Colors for Drawn Shapes
    colors[0] = '#4b5bab';
    colors[1] = '#4da6ff';
    colors[2] = '#f2a65e';
    colors[3] = '#3ca370';
    colors[4] = '#3d6e70';
    colors[5] = '#323e4f';
    colors[6] = '#606070';
    colors[7] = '#ffffeb';
}

function setup() 
{
    //Create Canvas and Link it to HTML Element
    var canvas = createCanvas(canvasWidth,canvasHeight);
    canvas.parent('sketch-holder');

    //Randomize Map Seed
    noiseSeed(mapSeed);

    
    //Create UI (Sliders/Checkbox/Buttons)
    UI.initialize();

    //Generate New Map of standard Size
    mapLoaded = new Map(mapWidth,mapHeight);
    
    //Initialize Variables for Navigation and Display
    Navigator.initialize();
}

function draw()
{
    if (allowDraw) 
    {
        //Generate Map with Updated Variables       
        mapLoaded.update();
        
        //Draw Map to Canvas
        Display.show();

        //Draw Cursor/Cell-Selector
        stroke(255);
        strokeWeight(1);
        noFill();
        square(Navigator.posCursor[0]*8,Navigator.posCursor[1]*8,8);

        //Reset Draw-Map Toggle
        allowDraw = false;
    }

    //Check for Nagitation (WASD) Input
    let handlingInput = Navigator.handleInput();
    //Check for UI Manipulation
    let updatingUI = UI.update();
    //If Navigation Input or UI Manipulation is true, allow Redrawing of Map
    if (handlingInput || updatingUI)
    {
        allowDraw = true;
    }
}

function newMap()
{
    //Randomize Map Seed
    noiseSeed(textFieldSeed.value());
    mapLoaded = new Map(mapWidth,mapHeight);
    Navigator.initialize();
    allowDraw = true;
}