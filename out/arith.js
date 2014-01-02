function __abs(x) {
    var x;
    if (x < 0) return -x;
    return x;
}

function ____max(x, y) {
    var x;
    var y;
    if (x < y) return y;
    return x;
}

function ____min(x, y) {
    var x;
    var y;
    if (x < y) return x;
    return y;
}

function __abs(x) {
    var x;
    if (x < __float(0)) return -x;
    return x;
}

function ____max(x, y) {
    var x;
    var y;
    if (x < y) return y;
    return x;
}

function ____min(x, y) {
    var x;
    var y;
    if (x < y) return x;
    return y;
}

var pi = 3.141593;

var degreesToRadians = ____quotient(pi, 180);

var radiansToDegrees = ____quotient(180, pi);