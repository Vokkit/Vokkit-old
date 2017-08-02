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
            renderer.vr.enabled = false;
            renderer.vr.setDevice(null);
        } else {
            var display = this.display;
            var renderer = Vokkit.getClient().getSceneManager().getRenderer();
            renderer.vr.enabled = true;
            Vokkit.getClient().getWebVRManager().getVRDisplay(function (display) {
                renderer.vr.setDevice(display);
                display.requestPresent([{ source: renderer.domElement }]);
            });
        }
    }
}

module.exports = WebVRManager;