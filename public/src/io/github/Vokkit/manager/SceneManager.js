var Material = require("../Material.js");

var scene;
var camera;
var renderer;
var fps = 60;
var materials = [];
var THREE = require("three");
var meshes = [];

function SceneManager() {
    this.init = function () {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 0, 0);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.onresize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        var textureLoader = new THREE.TextureLoader();
        materials = [];
        for (var i in Material) {
            if (Material[i].id == undefined || Material[i].id == 0) continue;
            var texture = textureLoader.load("/assets/blocks/" + Material[i].getName() + ".png");
            texture.magFilter = THREE.NearestFilter;
            texture.minFilter = THREE.LinearMipMapLinearFilter;
            materials[Material[i].id] = new THREE.MeshBasicMaterial({
                map: texture,
                overdraw: true
            });
        }
        console.log(materials);
    }

    this.getCamera = function () {
        return camera;
    }

    this.getScene = function () {
        return scene;
    }

    this.getRenderer = function () {
        return renderer;
    }

    this.getFPS = function () {
        return fps;
    }

    this.setFPS = function (FPS) {
        fps = FPS;
    }

    this.drawWorld = function (world) {
        while (scene.children.length > 0) {
            scene.remove(scene.children[0]);
        }
        var blocks = world.getAllBlocks();
        var singleGeometry = new THREE.Geometry();
        var geometry = new THREE.BoxGeometry(1, 1, 1);

        var Uvs0 = [new THREE.Vector2(0, 0.5), new THREE.Vector2(0, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.5)];
        var Uvs1 = [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.5)];

        var Uvs2 = [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1), new THREE.Vector2(0.25, 1)];
        var Uvs3 = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 1), new THREE.Vector2(0.5, 1)];

        var Uvs4 = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.75, 0), new THREE.Vector2(0.75, 0.5)];
        var Uvs5 = [new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.5)];

        geometry.faceVertexUvs[0][0] = [Uvs0[0], Uvs0[1], Uvs0[3]];
        geometry.faceVertexUvs[0][1] = [Uvs0[1], Uvs0[2], Uvs0[3]];
        geometry.faceVertexUvs[0][2] = [Uvs1[0], Uvs1[1], Uvs1[3]];
        geometry.faceVertexUvs[0][3] = [Uvs1[1], Uvs1[2], Uvs1[3]];

        geometry.faceVertexUvs[0][4] = [Uvs2[0], Uvs2[1], Uvs2[3]];
        geometry.faceVertexUvs[0][5] = [Uvs2[1], Uvs2[2], Uvs2[3]];

        geometry.faceVertexUvs[0][6] = [Uvs3[0], Uvs3[1], Uvs3[3]];
        geometry.faceVertexUvs[0][7] = [Uvs3[1], Uvs3[2], Uvs3[3]];

        geometry.faceVertexUvs[0][8] = [Uvs4[0], Uvs4[1], Uvs4[3]];
        geometry.faceVertexUvs[0][9] = [Uvs4[1], Uvs4[2], Uvs4[3]];

        geometry.faceVertexUvs[0][10] = [Uvs5[0], Uvs5[1], Uvs5[3]];
        geometry.faceVertexUvs[0][11] = [Uvs5[1], Uvs5[2], Uvs5[3]];
        var matrix = new THREE.Matrix4();
        var position = new THREE.Vector3();
        for (var i in blocks) {
            for (var j in blocks[i]) {
                for (var k in blocks[i][j]) {
                    var faceid = 0;
                    var blockId = blocks[i][j][k].id;
                    if (blockId === 2) {
                        faceid = 2;
                    } else if (blockId === 3) {
                        faceid = 3;
                    } else if (blockId !== 0) {
                        faceid = 1;
                    }
                    for (var l = 0; l < geometry.faces.length; l++) {
                        geometry.faces[l].materialIndex = faceid;
                    }
                    matrix.setPosition(position.set(blocks[i][j][k].position.x + 0.5, blocks[i][j][k].position.y + 0.5, blocks[i][j][k].position.z + 0.5));
                    singleGeometry.merge(geometry, matrix);

                }
            }
        }
        var worldMesh = new THREE.Mesh(singleGeometry, materials);
        scene.add(worldMesh);
        var sky = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 600, 1, 1, 1), new THREE.MeshBasicMaterial({ color: "#7EC0EE" }));
        sky.scale.set(-1, 1, 1);
        scene.add(sky);
    }

    this.setBlock = function (block) {
        if (block.id == 0) {
            for (var i = meshes.length; i >= 0; i--) {
                if (meshes[i].position.equals(block.position)) {
                    meshes.splice(i, 1);
                }
            }
        } else {
            for (var i = meshes.length; i >= 0; i--) {
                if (meshes[i].position.equals(block.position)) {
                    var mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: "#2196F3" }));
                    mesh.position = block.position.clone();
                    meshes[i] = mesh;
                    return;
                }
            }
            var mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1), new THREE.MeshLambertMaterial({ color: "#2196F3" }));
            mesh.position = block.position.clone();
            meshes.push(mesh);
        }

        var singleGeometry = new THREE.Geometry();
        for (var i = meshes.length; i >= 0; i++) {
            singleGeometry.merge(mesh[i].geometry, mesh[i].matrix);
        }

    }

    this.start = function () {
        setInterval(function () {
            var press = Vokkit.getClient().getInputManager().getPress();
            Vokkit.getClient().getMoveManager().moveLocalPlayer(press);
        }, 1000 / fps);
        var draw = function () {
            var localPlayer = Vokkit.getClient().getLocalPlayer();
            if (localPlayer != undefined) {
                camera.position.copy(localPlayer.getPosition());
            }
            renderer.render(scene, camera);
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }
}

module.exports = SceneManager;