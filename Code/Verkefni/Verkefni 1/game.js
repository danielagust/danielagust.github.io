import Lane from "./obj_Lane.js";
import Car from "./obj_car.js"
import Sidewalk from "./obj_sidwalk.js";

// startup
var canvas = document.getElementById( "gl-canvas" );
    
var gl = WebGLUtils.setupWebGL( canvas );
if ( !gl ) { alert( "WebGL isn't available" ); }

//  Configure WebGL

gl.viewport( 0, 0, canvas.width, canvas.height );
gl.clearColor( 0.2, 0.2, 0.2, 1.0 );

//  Load shaders and initialize attribute buffers

var program = initShaders( gl, "vertex-shader", "fragment-shader" );
gl.useProgram( program );


var vPosition = gl.getAttribLocation( program, "vPosition" );

gl.enableVertexAttribArray( vPosition );

// lanes 
var lanes = [];
var lane_count = 3;
var num_cars = 3;

var sidwalk_width = 0.3;
var lane_mid_list = [];

var wrap_line = 1.4;
var car_list = [];

var width_car = 0.2;
var height_car = 0.1;


make_lanes();
console.log(lane_mid_list);
var car = car  = new Car(vec2(0.2,0.1),wrap_line, vec2(0.0,lane_mid_list[2]));
car.set_webstuff(gl, program);
car.Color = vec4(1.0,0.0,0.0,1.0);

var sidewalk_bottom = new Sidewalk(vec2(0.0,sidwalk_width), 1);
sidewalk_bottom.Color = vec4(0.5,0.5,0.5,1.0);
sidewalk_bottom.set_webstuff(gl, program);

var sidewalk_top = new Sidewalk(vec2(0.0,sidwalk_width), -1);
sidewalk_top.Color = vec4(0.5,0.5,0.5,1.0);
sidewalk_top.set_webstuff(gl, program);
(splitRangev2(-sidwalk_width, sidwalk_width, lane_count))

function new_cars(interval){
    for (let i = 0; i < num_cars; i++){
        new_car(interval); 
     }
     
}
function new_car(lane){
    var mid = (lane.lane_Star_and_End[0]+lane.lane_Star_and_End[1])/2
    var car  = new Car(vec2(width_car, height_car),wrap_line, vec2(splitRange(-1,1,num_cars+1),mid));
    car.set_webstuff(gl, program);
    car.Color = vec4(1.0,0.0,0.0,1.0);
    // console.log(car);
    car_list.push(car);
    // console.log(car);
}


function make_lanes(){

    lanes = splitRange(-sidwalk_width, sidwalk_width, lane_count);
    var mid;
    for ( var i = 0; i < lanes.length; ++i ){
        mid = (lanes[i][0]+lanes[i][1])/2
        lane_mid_list.push(mid);
        
    }
}

function splitRange(rangeStart, rangeEnd, numIntervals) {
    const intervalSize = (rangeEnd - rangeStart) / numIntervals;
    const intervals = [];

    for (let i = 0; i < numIntervals; i++) {
        const start = rangeStart + i * intervalSize;
        const end = start + intervalSize;
        intervals.push([start, end]);
    }
    return intervals;
}

function splitRangev2(rangeStart, rangeEnd, numIntervals) {
    const intervalSize = (rangeEnd - rangeStart) / numIntervals;
    
    var speed = 0.003;
    // console.log(numIntervals)
    var temp_lanes = [];

    for (let i = 0; i < numIntervals; i++) {
        const start = rangeStart + i * intervalSize;
        const end = start + intervalSize;
        // intervals.push(new Lane([start, end], speed , num_cars, splitRange(-1,1,num_cars+1)));
        temp_lanes.push(new Lane([start, end], speed, num_cars, splitRange(-1,1,num_cars+1)));
        
        // intervals[i].set_webstuff(gl, program);
        // console.log(lanes[i].cars)
        
    }
    console.log(temp_lanes, "hello")
    lanes = temp_lanes;

    for (let i = 0; i < numIntervals/2; i++){
        // console.log(temp_lanes[i]);
        new_cars(temp_lanes[i])
        console.log(car_list);
        // console.log(temp_lanes)
        lanes[i].Cars = car_list;
        
        car_list = [];
    }

    
    console.log(lanes)
    
}
        

export default function run(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    

    render();


}

function move(){
    car.move_right_wrap(0.003);
    car.render();
}
function move_list(lane){
    for (let i = 0; i < cars.length; i++){

    }
}

function render(){
    gl.clear( gl.COLOR_BUFFER_BIT );
    sidewalk_bottom.render();
    sidewalk_top.render();
    move();
   
    car.render();
    move();
    
    
    

    window.requestAnimationFrame(render);
}


// export default class Game{
//     constructor(){
        


        

    
        

//         this.render();
//     }
//     move(){
//         car.move_right_wrap(0.001);
//         car.render(gl, program);
//     }

//     render(){
//         gl.clear( gl.COLOR_BUFFER_BIT );
//         // for ( var i = 0; i < vertices.length; i+=3 ){
//         //     gl.uniform4fv( colorLoc, vec4(Math.random(), Math.random(), Math.random(), 1.0) );
//         //     gl.drawArrays( gl.TRIANGLES, i, i+3 );
//         // }
        
//         car.render(gl, program);
//         this.move();
//         console.log("hello");
//         window.requestAnimationFrame(this.render);
//     }
// }