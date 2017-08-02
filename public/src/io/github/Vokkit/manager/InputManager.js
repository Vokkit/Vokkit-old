var Block = require("../block/Block.js");

var press = [false, false, false, false, false, false, false, false];

var fakeCamera;

function InputManager() {
    this.init = function () {
        var renderer = Vokkit.getClient().getSceneManager().getRenderer();
        var camera = Vokkit.getClient().getSceneManager().getCamera();
        fakeCamera = camera.clone();
        renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
            renderer.domElement.mozRequestPointerLock;
        renderer.domElement.onclick = function (e) {
            renderer.domElement.requestPointerLock();
        }
        document.addEventListener('pointerlockchange', onPointerLockChange, false);
        document.addEventListener('mozpointerlockchange', onPointerLockChange, false);
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);
        document.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        document.getElementById("RightButton").onmousedown = function () {
            onKeyDown({ keyCode: 68 });
        }

        document.getElementById("RightButton").onmouseup = function () {
            onKeyUp({ keyCode: 68 });
        }

        document.getElementById("RightButton").ontouchstart = function () {
            onKeyDown({ keyCode: 68 });
        }

        document.getElementById("RightButton").ontouchend = function () {
            onKeyUp({ keyCode: 68 });
        }

        //Left
        document.getElementById("LeftButton").onmousedown = function () {
            onKeyDown({ keyCode: 65 });
        }

        document.getElementById("LeftButton").onmouseup = function () {
            onKeyUp({ keyCode: 65 });
        }

        document.getElementById("LeftButton").ontouchstart = function () {
            onKeyDown({ keyCode: 65 });
        }

        document.getElementById("LeftButton").ontouchend = function () {
            onKeyUp({ keyCode: 65 });
        }

        //Shift
        document.getElementById("ShiftButton").onmousedown = function () {
            onKeyDown({ keyCode: 16 });
        }

        document.getElementById("ShiftButton").onmouseup = function () {
            onKeyUp({ keyCode: 16 });
        }

        document.getElementById("ShiftButton").ontouchstart = function () {
            onKeyDown({ keyCode: 16 });
        }

        document.getElementById("ShiftButton").ontouchend = function () {
            onKeyUp({ keyCode: 16 });
        }

        //Jump
        document.getElementById("JumpButton").onmousedown = function () {
            onKeyDown({ keyCode: 32 });
        }

        document.getElementById("JumpButton").onmouseup = function () {
            onKeyUp({ keyCode: 32 });
        }

        document.getElementById("JumpButton").ontouchstart = function () {
            onKeyDown({ keyCode: 32 });
        }

        document.getElementById("JumpButton").ontouchend = function () {
            onKeyUp({ keyCode: 32 });
        }

        //Front
        document.getElementById("FrontButton").onmousedown = function () {
            onKeyDown({ keyCode: 87 });
        }

        document.getElementById("FrontButton").onmouseup = function () {
            onKeyUp({ keyCode: 87 });
        }

        document.getElementById("FrontButton").ontouchstart = function () {
            onKeyDown({ keyCode: 87 });
        }

        document.getElementById("FrontButton").ontouchend = function () {
            onKeyUp({ keyCode: 87 });
        }

        //Back
        document.getElementById("BackButton").onmousedown = function () {
            onKeyDown({ keyCode: 83 });
        }

        document.getElementById("BackButton").onmouseup = function () {
            onKeyUp({ keyCode: 83 });
        }

        document.getElementById("BackButton").ontouchstart = function () {
            onKeyDown({ keyCode: 83 });
        }

        document.getElementById("BackButton").ontouchend = function () {
            onKeyUp({ keyCode: 83 });
        }

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onMouseMove);
        document.addEventListener('touchstart', onTouchDown);
        document.addEventListener('touchend', onTouchUp);
        document.addEventListener('touchcancel', onTouchUp);

        function onPointerLockChange() {
            if (document.pointerLockElement === renderer.domElement || document.mozPointerLockElement === renderer.domElement) {
                document.addEventListener("mousemove", onMouseMove, false);
            } else {
                document.removeEventListener("mousemove", onMouseMove, false);
            }
        }

        function onMouseMove(e) {
            var location = Vokkit.getClient().getLocalPlayer().getLocation();
            location.setYaw(location.getYaw() + e.movementX / 1000);
            location.setPitch(location.getPitch() - e.movementY / 1000);
            Vokkit.getClient().getLocalPlayer().teleport(location);
            //camera.lookAt(new THREE.Vector3(camera.position.x - Math.sin(location.getYaw()) * Math.cos(location.getPitch()), camera.position.y + Math.sin(location.getPitch()), camera.position.z + Math.cos(location.getYaw()) * Math.cos(location.getPitch())));
            Vokkit.getClient().getSceneManager().updateGroup(location);
        }

        function onKeyDown(e) {
            if (e.keyCode == 87) {//w
                press[0] = true;
            } else if (e.keyCode == 83) {//s
                press[1] = true;
            } else if (e.keyCode == 65) {//a
                press[2] = true;
            } else if (e.keyCode == 68) {//d
                press[3] = true;
            } else if (e.keyCode == 32) {//space
                press[4] = true;
            } else if (e.keyCode == 16) {//shift
                press[5] = true;
            }
        }

        function onKeyUp(e) {
            if (e.keyCode == 87) {
                press[0] = false;
            } else if (e.keyCode == 83) {
                press[1] = false;
            } else if (e.keyCode == 65) {
                press[2] = false;
            } else if (e.keyCode == 68) {
                press[3] = false;
            } else if (e.keyCode == 32) {
                press[4] = false;
            } else if (e.keyCode == 16) {
                press[5] = false;
            }
        }

        function onMouseDown(e) {
            if (e.button == 0 || e.button == undefined) {
                press[6] = true;
            } else if (e.button == 1) {
                //선택된 블럭을 인벤토리에 넣음. TODO
            } else if (e.button == 2) {
                press[7] = true;
            }
        }

        function onMouseUp(e) {
            if (e.button == 0 || e.button == undefined) {
                press[6] = false;
            } else if (e.button == 2) {
                press[7] = false;
            }
        }

        var time;
        function onTouchDown(e) {
            time = new Date().getTime();
        }

        var multiply = new THREE.Vector3(-1, -1, -1);
        var reset = new THREE.Vector3(0, 0, 0);
        function onTouchUp(e) {
            var direction = new THREE.Vector3();
            var blockPosition;
            var raycaster = new THREE.Raycaster();
            var camera = Vokkit.getClient().getSceneManager().getCamera();
            var raycaster = new THREE.Raycaster(Vokkit.getClient().getSceneManager().getGroup().position.multiply(multiply), camera.getWorldDirection(reset));
            var intersects = raycaster.intersectObjects(Vokkit.getClient().getSceneManager().getGroup().children);
            if (intersects.length > 0) {
                var intersect = intersects[0];
                var uv = intersect.uv;
                var x = Math.floor(intersect.point.x);
                var y = Math.floor(intersect.point.y);
                var z = Math.floor(intersect.point.z);
                if (uv.x >= 0.0 && uv.x < 0.25 && uv.y >= 0 && uv.y < 0.5) {
                    //x-
                    blockPosition = new THREE.Vector3(x - 1, y, z);
                    direction.set(1, 0, 0);
                } else if (uv.x >= 0.25 && uv.x < 0.5 && uv.y >= 0 && uv.y < 0.5) {
                    //x+
                    blockPosition = new THREE.Vector3(x, y, z);
                    direction.set(-1, 0, 0);
                } else if (uv.x >= 0.25 && uv.x < 0.5 && uv.y >= 0.5 && uv.y < 1) {
                    //y-
                    blockPosition = new THREE.Vector3(x, y - 1, z);
                    direction.set(0, 1, 0);
                } else if (uv.x >= 0.5 && uv.x < 0.75 && uv.y >= 0.5 && uv.y < 1) {
                    //y+
                    blockPosition = new THREE.Vector3(x, y, z);
                    direction.set(0, -1, 0);
                } else if (uv.x >= 0.5 && uv.x < 0.75 && uv.y >= 0 && uv.y < 0.5) {
                    //z-
                    blockPosition = new THREE.Vector3(x, y, z - 1);
                    direction.set(0, 0, 1);
                } else if (uv.x >= 0.75 && uv.x < 1 && uv.y >= 0 && uv.y < 0.5) {
                    //z+
                    blockPosition = new THREE.Vector3(x, y, z);
                    direction.set(0, 0, -1);
                }

                var now = new Date().getTime();

                if (now - time < 100) {
                    var blockPlacePosition = blockPosition.clone().add(direction);
                    Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPlacePosition, 1));
                    Vokkit.getClient().getSocket().emit("requestSetBlock", {
                        x: blockPlacePosition.x,
                        y: blockPlacePosition.y,
                        z: blockPlacePosition.z,
                        id: 1,
                        worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
                    });
                } else {
                    Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPosition, 0));
                    Vokkit.getClient().getSocket().emit("requestSetBlock", {
                        x: blockPosition.x,
                        y: blockPosition.y,
                        z: blockPosition.z,
                        id: 0,
                        worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
                    });
                }
            }
        }

        var coolDown;

        this.mouseControl = function () {
            if ((press[6] || press[7]) && !(press[6] && press[7])) {
                if (coolDown > 0) coolDown--;
                if (coolDown == 0) {
                    var direction = new THREE.Vector3();
                    var blockPosition;
                    var camera = Vokkit.getClient().getSceneManager().getCamera();
                    var raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
                    var intersects = raycaster.intersectObjects(Vokkit.getClient().getSceneManager().getGroup().children);
                    if (intersects.length > 0) {
                        var intersect = intersects[0];
                        var uv = intersect.uv;
                        intersect.point.add(Vokkit.getClient().getSceneManager().getGroup().position.multiply(multiply));
                        var x = Math.floor(intersect.point.x);
                        var y = Math.floor(intersect.point.y);
                        var z = Math.floor(intersect.point.z);
                        if (uv.x >= 0.0 && uv.x < 0.25 && uv.y >= 0 && uv.y < 0.5) {
                            //x-
                            blockPosition = new THREE.Vector3(x - 1, y, z);
                            direction.set(1, 0, 0);
                        } else if (uv.x >= 0.25 && uv.x < 0.5 && uv.y >= 0 && uv.y < 0.5) {
                            //x+
                            blockPosition = new THREE.Vector3(x, y, z);
                            direction.set(-1, 0, 0);
                        } else if (uv.x >= 0.25 && uv.x < 0.5 && uv.y >= 0.5 && uv.y < 1) {
                            //y-
                            blockPosition = new THREE.Vector3(x, y - 1, z);
                            direction.set(0, 1, 0);
                        } else if (uv.x >= 0.5 && uv.x < 0.75 && uv.y >= 0.5 && uv.y < 1) {
                            //y+
                            blockPosition = new THREE.Vector3(x, y, z);
                            direction.set(0, -1, 0);
                        } else if (uv.x >= 0.5 && uv.x < 0.75 && uv.y >= 0 && uv.y < 0.5) {
                            //z-
                            blockPosition = new THREE.Vector3(x, y, z - 1);
                            direction.set(0, 0, 1);
                        } else if (uv.x >= 0.75 && uv.x < 1 && uv.y >= 0 && uv.y < 0.5) {
                            //z+
                            blockPosition = new THREE.Vector3(x, y, z);
                            direction.set(0, 0, -1);
                        }

                        if (press[6]) {
                            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPosition, 0));
                            Vokkit.getClient().getSocket().emit("requestSetBlock", {
                                x: blockPosition.x,
                                y: blockPosition.y,
                                z: blockPosition.z,
                                id: 0,
                                worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
                            });
                        } else if (press[7]) {
                            var blockPlacePosition = blockPosition.clone().add(direction);
                            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPlacePosition, 1));
                            Vokkit.getClient().getSocket().emit("requestSetBlock", {
                                x: blockPlacePosition.x,
                                y: blockPlacePosition.y,
                                z: blockPlacePosition.z,
                                id: 1,
                                worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
                            });
                        }
                    }
                    coolDown = 250 / 1000 * Vokkit.getClient().getSceneManager().getFPS();
                }
            } else coolDown = 0;
        }

        var WebVRButton = document.getElementById("WebVRButton");
        WebVRButton.onclick = function () {
            Vokkit.getClient().getWebVRManager().toggleVR();
        }
    }

    this.getPress = function () {
        return press.slice();
    }
}

module.exports = InputManager;