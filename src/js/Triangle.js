/**
 * @class Triangle
 * @arg {Object} [args] :
 *   @arg {Vector} [args.position]
 *   @arg {number} [args.angle]
 *   @arg {Vector} [args.scale]
 *   @arg {Vector[]} [args.vertices] - array of 3 Vectors with local vertices coordinates
 */
function Triangle(args) {
    Object.call(this);
    args = args || {};
    args.vertices = args.vertices || [];

    this._position = args.position || new Vector(150, 150);
    this._angle = args.angle || 0;
    this._scale = args.scale || new Vector(1, 1);

    this._v = [
        args.vertices[0] || new Vector(-50, 50),
        args.vertices[1] || new Vector(50, 50),
        args.vertices[2] || new Vector(0, -100)
    ];
}

Object.assign(Triangle.prototype, {

    /**
     * Draws triangle on canvas with specified position, angle and scale
     * @arg context - canvas' drawing context object
     */
    draw: function (context) {
        // Sets up required transformations
        context.translate(this._position.x, this._position.y);
        context.rotate(this._angle);
        context.scale(this._scale.x, this._scale.y);

        // actual triangle
        context.beginPath();
        context.moveTo(this._v[0].x, this._v[0].y);
        context.lineTo(this._v[1].x, this._v[1].y);
        context.lineTo(this._v[2].x, this._v[2].y);
        context.lineTo(this._v[0].x, this._v[0].y);
        context.closePath();
        context.stroke();

        // triangle's center of mass
        context.fillStyle = "#FF0000";
        context.fillRect(-2, -2, 4, 4);

        // Restores previous transformations
        context.scale(1/this._scale.x, 1/this._scale.y);
        context.rotate(-this._angle);
        context.translate(-this._position.x, -this._position.y);
    },

    /**
     * @arg {number} index - index of vertex [0-2]
     * @returns {Vector} - vertex global coordinates (new instance)
     */
    getVertex: function (index) {
        return this._v[index].copy()
            .multiply(this._scale)
            .rotate(this._angle)
            .add(this._position);
    },

    /**
     * Updates triangle orientation according to the mouse
     * @arg {number} x
     * @arg {number} y
     */
    trackMouse: function (x, y) {
        // vector from triangle's center to its spearhead
        var orientation = this.getVertex(2).subtract(this._position),
            // vector from triangle's center to cursor position
            cursor = new Vector(x, y).subtract(this._position);

        this._angle += orientation.angleTo(cursor);
    }

});
