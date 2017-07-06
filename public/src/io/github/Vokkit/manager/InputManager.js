var press = [false, false, false, false, false, false];

function InputManager(){
    this.init = function(){
        var renderer = Vokkit.getClient().getSceneManager().getRenderer();
        var camera = Vokkit.getClient().getSceneManager().getCamera();
        renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
            renderer.domElement.mozRequestPointerLock;
        renderer.domElement.onclick = function () {
            renderer.domElement.requestPointerLock();
        }
        document.addEventListener('pointerlockchange', onPointerLockChange, false);
        document.addEventListener('mozpointerlockchange', onPointerLockChange, false);
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        function onPointerLockChange() {
            if (document.pointerLockElement === renderer.domElement || document.mozPointerLockElement === renderer.domElement) {
                document.addEventListener("mousemove", onMouseMove, false);
            } else {
                document.removeEventListener("mousemove", onMouseMove, false);
            }
        }

        function onMouseMove(e) {
            var localPlayer = Vokkit.getClient().getLocalPlayer();
            localPlayer.yaw += e.movementX / 1000;
            localPlayer.pitch -= e.movementY / 1000;
            if (localPlayer.pitch > Math.PI / 2) localPlayer.pitch = Math.PI / 2 - 0.0001;
            if (localPlayer.pitch < -Math.PI / 2) localPlayer.pitch = -Math.PI / 2 + 0.0001;
            camera.lookAt(new THREE.Vector3(camera.position.x - Math.sin(localPlayer.yaw) * Math.cos(localPlayer.pitch), camera.position.y + Math.sin(localPlayer.pitch), camera.position.z + Math.cos(localPlayer.yaw) * Math.cos(localPlayer.pitch)));
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
    }

    this.getPress = function(){
        return press.slice();
    }
}

module.exports = InputManager;