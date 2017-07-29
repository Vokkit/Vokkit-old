function Location(world, x, y, z, yaw, pitch) {
    this.world = world;
    this.x = x;
    this.y = y;
    this.z = z;
    this.yaw = yaw || 0;
    this.pitch = pitch || 0;

    var location = this;

    this.getWorld = function () {
        return location.world;
    }

    this.setWorld = function (world) {
        location.world = world;
        return location;
    }

    this.getX = function () {
        return location.x;
    }

    this.setX = function (x) {
        location.x = x;
        return location;
    }

    this.getY = function () {
        return location.y;
    }

    this.setY = function (y) {
        location.y = y;
        return location;
    }

    this.getZ = function () {
        return location.z;
    }

    this.setZ = function (z) {
        location.z = z;
        return location;
    }

    this.getYaw = function () {
        return location.yaw;
    }

    this.setYaw = function (yaw) {
        location.yaw = yaw;
        return location;
    }

    this.getPitch = function () {
        return location.pitch;
    }

    this.setPitch = function (pitch) {
        location.pitch = pitch;
        return location;
    }

    this.distance = function (loc) {
        return Math.sqrt(location.distanceSquared(loc));
    }

    this.distanceSquared = function (loc) {
        return Math.pow(loc.x - location.x, 2) + Math.pow(loc.y - location.y, 2) + Math.pow(loc.z - location.z, 2);
    }

    this.set = function (x, y, z) {
        if (x instanceof Location) {
            location.x = x.x;
            location.y = x.y;
            location.z = x.z;
        } else if (Array.isArray(x)) {
            location.x = x[0];
            location.y = x[1];
            location.z = x[2];
        } else {
            location.x = x;
            location.y = y;
            location.z = z;
        }
        return location;
    }

    this.add = function (x, y, z) {
        if (x instanceof Location) {
            location.x += x.x;
            location.y += x.y;
            location.z += x.z;
        } else if (Array.isArray(x)) {
            location.x += x[0];
            location.y += x[1];
            location.z += x[2];
        } else {
            location.x += x;
            location.y += y;
            location.z += z;
        }
        return location;
    }

    this.subtract = function(x, y, z) {
        if (x instanceof Location) {
            location.x -= x.x;
            location.y -= x.y;
            location.z -= x.z;
        } else if (Array.isArray(x)) {
            location.x -= x[0];
            location.y -= x[1];
            location.z -= x[2];
        } else {
            location.x -= x;
            location.y -= y;
            location.z -= z;
        }
        return location;
    }

    this.clone = function() {
        return new Location(location.world, location.x, location.y, location.z, location.yaw, location.pitch);
    }

    this.copy = function(loc) {
        location.world = loc.world;
        location.x = loc.x;
        location.y = loc.y;
        location.z = loc.z;
        location.yaw = loc.yaw;
        location.pitch = loc.pitch;
        return location;
    }

    this.equals = function(loc) {
        return loc.world.equals(location.world) && loc.x == location.x && loc.y == location.y && loc.z == location.z && loc.yaw == location.yaw && loc.pitch == location.pitch;
    }
}

Location.locToBlock = function (loc) {
    loc.set(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z));
    return loc;
}

module.exports = Location;