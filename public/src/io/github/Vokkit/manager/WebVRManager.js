/**
 * @author mrdoob / http://mrdoob.com
 * @author Mugen87 / https://github.com/Mugen87
 *
 * Based on @tojiro's vr-samples-utils.js
 */
/*
var WEBVR = {

    isAvailable: function () {

        console.warn('WEBVR: isAvailable() is being deprecated. Use .checkAvailability() instead.');
        return navigator.getVRDisplays !== undefined;

    },

    checkAvailability: function () {

        return new Promise(function (resolve, reject) {

            if (navigator.getVRDisplays !== undefined) {

                navigator.getVRDisplays().then(function (displays) {

                    if (displays.length === 0) {

                        reject('WebVR이 호환되지만, 사용 가능한 디스플레이가 없습니다.');

                    } else {

                        resolve();

                    }

                });

            } else {

                reject('웹 브라우저가 WebVR을 지원하지 않습니다. <a href="https://webvr.info">webvr.info</a>를 둘러보세요.');

            }

        });

    },

    getVRDisplay: function (onDisplay) {

        if ('getVRDisplays' in navigator) {

            navigator.getVRDisplays()
                .then(function (displays) {
                    onDisplay(displays[0]);
                });

        }

    },

    getMessage: function () {

        console.warn('WEBVR: getMessage() is being deprecated. Use .getMessageContainer( message ) instead.');

        var message;

        if (navigator.getVRDisplays) {

            navigator.getVRDisplays().then(function (displays) {

                if (displays.length === 0) message = 'WebVR supported, but no VRDisplays found.';

            });

        } else {

            message = 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.';

        }

        if (message !== undefined) {

            var container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '0';
            container.style.top = '0';
            container.style.right = '0';
            container.style.zIndex = '999';
            container.align = 'center';

            var error = document.createElement('div');
            error.style.fontFamily = 'sans-serif';
            error.style.fontSize = '16px';
            error.style.fontStyle = 'normal';
            error.style.lineHeight = '26px';
            error.style.backgroundColor = '#fff';
            error.style.color = '#000';
            error.style.padding = '10px 20px';
            error.style.margin = '50px';
            error.style.display = 'inline-block';
            error.innerHTML = message;
            container.appendChild(error);

            return container;

        }

    },

    getMessageContainer: function (message) {

        var container = document.createElement('div');
        container.style.position = 'absolute';
        container.style.left = '0';
        container.style.top = '0';
        container.style.right = '0';
        container.style.zIndex = '999';
        container.align = 'center';

        var error = document.createElement('div');
        error.style.fontFamily = 'sans-serif';
        error.style.fontSize = '16px';
        error.style.fontStyle = 'normal';
        error.style.lineHeight = '26px';
        error.style.backgroundColor = '#fff';
        error.style.color = '#000';
        error.style.padding = '10px 20px';
        error.style.margin = '50px';
        error.style.display = 'inline-block';
        error.innerHTML = message;
        container.appendChild(error);

        return container;

    },

    getButton: function (display, canvas) {

        if ('VREffect' in THREE && display instanceof THREE.VREffect) {

            console.error('WebVR.getButton() now expects a VRDisplay.');
            return document.createElement('button');

        }

        var button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.left = 'calc(50% - 50px)';
        button.style.bottom = '20px';
        button.style.width = '100px';
        button.style.border = '0';
        button.style.padding = '8px';
        button.style.cursor = 'pointer';
        button.style.backgroundColor = '#000';
        button.style.color = '#fff';
        button.style.fontFamily = 'sans-serif';
        button.style.fontSize = '13px';
        button.style.fontStyle = 'normal';
        button.style.textAlign = 'center';
        button.style.zIndex = '999';

        if (display) {

            button.textContent = 'ENTER VR';
            button.onclick = function () {

                display.isPresenting ? display.exitPresent() : display.requestPresent([{ source: canvas }]);

            };

            window.addEventListener('vrdisplaypresentchange', function () {

                button.textContent = display.isPresenting ? 'EXIT VR' : 'ENTER VR';

            }, false);

        } else {

            button.textContent = 'NO VR DISPLAY';

        }

        return button;

    }

};


WEBVR.checkAvailability().catch(function (message) {

    document.body.appendChild(WEBVR.getMessageContainer(message));

});*/

function WebVRManager() {

}

