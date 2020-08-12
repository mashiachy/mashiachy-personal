import * as THREE from 'three';
import GLTFLoader from 'three-gltf-loader';
import { Easing, Tween, update, ToggleLagSmoothing } from 'es6-tween';

export default class SceneManaging {
  constructor (modelPath) {
    this.modelPath = modelPath;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.man = null;
    this.lights = [];
    this.key = 0;
    this.domElement = null;

    this.animateRequest = null;
    this.animate = () => {
      this.animateRequest = requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      update();
    };
    this.animated = false;

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.render(this.scene, this.camera);
      this.camera.lookAt(0,0,0);
    }, {
      passive: true,
    });
  }

  initScene () {
    this.scene = new THREE.Scene();
  }

  initCamera () {
    this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.x = -4;
    this.camera.position.y = 0;
    this.camera.position.z = 5;
    this.camera.lookAt(0,0,0);
  }

  initRenderer (domElement) {
    this.renderer = new THREE.WebGLRenderer({
      canvas: domElement ? domElement : this.domElement,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(0x565B60);
    this.renderer.shadowMap.enabled = true;

    if (!domElement) this.domElement = domElement;
  }

  initLights () {
    this.lights = [];

    const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.667);
    directionalLight.castShadow = true;
    directionalLight.position.x = 16;
    directionalLight.position.y = 32;
    directionalLight.position.z = 50;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    this.lights.push(directionalLight);

    const pointLightRed = new THREE.PointLight(0xeb0085, 1, 100);
    pointLightRed.castShadow = true;
    pointLightRed.position.x = 30;
    pointLightRed.position.y = 10;
    pointLightRed.position.z = 10;
    pointLightRed.shadow.mapSize.width = 1024;
    pointLightRed.shadow.mapSize.height = 1024;
    this.lights.push(pointLightRed);

    const pointLightBlue = new THREE.PointLight(0x0022d1, 1, 100);
    pointLightBlue.castShadow = true;
    pointLightBlue.position.x = -30;
    pointLightBlue.position.y = 10;
    pointLightBlue.position.z = 10;
    pointLightBlue.shadow.mapSize.width = 1024;
    pointLightBlue.shadow.mapSize.height = 1024;
    this.lights.push(pointLightBlue);

    this.lights.forEach(light => this.scene.add(light));
  }

  loadMan (onProcess, onLoad, onError) {
    const loader = new GLTFLoader();
    loader.load(
      this.modelPath,
      ({scene}) => {
        this.man = scene.children[0];
        this.scene.add(this.man);
        this.man.children[0].receiveShadow = true;
        this.man.children[0].material = new THREE.MeshPhysicalMaterial({
          color: 0xffffff,
          emissive: 0x0,
          clearcoat: 1,
          reflectivity: 1,
          roughness: 0,
        });
        this.man.children[1].castShadow = true;
        this.man.children[1].receiveShadow = true;
        this.man.children[1].material = new THREE.MeshPhysicalMaterial({
          color: 0xECD1BE,
          emissive: 0x0,
          metalness: 0,
          reflectivity: 0.5,
          roughness: 1,
        });
        this.man.children[2].material = new THREE.MeshPhysicalMaterial({
          color: 0x24180C,
          emissive: 0x0,
          metalness: 0,
          reflectivity: 0.3,
          roughness: 0.3,
        });
        this.man.children[3].castShadow = true;
        this.man.children[3].material = new THREE.MeshPhysicalMaterial({
          color: 0x24180C,
          emissive: 0x0,
          metalness: 0,
          reflectivity: 0.3,
          roughness: 0.3,
        });

        this.goToKey({
          key: this.key,
          smoothing: false,
        });

        onLoad(true);
      },
      xhr => onProcess(xhr.loaded / xhr.total),
      error => onError(error),
    );
  }

  init (onProcess, onLoad, onError) {
    if (!this.scene) this.initScene();
    if (!this.camera) this.initCamera();

    if (!this.keys) this.initKeys();

    if (!this.lights.length) this.initLights();

    if (!this.man)  {
      this.loadMan(onProcess, onLoad, onError);
    } else {
      onLoad(true);
    }
  }

  show (key=0) {
    this.goToKey({
      key,
      smoothing: false,
    });

    if (!this.animated) {
      this.animated = true;
      this.animate();
    }
  }

  hide () {
    if (this.animated) {
      cancelAnimationFrame(this.animateRequest);
      this.animated = false;
    }
  }

  initKeys () {
    ToggleLagSmoothing(false);

    this.keys = {
      camera: {
        position: {
          x: [-4, -2.563, -0.112, 2.357, 4],
          y: [0, 0, 0, 0, 0,],
          z: [5, 5.868, 6.402, 5.954, 5],
        },
      },
      man: {
        position: {
          x: [-2.1, -1.282, -0.054, 1.173, 2.1],
          y: [-17, -13.688, -8.719, -3.751, 0],
          z: [0.2, 0.2, 0.2, 0.2, 0.2],
        },
        rotation: {
          y: [0, 1.224, 3.060, 4.897, 6.283],
        },
      },
    };

    this.timePerKey = 500;
  }

  goToKey ({ key, smoothing = true }) {
    if (smoothing) {
      const tweens = [];
      if (this.camera) {
        tweens.push(
          new Tween(this.camera.position)
          .to({
            x: this.keys.camera.position.x[key],
            z: this.keys.camera.position.z[key]
          }, Math.abs(key - this.key) * this.timePerKey)
          .easing(Easing.Quadratic.InOut)
          .on('update', () => {
            this.camera.lookAt(0, 0, 0);
          })
        );
      }
      if (this.man) {
        tweens.push(
          new Tween(this.man.position)
          .to({
            x: this.keys.man.position.x[key],
            y: this.keys.man.position.y[key]
          }, Math.abs(key - this.key) * this.timePerKey)
          .easing(Easing.Quadratic.InOut)
        );
        tweens.push(
          new Tween(this.man.rotation)
          .to({y: this.keys.man.rotation.y[key]}, Math.abs(key - this.key) * this.timePerKey)
          .easing(Easing.Quadratic.InOut)
        );
      }

      tweens.forEach(tween => tween.start());
    } else {
      if (this.camera) {
        this.camera.position.x = this.keys.camera.position.x[key];
        this.camera.position.z = this.keys.camera.position.z[key];
        this.camera.lookAt(0, 0, 0);
      }
      if (this.man) {
        this.man.position.x = this.keys.man.position.x[key];
        this.man.position.y = this.keys.man.position.y[key];
        this.man.rotation.y = this.keys.man.rotation.y[key];
      }
    }

    this.key = key;
  }
};
