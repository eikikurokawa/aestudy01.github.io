var container;
var camera, scene, renderer;
var uniforms;
var startTime;
var effectController;
var effectObject;

var folder1;
var folder2;


init();
animate();

function init() {
  container = document.getElementById('container');

  startTime = Date.now();
  camera = new THREE.Camera();
  camera.position.z = 1;

  scene = new THREE.Scene();

  var geometry = new THREE.PlaneBufferGeometry(16, 9);

  uniforms = {
    iGlobalTime: { type: "f", value: 1.0 },
    iResolution: { type: "v2", value: new THREE.Vector2() },
    addRed:{value: 1.00 },
    addGreen:{value: 1.00 },
    addBlue:{value: 0.00 },
    addNoise:{value: 130.00 },
    BrightnessValue:{value: 1.00 },
    Saturation:{value: 1.00 },
    hsv2rgbValue01:{value: 1.00 },
    hsv2rgbValue02:{value: 3.00 },
    hsv2rgbValue03:{value: 3.00 },
    hsv2rgbValue04:{value: 3.00 },
    NoiseSpeed01:{value: 5.00 },
    NoiseSpeed02:{value: 5.00 },
  };

  effectController = {
    addRed: 1.00,
    addGreen: 1.00,
    addBlue: 0.70,
    addNoise : 60.00,
    BrightnessValue : 1.00,
    Saturation:1.00,
    hsv2rgbValue01:1.00,
    hsv2rgbValue02:3.00,
    hsv2rgbValue03:3.00,
    hsv2rgbValue04:3.00,
    NoiseSpeed01:5.00,
    NoiseSpeed02:5.00


  };

  var material = new THREE.ShaderMaterial( {

    uniforms: uniforms,
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent

  } );

  var mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  container.appendChild(renderer.domElement);

  onWindowResize();

  window.addEventListener('resize', onWindowResize, false);

  initGUI();
  dynamicValuesChanger();
}

function onWindowResize(event) {
  uniforms.iResolution.value.x = window.innerWidth;
  uniforms.iResolution.value.y = window.innerHeight;

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  // console.log(folder1.addRed);
}

function render() {
  var currentTime = Date.now();
  uniforms.iGlobalTime.value = (currentTime - startTime) * 0.001;
  dynamicValuesChanger();
  renderer.render(scene, camera);
}

function initGUI(){
  var gui = new dat.GUI({ load: JSON ,width: 300});

  gui.remember(effectController);
  folder1 = gui.addFolder( 'Colors' );
  folder2 = gui.addFolder( 'Noise' );

  folder1.add( effectController, "addRed", -10.00, 10.00, 0.001).onChange( dynamicValuesChanger );
  folder1.add( effectController, "addGreen", -10.00, 10.00 , 0.001).onChange( dynamicValuesChanger );
  folder1.add( effectController, "addBlue", -10.00, 10.00 , 0.001).onChange( dynamicValuesChanger );
  folder1.add( effectController, "Saturation", 0.00, 2.00 , 0.001).onChange( dynamicValuesChanger );
  folder1.add( effectController, "BrightnessValue", -5.00, 5.00 , 0.001).onChange( dynamicValuesChanger );

  folder2.add( effectController, "addNoise", 0.00, 200.00 , 0.001).onChange( dynamicValuesChanger );
  folder2.add( effectController, "hsv2rgbValue01", 0.00, 10.00 , 0.001).onChange( dynamicValuesChanger );
  folder2.add( effectController, "hsv2rgbValue02", 0.00, 10.00 , 0.001).onChange( dynamicValuesChanger );
  folder2.add( effectController, "hsv2rgbValue03", 0.00, 10.00 , 0.001).onChange( dynamicValuesChanger );
  folder2.add( effectController, "hsv2rgbValue04", 0.00, 10.00 , 0.001).onChange( dynamicValuesChanger );
  folder2.add( effectController, "NoiseSpeed01", 0.00, 50.00 , 0.001).onChange( dynamicValuesChanger );
  folder2.add( effectController, "NoiseSpeed02", 0.00, 50.00 , 0.001).onChange( dynamicValuesChanger );







}

function dynamicValuesChanger(){
  uniforms.addRed.value = effectController.addRed;
  uniforms.addGreen.value = effectController.addGreen;
  uniforms.addBlue.value = effectController.addBlue;
  uniforms.addNoise.value = effectController.addNoise;
  uniforms.BrightnessValue.value = effectController.BrightnessValue;
  uniforms.Saturation.value = effectController.Saturation;

  uniforms.hsv2rgbValue01.value = effectController.hsv2rgbValue01;
  uniforms.hsv2rgbValue02.value = effectController.hsv2rgbValue02;
  uniforms.hsv2rgbValue03.value = effectController.hsv2rgbValue03;
  uniforms.hsv2rgbValue04.value = effectController.hsv2rgbValue04;

  uniforms.NoiseSpeed01.value = effectController.NoiseSpeed01;
  uniforms.NoiseSpeed02.value = effectController.NoiseSpeed02;





  // console.log(effectController.addBlue);

}
