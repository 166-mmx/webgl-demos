var scene, camera, renderer;
var geometry, material, mesh;
var geometryFilled, materialFilled, meshFilled;
var group;

import THREE from 'three';

let vertices = [];

init();
animate();

function init() {

    scene = new THREE.Scene();
    //scene.fog = new THREE.Fog(0x93d7e6, 800, 1200);

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 1000;

    geometry = new THREE.DodecahedronGeometry(100);
    material = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true, wireframeLinewidth: 1 } );

    group = new THREE.Object3D();

    mesh = new THREE.Mesh( geometry, material );
    group.add( mesh );

    geometryFilled = new THREE.DodecahedronGeometry(80);
    materialFilled = new THREE.MeshLambertMaterial({
        color: 0xf6fcfd,
        emissive: 0xa5c8d0,
        side: THREE.FrontSide,
        shading: THREE.FlatShading
    });

    meshFilled = new THREE.Mesh( geometryFilled, materialFilled );
    group.add( meshFilled );

    geometry.vertices.forEach((v, i) => animateVertice([v, geometryFilled.vertices[i]]));

    var lights = [];
    lights[ 0 ] = new THREE.PointLight( 0xf6fcfd, 0.2, 0 );
    lights[ 1 ] = new THREE.PointLight( 0xf6fcfd, 1, 0 );
    lights[ 2 ] = new THREE.PointLight( 0xf6fcfd, 1, 0 );

    lights[ 0 ].position.set( 800, 0, 800 );
    lights[ 1 ].position.set( 100, 200, 100 );
    lights[ 2 ].position.set( - 100, - 200, - 100 );

    scene.add( lights[ 0 ] );
    /*scene.add( lights[ 1 ] );
    scene.add( lights[ 2 ] );*/
    scene.add(group);

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setClearColor( 0x93D7E6, 1);

    document.body.appendChild( renderer.domElement );

}

function animateVertice(verticesArray) {
    let min = (Math.random() * 50) + 150;
    let vector = new THREE.Vector3();
    vector.copy(verticesArray[0]);
    vector.normalize();
    let ratio = 3;

    let geometry = new THREE.SphereGeometry(8, 16, 16);
    let material = new THREE.MeshBasicMaterial({color: 0xffffff});
    let dot = new THREE.Mesh(geometry, material);
    group.add(dot);
    dot.position.x = verticesArray[0].x;
    dot.position.y = verticesArray[0].y;
    dot.position.z = verticesArray[0].z;

    dot.geometry.verticesNeedUpdate = true;

    vertices.push({
        vector: vector.multiplyScalar(3),
        vertices: verticesArray,
        dot,
        ratio: 10,//(Math.random() * 12) - 6,
        max: (Math.random() * 250) + min + 20,
        min,
        direction: 1
    });
}

function calculate(vertice) {
    vertice.vertices.forEach(v => {

        if (vertice.direction == 1) {
            v.add(vertice.vector);
        } else {
            v.sub(vertice.vector);
        }

    });

    vertice.dot.position.x = vertice.vertices[0].x;
    vertice.dot.position.y = vertice.vertices[0].y;
    vertice.dot.position.z = vertice.vertices[0].z;

    let length = vertice.vertices[0].length();

    if (length > vertice.max) {
        vertice.direction = -1;
    }

    if (length < vertice.min) {
        vertice.direction = 1;
    }
}

function animate() {

    requestAnimationFrame( animate );

    group.rotation.y += 0.02;
    //meshFilled.rotation.y += 0.02;

    vertices.forEach(vertice => {
        calculate(vertice);
    });

    geometry.verticesNeedUpdate = true;
    geometryFilled.verticesNeedUpdate = true;


    renderer.render( scene, camera );

}