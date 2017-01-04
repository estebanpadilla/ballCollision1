function Ball(position, radius, color, context) {
    this.position = position;
    this.radius = radius;
    this.color = color;
    this.context = context;
    this.target = undefined;
    this.stop = false;
}

Ball.prototype.render = function render() {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
    this.context.fill();
    this.context.closePath();
}

Ball.prototype.update = function update() {
    if (!this.stop) {
        this.position.x -= 1;
        this.position.y += 1;

    }
    this.render();
}


Ball.prototype.updateCollision = function updateCollision(target, angle) {

    var angleFromBalltoLine = this.position.findAngle(target);

    // if (angleFromBalltoLine < 0) {
    var angleFromBalltoLine_Degrees = toDegrees(angleFromBalltoLine)
    var distanceFromBalltoLine = this.position.findDistance(target);
    // console.log(angleFromBalltoLine_Degrees);
    // }


    var wholeAngle_degrees = angle + Math.abs(angleFromBalltoLine_Degrees);
    var wholeAngle_radians = toRadians(wholeAngle_degrees);
    var wholeDistance = distanceFromBalltoLine * Math.sin(wholeAngle_radians);
    //console.log(distanceFromBalltoLine);

    //console.log(wholeAngle_degrees);
    this.position.normalLength = wholeDistance
    this.position.angle = 0 // dependin on position set the angle ratio

    var endLineBall = this.position.getNormal((180 + angle), 0);

    this.context.beginPath();
    this.context.strokeStyle = 'blue';
    this.context.lineWidth = 6;
    this.context.moveTo(endLineBall.x, endLineBall.y);
    this.context.lineTo(this.position.x, this.position.y);
    this.context.stroke();
    this.context.closePath();

    console.log(wholeDistance);

    if (wholeDistance < this.radius) {
        console.log('Collision');
        this.stop = true;
    }
}


function Line(position, length, angle, color, context) {
    this.position = position;
    this.length = length;
    this.angle = angle;
    this.color = color;
    this.context = context;

    this.showLeftNormal = true;
    this.showRightNormal = true;
    this.showNormal = true;
}

Line.prototype.render = function render() {


    this.context.beginPath();
    this.context.strokeStyle = this.color;
    this.context.lineWidth = 3;
    this.context.moveTo(this.position.x, this.position.y);
    var endPoint = this.position.endPoint(this.angle, this.length);
    this.context.lineTo(endPoint.x, endPoint.y);
    // this.context.lineTo(400, 400);
    this.context.stroke();
    this.context.closePath();


    this.context.lineWidth = 1;
    if (this.showLeftNormal) {
        this.context.beginPath();
        this.context.strokeStyle = 'red';
        var startPoint = this.position.endPoint(this.angle, 0);
        this.context.moveTo(startPoint.x, startPoint.y);
        var endPosition = this.position.getNormal(this.angle, 0);
        this.context.lineTo(endPosition.x, endPosition.y);
        this.context.stroke();
        this.context.closePath();
    }

    if (this.showRightNormal) {
        this.context.beginPath();
        this.context.strokeStyle = 'cyan';
        var startPoint = this.position.endPoint(this.angle, this.length);
        this.context.moveTo(startPoint.x, startPoint.y);
        var endPosition = this.position.getNormal(this.angle, this.length);
        this.context.lineTo(endPosition.x, endPosition.y);
        this.context.stroke();
        this.context.closePath();
    }

    if (this.showNormal) {
        this.context.beginPath();
        this.context.strokeStyle = 'white';
        var startPoint = this.position.endPoint(this.angle, (this.length / 2));
        this.context.moveTo(startPoint.x, startPoint.y);
        var endPosition = this.position.getNormal(this.angle, (this.length / 2));
        this.context.lineTo(endPosition.x, endPosition.y);
        this.context.stroke();
        this.context.closePath();
    }
}

Line.prototype.update = function update() {
    //this.position.reset();
    this.render();
}