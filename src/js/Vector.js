/**
 * @class Vector
 * @arg {(number|number[]|Vector)} [x=0] coordinate | [x=0, y=0] array of coordinates | another Vector
 * @arg {number} [y=0] coordinate
 */
function Vector(x, y) {
    Object.call(this);

    if (typeof x === 'object') {
        switch (x.constructor.name) {
            case 'Array':
                this.x = x[0] || 0;
                this.y = x[1] || 0;
                break;
            case 'Vector':
                this.x = x.x;
                this.y = x.y;
                break;
        }
    }
    else {
        this.x = x || 0;
        this.y = y || 0;
    }
}

Object.assign(Vector.prototype, {

    add: function (vector) {
        this.x += vector.x;
        this.y += vector.y;

        return this;
    },

    subtract: function (vector) {
        this.x -= vector.x;
        this.y -= vector.y;

        return this;
    },

    multiply: function (operand) {
        switch (typeof operand) {
            case 'number':
                this.x *= operand;
                this.y *= operand;
                break;
            case 'object':
                if (operand.constructor.name === 'Vector') {
                    this.x *= operand.x;
                    this.y *= operand.y;
                }
                break;
        }

        return this;
    },

    negate: function () {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    },

    rotate: function (angle) {
        var x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
        this.y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
        this.x = x;

        return this;
    },

    angleTo: function (vector) {
        var cross = this.x * vector.y - this.y * vector.x;
        var angle = Math.acos(this.dot(vector) / Math.sqrt(this.lengthSq() * vector.lengthSq()));

        return isNaN(angle) ? 0 : (cross > 0 ? angle : -angle);
    },

    dot: function (vector) {
        return this.x * vector.x + this.y * vector.y;
    },

    length: function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },

    lengthSq: function () {
        return this.x * this.x + this.y * this.y;
    },

    normalize: function () {
        var length = this.length();

        this.x /= length;
        this.y /= length;

        return this;
    },

    copy: function () {
        return new Vector(this);
    }

});
