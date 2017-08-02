function MoveManager(){
    var socket;
    var moveManager = this;
    this.init = function(){
        socket = Vokkit.getClient().getSocket();
        socket.on("move", function(data){
            var players = Vokkit.getClient().getOnlinePlayers();
            for (var i in players) {
                if (players[i].getId() == data.id) {
                    var loc = players[i].getLocation();
                    loc.set(data.x, data.y, data.z);
                    loc.setYaw(data.yaw);
                    loc.setPitch(data.pitch);
                    players[i].teleport(loc);
                    players[i].setVelocity(new THREE.Vector3(data.velocity[0], data.velocity[1], data.velocity[2]));
                }
            }
        });
    }
    this.requestMove = function(location, velocity){
        socket.emit("requestMove", {
            x: location.x,
            y: location.y,
            z: location.z,
            yaw: location.yaw,
            pitch: location.pitch,
            velocity: [velocity.x, velocity.y, velocity.z]
        });
    }
    this.moveLocalPlayer = function(press){
        var localPlayer = Vokkit.getClient().getLocalPlayer();
        var location = localPlayer.getLocation();
        var yaw = location.getYaw();
        var fps = Vokkit.getClient().getSceneManager().getFPS();
        var multiply = 10 / fps;
        var velocity = localPlayer.getVelocity();
        if (press[0]) {
            velocity.add(new THREE.Vector3(-Math.sin(yaw), 0, Math.cos(yaw)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        } else if (press[1]) {
            velocity.add(new THREE.Vector3(Math.sin(yaw), 0, -Math.cos(yaw)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        }
        if (press[2]) {
            velocity.add(new THREE.Vector3(-Math.sin(yaw - Math.PI / 2), 0, Math.cos(yaw - Math.PI / 2)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        } else if (press[3]) {
            velocity.add(new THREE.Vector3(-Math.sin(yaw + Math.PI / 2), 0, Math.cos(yaw + Math.PI / 2)).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        }
        if (press[4]) {
            velocity.add(new THREE.Vector3(0, 1.5, 0).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        } else if (press[5]) {
            velocity.add(new THREE.Vector3(0, -1, 0).multiply(new THREE.Vector3(multiply, multiply, multiply)));
        }
        //localPlayer.addVelocity(new THREE.Vector3(0, -9.8 / fps, 0));
        localPlayer.setVelocity(velocity);
        var players = Vokkit.getClient().getOnlinePlayers();
        for (var i in players) {
            var velocity = players[i].getVelocity();
            if (velocity.x > 0.0001 || velocity.y > 0.0001 || velocity.z > 0.0001) players[i].body.playAnimation("walk");
            var location = players[i].getLocation();
            var add = new THREE.Vector3();
            var x = 0, y = 0, z = 0;
            var plusX = velocity.x > 0 ? 0.1 : -0.1;
            var plusY = velocity.y > 0 ? 0.1 : -0.1;
            var plusZ = velocity.z > 0 ? 0.1 : -0.1;
            var xFinish = velocity.x == 0, yFinish = velocity.y == 0, zFinish = velocity.z == 0;
            var xcollision = false, ycollision = false, zcollision = false;
            while(true) {
                if (!xFinish) {
                    var previousX = x;
                    if (velocity.x > 0) {
                        if (x < velocity.x - 0.1) x += 0.1;
                        else if (x < velocity.x) {
                            x = velocity.x;
                            xFinish = true;
                        }
                    }
                    
                    if (velocity.x < 0) {
                        if (x > velocity.x + 0.1) x -= 0.1;
                        else if (x > velocity.x) {
                            x = velocity.x;
                            xFinish = true;
                        }
                    }

                    var block = Vokkit.getClient().getWorlds()[0].getBlock(location.toVector().add(add.set(x + plusX, y + plusY, z + plusZ)));
                    if (block.id != 0) { // collision
                        xFinish = true;
                        x = previousX;
                        velocity.x = 0;
                        xcollision = true;
                    }
                    add.set(0, 0, 0);
                }

                if (!yFinish) {
                    var previousY = y;
                    if (velocity.y > 0) {
                        if (y < velocity.y - 0.1) y += 0.1;
                        else if (y < velocity.y) {
                            y = velocity.y;
                            yFinish = true;
                        }
                    }
                    
                    if (velocity.y < 0) {
                        if (y > velocity.y + 0.1) y -= 0.1;
                        else if (y > velocity.y) {
                            y = velocity.y;
                            yFinish = true;
                        }
                    }
                    var block = Vokkit.getClient().getWorlds()[0].getBlock(location.toVector().add(add.set(x + plusX, y + plusY, z + plusZ)));
                    if (block.id != 0) { // collision
                        yFinish = true;
                        y = previousY;
                        velocity.y = 0;
                        ycollision = true;
                    }
                    add.set(0, 0, 0);
                }

                if (!zFinish) {
                    var previousZ = z;
                    if (velocity.z > 0) {
                        if (z < velocity.z - 0.1) z += 0.1;
                        else if (z < velocity.z) {
                            z = velocity.z;
                            zFinish = true;
                        }
                    }
                    
                    if (velocity.z < 0) {
                        if (z > velocity.z + 0.1) z -= 0.1;
                        else if (z > velocity.z) {
                            z = velocity.z;
                            zFinish = true;
                        }
                    }
                    var block = Vokkit.getClient().getWorlds()[0].getBlock(location.toVector().add(add.set(x + plusX, y + plusY, z + plusZ)));
                    if (block.id != 0) { // collision
                        zFinish = true;
                        z = previousZ;
                        velocity.z = 0;
                        zcollision = true;
                    }
                    add.set(0, 0, 0);
                }

                if (xFinish && yFinish && zFinish) break;
            }
            players[i].teleport(players[i].getLocation().add(x, y, z));
            if (ycollision) players[i].setVelocity(velocity.multiply(new THREE.Vector3(0.5, 0.7, 0.5)));
            else players[i].setVelocity(velocity.multiply(new THREE.Vector3(0.7, 0.7, 0.7)));
        }
        moveManager.requestMove(localPlayer.getLocation(), localPlayer.getVelocity());
    }
}

module.exports = MoveManager;