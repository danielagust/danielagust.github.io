// import * as THREE from "../../ThreeJS/js/three.js";
// import { OrbitControls } from "../../ThreeJS/js/examples/jsm/controls/OrbitControls.js";
// Ná í striga
const canvas = document.querySelector('#c');

const objLoader = new THREE.OBJLoader();
const loader = new THREE.TextureLoader();

// Skilgreina sviðsnet
const scene = new THREE.Scene();
scene.background = new THREE.Color('skyblue');

// Skilgreina myndavél og staðsetja hana
const camera = new THREE.PerspectiveCamera( 75, canvas.clientWidth/canvas.clientHeight, 0.1, 1000 );
camera.position.set(0, 1, 3);

// const loader = new THREE.GLTFLoader();

// loader.load( './models/gnome.obj', function ( gltf ) {

// 	scene.add( gltf.scene );

// }, undefined, function ( error ) {

// 	console.error( error );

// } );


function load_model(model_filename, model_texure, model_normal_texture){
    

    const texture = loader.load(model_texure);
    const normal = loader.load(model_normal_texture);
    const material = new THREE.MeshPhongMaterial({ map: texture, normalMap:normal});
    const model_exit = new THREE.Object3D();
    
    objLoader.load(model_filename, (model) => {
        model.traverse( child => {
            if (child.isMesh){
                child.material = material;
                
            }
        })
        model_exit.add(model);
    });
    return model_exit
}
// const gnome = new THREE.Object3D();
const gnome = load_model("./models/gnome.obj", './models/MAT_Character_Gnome_Female_PigTails_0_basecolor.jpg', "./models/MAT_Character_Gnome_Female_PigTails_0_normal.jpg")
gnome.scale.set(1.0,1.0,1.0)
scene.add(gnome);




// Bæta við músarstýringu
const controls = new THREE.OrbitControls( camera, canvas );

// controls.lookSpeed = 0.1;
// controls.movementSpeed = 10;

var clock = new THREE.Clock(true);

// Skilgreina birtingaraðferð með afbjögun (antialias)
const renderer = new THREE.WebGLRenderer({canvas, antialias:true});

// Búa til tening með Phong áferð (Phong material) og bæta í sviðsnetið
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial( { color: 0x44aa88 } );
const cube = new THREE.Mesh( geometry, material );
cube.position.x += 1;
scene.add( cube );

// Búa til kúlu með Phong áferð og bæta í sviðsnetið
const ballGeometry = new THREE.SphereGeometry( 0.5, 20, 20 );
const ballMaterial = new THREE.MeshPhongMaterial( { color: 0xaa8844 } );
const ball = new THREE.Mesh( ballGeometry, ballMaterial );
ball.position.x += -1;
scene.add( ball );

// Búa til sléttu með Phong áferð
const planeGeometry = new THREE.PlaneGeometry( 4, 2 );
const planeMaterial = new THREE.MeshPhongMaterial( { color: 0xcccccc } );
const plane = new THREE.Mesh( planeGeometry, planeMaterial );
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, -0.5, 0);
scene.add( plane );


// Skilgreina ljósgjafa og bæta honum í sviðsnetið
const light = new THREE.DirectionalLight(0xFFFFFF, 1);
light.position.set(2, 4, 1);
scene.add(light);

// Hreyfifall
const animate = function () {
    requestAnimationFrame( animate );

    controls.update(clock.getDelta());
    renderer.render( scene, camera );
};

animate();