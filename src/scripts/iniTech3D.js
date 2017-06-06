var threeDModel = (function () {
    var container;
    var camera, scene, renderer;
    var mtlLoader, controls;


    return {

        init: function (objUrl, mtlUrl) {

            container = document.createElement('div');
            document.body.appendChild(container);


            /* Camera */
            camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
            camera.position.x = -14;
            camera.position.y = 8;
            camera.position.z = 16;

           this.initTrackballControls();

            /* Scene */
            scene = new THREE.Scene();

            var ambient = new THREE.AmbientLight(0xffffff);
            scene.add(ambient);

            var progressBar = document.createElement('div');
            progressBar.className  = 'spinner';

            var manager = new THREE.LoadingManager();
            
            manager.onLoad = function () {
               container.removeChild(progressBar);
            };

            manager.onProgress = function () {
             container.appendChild(progressBar);
            };
           
            var mtlLoader = new THREE.MTLLoader(manager);
            
            mtlLoader.load(mtlUrl, function (materials) {
                materials.preload();
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.load(objUrl, function (object) {
                    scene.add(object);
                });
            });

            /* Renderer */
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(1200, 800);
            renderer.setClearColor(new THREE.Color("hsl(0, 0%, 89%)"));

            container.appendChild(renderer.domElement);
            this.animate();

        },

         destroy: function (){
        document.body.removeChild(container);
        },

        initTrackballControls: function(){

            // These variables set the camera behaviour and sensitivity.
            controls = new THREE.TrackballControls(camera);
            controls.rotateSpeed = 5.0;
            controls.zoomSpeed = 5;
            controls.panSpeed = 2;
            controls.noZoom = false;
            controls.noPan = false;
            controls.staticMoving = true;
            controls.dynamicDampingFactor = 0.3;
        },

        ///Users/Ram/VSCodeWorkSpace/demo-app-client/src/
        animate: function () {
            // This function calls itself on every frame. You can for example change
            // the objects rotation on every call to create a turntable animation.
            requestAnimationFrame(this.animate.bind(this));

            // On every frame we need to calculate the new camera position
            // and have it look exactly at the center of our scene.
            controls.update();
            camera.lookAt(scene.position);
            renderer.render(scene, camera);

        },

        
    }

})(threeDModel | {})





