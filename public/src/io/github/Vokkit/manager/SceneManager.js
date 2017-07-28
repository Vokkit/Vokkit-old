var Material = require("../Material.js");

var Block = require("../block/Block.js");

var scene;
var camera;
var renderer;
var fps = 60;
var materials = [];
var THREE = require("three");
var meshes = [];
var worldGeometry;
var dirtyChunks = [];

function SceneManager() {
    this.init = function () {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        window.onresize = function () {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        materials = Vokkit.getClient().getBlockTextureManager().getTextures();
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
        /*
        
        worldGeometry = new THREE.Geometry();
        var blocks = world.getAllBlocks();
        var geometry = blockTextureManager.uvsGeometry(new THREE.BoxGeometry(1, 1, 1));
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
                    worldGeometry.merge(geometry, matrix);
                }
            }
        }
        
        var worldMesh = new THREE.Mesh(worldGeometry, materials);
        scene.add(worldMesh);
        */
        var world = Vokkit.getClient().getWorlds()[0];
        var chunks = world.getChunks();
        for (var i in chunks) {
            scene.add(chunks[i].mesher());
        }
        var sky = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 600, 1, 1, 1), new THREE.MeshBasicMaterial({ color: "#7EC0EE" }));
        sky.scale.set(-1, 1, 1);
        scene.add(sky);
    }

    this.reloadChunk = function (chunk) {
        if (dirtyChunks.indexOf(chunk) == -1) dirtyChunks.push(chunk);
    }

    this.start = function () {
        var position = new THREE.Vector3();
        setInterval(function () {
            var press = Vokkit.getClient().getInputManager().getPress();
            Vokkit.getClient().getMoveManager().moveLocalPlayer(press);
            Vokkit.getClient().getInputManager().mouseControl();
        }, 1000 / fps);
        var draw = function () {
            var localPlayer = Vokkit.getClient().getLocalPlayer();
            if (localPlayer != undefined) {
                camera.position.copy(localPlayer.getLocation().toVector());
            }
            for (var i in dirtyChunks) {
                scene.remove(dirtyChunks[i].getLastMesh());
                scene.add(dirtyChunks[i].mesher());
            }
            dirtyChunks = [];
            renderer.render(scene, camera);
            requestAnimationFrame(draw);
        }
        requestAnimationFrame(draw);
    }
}

module.exports = SceneManager;