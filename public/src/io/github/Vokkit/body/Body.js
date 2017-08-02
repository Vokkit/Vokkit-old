function Body(skinPath) {
    this.skinPath = skinPath;
    if (skinPath == undefined) return;
    var textureLoader = new THREE.TextureLoader();
    this.texture = textureLoader.load("/assets/skins/" + skinPath + ".png");
    this.texture.magFilter = THREE.NearestFilter;
    this.texture.minFilter = THREE.LinearMipMapLinearFilter;
    this.material = new THREE.MeshBasicMaterial({
        map: this.texture,
        overdraw: true
    });
}

Body.prototype.obb = function (anotherBody) {
    var pos1 = box1.getPosition(); // mat44
    var pos2 = box2.getPosition(); // mat44
    var center1 = vec4.transformMat4(vec4.create(), box1.getCenter(), pos1);
    var center2 = vec4.transformMat4(vec4.create(), box2.getCenter(), pos2);
    var centerDifference = vec4.subtract(vec4.create(), center2, center1);

    var results = {
        intersects: true,
        resolution: null
    };

    // broad phase
    var maxDiameter1 = vec4.length(vec4.subtract(vec4.create(), box1.getMax(), box1.getMin()));
    var maxDiameter2 = vec4.length(vec4.subtract(vec4.create(), box2.getMax(), box2.getMin()));
    if (vec4.length(centerDifference) > maxDiameter1 + maxDiameter2) {
        results.intersects = false;
        return results;
    }

    // narrow phase

    // get the axis vectors of the first box
    var ax1 = mat4.col(pos1, 0);
    var ay1 = mat4.col(pos1, 1);
    var az1 = mat4.col(pos1, 2);
    // get the axis vectors of the second box
    var ax2 = mat4.col(pos2, 0);
    var ay2 = mat4.col(pos2, 1);
    var az2 = mat4.col(pos2, 2);

    // keep them in a list
    var axes = [ax1, ay1, az1, ax2, ay2, az2];

    // get the orientated radii vectors of the first box
    var radii1 = box1.getRadii();
    var radX1 = vec4.scale(vec4.create(), ax1, radii1[0]);
    var radY1 = vec4.scale(vec4.create(), ay1, radii1[1]);
    var radZ1 = vec4.scale(vec4.create(), az1, radii1[2]);

    // get the orientated radii vectors of the second box
    var radii2 = box2.getRadii();
    var radX2 = vec4.scale(vec4.create(), ax2, radii2[0]);
    var radY2 = vec4.scale(vec4.create(), ay2, radii2[1]);
    var radZ2 = vec4.scale(vec4.create(), az2, radii2[2]);

    var smallestDifference = Infinity;
    // there are 15 axes to check, so loop through all of them until a separation plane is found
    var zeros = vec4.create();
    for (var i = 0; i < 15; i++) {
        var axis;

        // the first 6 axes are just the axes of each bounding box
        if (i < 6) {
            axis = axes[i];
        }
        // the last 9 axes are the cross product of all combinations of the first 6 axes
        else {
            var offset = i - 6;
            var j = Math.floor(offset / 3);
            var k = offset % 3;
            axis = vec4.cross(vec4.create(), axes[j], axes[k + 3]);
            if (vec4.close(axis, zeros)) {
                // axes must be collinear, ignore
                continue;
            }
        }

        // get the projections of the first half box onto the axis
        var projAx1 = Math.abs(vec4.dot(radX1, axis));
        var projAy1 = Math.abs(vec4.dot(radY1, axis));
        var projAz1 = Math.abs(vec4.dot(radZ1, axis));

        // get the projections of the second half box onto the axis
        var projAx2 = Math.abs(vec4.dot(radX2, axis));
        var projAy2 = Math.abs(vec4.dot(radY2, axis));
        var projAz2 = Math.abs(vec4.dot(radZ2, axis));

        // sum the projections
        var projectionBoxesSum = projAx1 + projAy1 + projAz1 + projAx2 + projAy2 + projAz2;

        // get the projection of the center difference onto the axis
        var projectionDifference = Math.abs(vec4.dot(centerDifference, axis));

        if (projectionDifference >= projectionBoxesSum) {
            // If the projection of the center difference onto the axis is greater
            // than the sum of the box projections, then we found a separating plane!
            // The bounding boxes therefore must not intersect
            results.intersects = false;
            break;
        }
        else {
            // keep track of the difference, the smallest gives the minimum distance
            // and direction to move the boxes such that they no longer intersect
            var difference = projectionBoxesSum - projectionDifference;
            if (difference < smallestDifference) {
                results.resolution = vec4.scale(vec4.create(), axis, difference);
                smallestDifference = difference;
            }
        }
    }

    if (results.intersects) {
        // make sure the resolution vector is in the correct direction
        var dot = vec4.dot(results.resolution, centerDifference);
        var sign = dot ? dot < 0 ? -1 : 1 : 0;
        vec4.scale(results.resolution, results.resolution, -sign);
    }

    return results;
}

module.exports = Body;