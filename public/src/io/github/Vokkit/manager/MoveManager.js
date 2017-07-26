var THREE = require("three");

function MoveManager(){
    var socket;
    var moveManager = this;
    this.init = function(){
        socket = Vokkit.getClient().getSocket();
        socket.on("move", function(data){
            var players = Vokkit.getClient().getOnlinePlayers();
            for (var i in players) {
                if (players[i].getId() == data.id) {
                    players[i].setPosition(new THREE.Vector3(data.position.x, data.position.y, data.position.z));
                    players[i].setAcceleration(new THREE.Vector3(data.acceleration.x, data.acceleration.y, data.acceleration.z));
                }
            }
        });
    }
    this.requestMove = function(position){
        socket.emit("requestMove", {
            x: position.x,
            y: position.y,
            z: position.z
        });
    }
    this.moveLocalPlayer = function(press){
        var localPlayer = Vokkit.getClient().getLocalPlayer();
        var position = localPlayer.getPosition();
        var yaw = localPlayer.getYaw();
        var fps = Vokkit.getClient().getSceneManager().getFPS();
        var multiply = 10 / fps;
        if (press[0]) {
            localPlayer.addAcceleration(new THREE.Vector3(-Math.sin(yaw), 0, Math.cos(yaw)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        } else if (press[1]) {
            localPlayer.addAcceleration(new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        }
        if (press[2]) {
            localPlayer.addAcceleration(new THREE.Vector3(-Math.sin(yaw - Math.PI / 2), 0, Math.cos(yaw - Math.PI / 2)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        } else if (press[3]) {
            localPlayer.addAcceleration(new THREE.Vector3(-Math.sin(yaw + Math.PI / 2), 0, Math.cos(yaw + Math.PI / 2)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        }
        if (press[4]) {
            localPlayer.addAcceleration(new THREE.Vector3(0, 1.5, 0).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        } else if (press[5]) {
            localPlayer.addAcceleration(new THREE.Vector3(0, -1, 0).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        }
        //localPlayer.addAcceleration(new THREE.Vector3(0, -9.8 / fps, 0));
        var players = Vokkit.getClient().getOnlinePlayers();
        for (var i in players) {
            //players[i].setPosition(players[i].getPosition().add(players[i].getAcceleration())); - No Collision
            var acceleration = players[i].getAcceleration();
            //if (acceleration.x == 0 && acceleration.y == 0 && acceleration.z == 0) continue;
            var position = players[i].getPosition().clone();
            var add = new THREE.Vector3();
            var x = 0, y = 0, z = 0;
            var plusX = acceleration.x > 0 ? 0.1 : -0.1;
            var plusY = acceleration.y > 0 ? 0.1 : -0.1;
            var plusZ = acceleration.z > 0 ? 0.1 : -0.1;
            var xFinish = acceleration.x == 0, yFinish = acceleration.y == 0, zFinish = acceleration.z == 0;
            var xcollision = false, ycollision = false, zcollision = false;
            while(true) {
                if (!xFinish) {
                    var previousX = x;
                    if (acceleration.x > 0) {
                        if (x < acceleration.x - 0.1) x += 0.1;
                        else if (x < acceleration.x) {
                            x = acceleration.x;
                            xFinish = true;
                        }
                    }
                    
                    if (acceleration.x < 0) {
                        if (x > acceleration.x + 0.1) x -= 0.1;
                        else if (x > acceleration.x) {
                            x = acceleration.x;
                            xFinish = true;
                        }
                    }

                    var block = Vokkit.getClient().getWorlds()[0].getBlock(position.clone().add(add.set(x + plusX, y + plusY, z + plusZ)));
                    if (block.id != 0) { // collision
                        xFinish = true;
                        x = previousX;
                        acceleration.x = 0;
                        xcollision = true;
                    }
                    add.set(0, 0, 0);
                }

                if (!yFinish) {
                    var previousY = y;
                    if (acceleration.y > 0) {
                        if (y < acceleration.y - 0.1) y += 0.1;
                        else if (y < acceleration.y) {
                            y = acceleration.y;
                            yFinish = true;
                        }
                    }
                    
                    if (acceleration.y < 0) {
                        if (y > acceleration.y + 0.1) y -= 0.1;
                        else if (y > acceleration.y) {
                            y = acceleration.y;
                            yFinish = true;
                        }
                    }
                    var block = Vokkit.getClient().getWorlds()[0].getBlock(position.clone().add(add.set(x + plusX, y + plusY, z + plusZ)));
                    if (block.id != 0) { // collision
                        yFinish = true;
                        y = previousY;
                        acceleration.y = 0;
                        ycollision = true;
                    }
                    add.set(0, 0, 0);
                }

                if (!zFinish) {
                    var previousZ = z;
                    if (acceleration.z > 0) {
                        if (z < acceleration.z - 0.1) z += 0.1;
                        else if (z < acceleration.z) {
                            z = acceleration.z;
                            zFinish = true;
                        }
                    }
                    
                    if (acceleration.z < 0) {
                        if (z > acceleration.z + 0.1) z -= 0.1;
                        else if (z > acceleration.z) {
                            z = acceleration.z;
                            zFinish = true;
                        }
                    }
                    var block = Vokkit.getClient().getWorlds()[0].getBlock(position.clone().add(add.set(x + plusX, y + plusY, z + plusZ)));
                    if (block.id != 0) { // collision
                        zFinish = true;
                        z = previousZ;
                        acceleration.z = 0;
                        zcollision = true;
                    }
                    add.set(0, 0, 0);
                }

                if (xFinish && yFinish && zFinish) break;
            }
            players[i].setPosition(players[i].getPosition().add(new THREE.Vector3(x, y, z)));
            if (ycollision) players[i].setAcceleration(acceleration.multiply(new THREE.Vector3(0.5, 0.7, 0.5)));
            else players[i].setAcceleration(acceleration.multiply(new THREE.Vector3(0.7, 0.7, 0.7)));
        }
        moveManager.requestMove(localPlayer.getPosition());
    }
}

module.exports = MoveManager;