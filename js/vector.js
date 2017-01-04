function Vector(x, y) {
    this.x = x;
    this.y = y;
    this.normalLength = 100;
}

//Returns the vectors end point using the length and angle.
Vector.prototype.endPoint = function endPoint(angle, length) {
    var r = angle * Math.PI / 180;
    var ey = (length * Math.sin(r)) + this.y;
    var ex = (length * Math.cos(r)) + this.x;
    return new Vector(ex, ey);
}

//position: sets the position on the shape where the normal will start to project.
Vector.prototype.getNormal = function getNormal(angle, position) {
    var start = this.endPoint(angle, position);
    return new Vector(start.x, start.y).endPoint(angle - 90, this.normalLength);
}

//Finds an angle to another vector.
Vector.prototype.findAngle = function findAngle(v) {
    var a = this.x - v.x;
    var o = this.y - v.y;
    return Math.atan2(o, a);
}

//Finds the distance to another vector.
Vector.prototype.findDistance = function findDistance(v) {
    var a = this.x - v.x;
    var o = this.y - v.y;
    return Math.sqrt((a * a) + (o * o));
}

function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

function toRadians(degrees) {
    return degrees * Math.PI / 180;
}