WebVRManager.prototype.init = function () {
    this.checkAvailability();
    var webvrmanager = this;
    var camera = Vokkit.getClient().getSceneManager().getCamera();
    var quaternion = new THREE.Quaternion();
    var zee = new THREE.Vector3(0, 0, 1);
    var euler = new THREE.Euler();
    var q0 = new THREE.Quaternion();
    var q1 = new THREE.Quaternion(- Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
    var orient = 0;
    var object = new THREE.Object3D();
    window.addEventListener("orientationchange", function () {
        orient = window.orientation || 0;
    });
    window.addEventListener("deviceorientation", function (event) {
        euler.set(event.beta / 180 * Math.PI, event.alpha / 180 * Math.PI, - event.gamma / 180 * Math.PI, 'YXZ'); // 'ZXY' for the device, but 'YXZ' for us
        quaternion.setFromEuler(euler); // orient the device
        quaternion.multiply(q1); // camera looks out the back of the device, not the top
        quaternion.multiply(q0.setFromAxisAngle(zee, - orient)); // adjust for screen orientation
        object.quaternion.copy(quaternion);
        var direction = object.getWorldDirection();
        webvrmanager.pitch = Math.asin(-direction.y);
        webvrmanager.yaw = Math.atan2(direction.x, direction.z);

        if (webvrmanager.display != undefined && webvrmanager.display.isPresenting && webvrmanager.basicYaw != undefined) {
            webvrmanager.yaw -= webvrmanager.basicYaw;
        }
    }, true);

    Vokkit.getClient().getSocket().on("VRStart", function() {
        webvrmanager.isMobileVRMode = true;
    });

    Vokkit.getClient().getSocket().on("VREnd", function() {
        webvrmanager.isMobileVRMode = false;
    });

    Vokkit.getClient().getSocket().on("VRRotation", function(data) {
        webvrmanager.mobileYaw = data.yaw;
        webvrmanager.mobilePitch = data.pitch;
        camera.lookAt(new THREE.Vector3(-Math.sin(data.yaw) * Math.cos(data.pitch), Math.sin(data.pitch), -Math.cos(data.yaw) * Math.cos(data.pitch)));
    });

    window.addEventListener("vrdisplaypresentchange", function() {
        if (webvrmanager.display != undefined && webvrmanager.display.isPresenting) {
            Vokkit.getClient().getSocket().emit("VRStart");
        } else {
            Vokkit.getClient().getSocket().emit("VREnd");
        }
    })
}

WebVRManager.prototype.checkAvailability = function () {
    var webvrmanager = this;
    if (navigator.getVRDisplays !== undefined) {
        navigator.getVRDisplays().then(function (displays) {
            if (displays.length === 0) {
                webvrmanager.reject('WebVR이 호환되지만, 사용 가능한 디스플레이가 없습니다.');
            } else {
                webvrmanager.resolve(displays[0]);
            }
        });
    } else {
        webvrmanager.reject('웹 브라우저가 WebVR을 지원하지 않습니다. <a href="https://webvr.info">webvr.info</a>를 둘러보세요.');
    }
}

WebVRManager.prototype.reject = function (reason) {
    alert(reason);
}

WebVRManager.prototype.resolve = function (display) {
    alert('WebVR이 호환됩니다.');
    this.display = display;
}

WebVRManager.prototype.getVRDisplay = function (onDisplay) {
    navigator.getVRDisplays().then(function (displays) {
        onDisplay(displays[0]);
    });
}

WebVRManager.prototype.toggleVR = function () {
    if (this.display != undefined) {
        this.display.isPresenting ? this.display.exitPresent() : this.display.requestPresent([{ source: Vokkit.getClient().getSceneManager().getRenderer().domElement }]);
        if (this.display.isPresenting) {
            this.display.exitPresent();
        } else {
            var display = this.display;
            var renderer = Vokkit.getClient().getSceneManager().getRenderer();
            var camera = Vokkit.getClient().getSceneManager().getCamera();
            var webvrmanager = this;
            renderer.vr.enabled = true;
            Vokkit.getClient().getWebVRManager().getVRDisplay(function (display) {
                renderer.vr.setDevice(display);
                display.requestPresent([{ source: renderer.domElement }]);
                webvrmanager.basicYaw = webvrmanager.yaw;
                webvrmanager.basicPitch = webvrmanager.pitch;
            });
        }
    }
}

module.exports = WebVRManager;