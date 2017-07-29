var Block = require("../block/Block.js");

var press = [false, false, false, false, false, false, false, false];

function InputManager() {
    this.init = function () {
        var renderer = Vokkit.getClient().getSceneManager().getRenderer();
        var camera = Vokkit.getClient().getSceneManager().getCamera();
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
        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);

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
            camera.lookAt(new THREE.Vector3(camera.position.x - Math.sin(location.getYaw()) * Math.cos(location.getPitch()), camera.position.y + Math.sin(location.getPitch()), camera.position.z + Math.cos(location.getYaw()) * Math.cos(location.getPitch())));
        }

        function onKeyDown(e) {
            if (e.keyCode == 87) {
                press[0] = true;
            } else if (e.keyCode == 83) {
                press[1] = true;
            } else if (e.keyCode == 65) {
                press[2] = true;
            } else if (e.keyCode == 68) {
                press[3] = true;
            } else if (e.keyCode == 32) {
                press[4] = true;
            } else if (e.keyCode == 16) {
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
            if (e.button == 0) {
                press[6] = true;
            } else if (e.button == 1) {
                //선택된 블럭을 인벤토리에 넣음. TODO
            } else if (e.button == 2) {
                press[7] = true;
            }
        }

        function onMouseUp(e) {
            if (e.button == 0) {
                press[6] = false;
            } else if (e.button == 2) {
                press[7] = false;
            }
        }

        var coolDown;

        this.mouseControl = function() {
            if ((press[6] || press[7]) && !(press[6] && press[7])) {
                if (coolDown > 0) coolDown--;
                if (coolDown == 0) {
                    var direction = new THREE.Vector3();
                    var blockPosition;
                    var raycaster = new THREE.Raycaster();
                    raycaster.setFromCamera(new THREE.Vector2(0, 0), Vokkit.getClient().getSceneManager().getCamera());
                    var intersects = raycaster.intersectObjects(Vokkit.getClient().getSceneManager().getScene().children);
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

        setInterval(function () {

            //나중에 새로운 클래스로 분리
        }, 250);
    }

    this.getPress = function () {
        return press.slice();
    }
}

module.exports = InputManager;