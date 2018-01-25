// forked from takumifukasawa's "[glsl] perlin noise ^ 3" http://jsdo.it/takumifukasawa/CYCX
// forked from takumifukasawa's "[glsl] perlin noise ^ 2" http://jsdo.it/takumifukasawa/SChI
// forked from takumifukasawa's "[glsl] perlin noise" http://jsdo.it/takumifukasawa/cJ3j
// forked from takumifukasawa's "threejsでfragmentshaderを描く雛形" http://jsdo.it/takumifukasawa/4aPn
// forked from takumifukasawa's "vertexShaderで拡大->回転->移動" http://jsdo.it/takumifukasawa/uzYW
// forked from takumifukasawa's "vertexShaderで拡大縮小（箱）" http://jsdo.it/takumifukasawa/MhvE
// forked from takumifukasawa's "vertexShaderでy軸に回転（箱）" http://jsdo.it/takumifukasawa/CIrj
// forked from takumifukasawa's "vertexShaderで平行移動（箱）" http://jsdo.it/takumifukasawa/k730
// forked from takumifukasawa's "[glsl] vertexShaderでscaleMatrix" http://jsdo.it/takumifukasawa/2FYC
// forked from takumifukasawa's "[glsl] 輪っか" http://jsdo.it/takumifukasawa/0gjD
// forked from takumifukasawa's "[glsl] dissolve shader" http://jsdo.it/takumifukasawa/OfdS
let width, height, currentTime, mesh;

const wrapper = document.querySelector("#wrapper");
//const ratio = window.devicePixelRatio;
const ratio = 1;

const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xffffff);
renderer.setPixelRatio(ratio);
wrapper.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.Camera();
camera.position.set(0, 0, 1);

const vertexShader = document.querySelector("#v-shader").textContent;
const fragmentShader = document.querySelector("#f-shader").textContent;

const onWindowResize = () => {
    width = wrapper.offsetWidth;
    height = wrapper.offsetHeight;

    mesh.material.uniforms.u_resolution.value.x = width * ratio;
    mesh.material.uniforms.u_resolution.value.y = height * ratio;

    renderer.setSize(width, height);
};

const createMesh = () => {
    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
            u_time: {
                type: "f",
                value: performance.now()
            },
            u_resolution: {
                type: "v2",
                value: new THREE.Vector2()
            }
        }
    });

    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
}

const tick = (time) => {
    currentTime = time;

    mesh.material.uniforms.u_time.value = currentTime;

    renderer.render(scene, camera);
    requestAnimationFrame(tick);
}

createMesh();
onWindowResize();
window.addEventListener("resize", onWindowResize);
tick();


    
