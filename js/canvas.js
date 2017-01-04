window.addEventListener('load', init, false);

var clickPosition = { x: 100, y: 100 };

function init() {
    console.log('init()');

    var canvas = undefined;
    var context = undefined;
    var x = 0;
    var y = 300;
    var width = window.innerWidth;
    var height = window.innerHeight;
    var ball = undefined;
    var line = undefined;

    canvas = createCanvas(x, y, width, height);
    context = canvas.getContext('2d');

    var angle = 10;
    line = new Line(new Vector(x, y), 800, angle, 'yellow', context);
    line.update();

    ball = new Ball(new Vector(350, 100), 40, 'gray', context);
    ball.updateCollision(line.position, line.angle);
    ball.update();



    var line2 = new Line(ball.position, ball.radius, (angle - 180), 'pink', context);
    line2.showNormal = false;
    line2.showRightNormal = false;
    line2.update();

    // var angleFromBalltoLine = ball.position.findAngle(line.position);
    // var angleFromBalltoLine_Degrees = ball.position.toDegrees(angleFromBalltoLine)
    // var distanceFromBalltoLine = ball.position.findDistance(line.position);
    // //console.log(angleFromBalltoLine_Degrees);

    // var wholeAngle_degrees = line.angle + Math.abs(angleFromBalltoLine_Degrees);
    // var wholeAngle_radians = ball.position.toRadians(wholeAngle_degrees);
    // var wholeDistance = distanceFromBalltoLine * Math.sin(wholeAngle_radians);

    // //console.log(wholeDistance);
    // ball.position._normalLength = wholeDistance
    // ball.position.angle = (angle + 180) // dependin on position set the angle ratio

    // var endLineBall = ball.position.leftNormal();


    // context.beginPath();
    // context.strokeStyle = 'blue';
    // context.lineWidth = 6;
    // context.moveTo(endLineBall.x, endLineBall.y);
    // context.lineTo(ball.position.x, ball.position.y);
    // context.stroke();
    // context.closePath();


    // line2.reset();
    //line2.update();



    // var line3 = new Line(new Vector(x, y), distance, angle2, 'purple', context);
    // line3.showNormal = false;
    // line3.showRightNormal = false;
    // line3.update();

    function update() {
        context.clearRect(0, 0, width, height);


        line.update();

        ball.updateCollision(line.position, line.angle);
        ball.update();

        requestAnimationFrame(update);
    }

    update();
}

function mouseHandler(event) {

}

function createCanvas(x, y, width, height) {
    var canvas = document.createElement('canvas');
    document.body.appendChild(canvas);
    canvas.width = width;
    canvas.height = height;
    canvas.style.position = 'absolute';
    canvas.style.background = '#2b0d3b';
    return canvas;
}