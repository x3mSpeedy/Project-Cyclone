


/**@
 * #Crafty Time
 * @category Utilities
 */
Crafty.c ("Framer", {
    init: function () {
        this._delays = [];
        this.paused = false;
        this.bind ("EnterFrame", function () {
            if (this.paused)
                return;
            for (var index in this._delays) {
                var item = this._delays[index];
                if (item && item.repeat !== 0 && --item.count === 0) {
                    item.func.call (item.ctx);
                    if (--item.repeat !== 0) {
                        item.count = item.frames;
                    }
                }
            }
        });
    },
    delay: function (func, frames, ctx) {
        return this._delays.push ({
            count: Math.floor (frames),
            func: func,
            frames: Math.floor (frames),
            ctx: ctx || this,
            repeat: 1
        }) - 1;
    },
    repeat: function (func, frames, ctx, repeat, count) {
        return this._delays.push ({
            count: Math.floor (count || frames),
            func: func,
            frames: Math.floor (frames),
            ctx: ctx || this,
            repeat: repeat || -1
        }) - 1;
    },
    /**@
     * #.clearTimer
     * @comp Crafty Time
     * @sign public this.clearTimer (int id)
     * @param id - delay/repeat id
     * 
     * This method will abort delay/repeat with given id
     * 
     */
    clearTimer: function (id) {
        this._delays[id].repeat = 0;
        this._delays[id].ctx = null;
    },
    clear: function () {
        this._delays = [];
        this.paused = false;
    }
});
/**@
 * #Crafty HealthBar
 * @category Utilities
 */
Crafty.c ('HealthBar', {
    init: function () {
        this.healthbar = Crafty.e ('2D, Canvas').attr ({w: W, h: H});
        this.healthbarHeight = 4;
        this.healthbarWidth = this.w;
        this.healthbarPosition = this.h;
        this.healthbarColor = "#C00";
        this.healthbarShieldColor = "#00C";
        var _this = this;
        this.bind ('Death-shield', function () {
            _this.healthbar.destroy ();
        });
        this.healthbar.draw = function (e) {
            var ctx = Crafty.canvas.context;
            var x = _this.x + (_this.w - _this.healthbarWidth) / 2;
            var c = _this.maxShield === 0 || _this.shield === 0 ? _this.healthbarColor : _this.healthbarShieldColor;
            var t = _this.maxShield === 0 || _this.shield === 0 ? _this.health / _this.maxHealth : _this.shield / _this.maxShield;
            t = (t > 1 ? 1 : t < 0 ? 0 : t);
            if (t === 1)
                return;
            //# match position
            _this.healthbar.x = _this.x;
            _this.healthbar.y = _this.y;
            _this.healthbar.z = _this.z + 1;
            //# draw
            ctx.beginPath ();
            ctx.setFillColor ('#333');
            ctx.globalAlpha = 0.75;
            ctx.fillRect (x, _this.y + _this.healthbarPosition, _this.healthbarWidth, _this.healthbarHeight);
            ctx.globalAlpha = 1;
            ctx.setFillColor (c);
            ctx.fillRect (x, _this.y + _this.healthbarPosition, _this.healthbarWidth * t, _this.healthbarHeight);
            ctx.closePath ();
        };
        this.bind ('Move', this.healthbar.draw);
        this.bind ('HealthChanged', this.healthbar.draw);
    }
});
Crafty.c ('Shield', {
    init: function () {
        this.requires ('2D');
        this.requires ('Canvas');
        this.requires ('Image');
        this.requires ('shield');
        this.enemy = null;
        this.visible = false;
    },
    start: function () {
        if (this.enemy === null || this.enemy === undefined)
            return this.destroy ();
        this.attr ({w: this.enemy.w, h: this.enemy.h, z: this.enemy.z + 2});
        this.bind ('EnterFrame', this.update);
        return this;
    },
    update: function () {
        this.visible = this.enemy.visible;
        if (this.alpha !== this.enemy.alpha)
            this.alpha = this.enemy.alpha;
        this.x = this.enemy.center.x - this.w / 2;
        this.y = this.enemy.center.y - this.h / 2;
        if (this.enemy.shield <= 0) {
            this.enemy.shieldActor = null;
            this.destroy ();
        }
    }
});
var wavePreviewAlpha = 1;
var wavePreviewSpeed = 0;
var wavePreviewRadius = 1;
Crafty.c ('WavePreview', {
    init: function () {
        this.r = 50;
        this.items = [];
        this.shift = 0;
        this.sx = this.x + this.w / 2;
        this.sy = this.y + this.h / 2;
        this.step = 0;


        this.bind ('EnterFrame', this.update);
        this.bind ('MouseOver', showWavePreview);
        this.bind ('MouseOut', hideWavePreview);
    },
    setItems: function (value) {
        if (this.items.length !== 0) {
            for (var i in this.items)
                this.items[i].doDestroy ();
        }

        this.items = value;
        for (var i in this.items)
            this.items[i].alpha = wavePreviewAlpha;
        this.shift = 0;
        this.step = (2 * PI) / (360 * 10 / (10 - this.items.length));
        hideWavePreview (2000);
        return this;
    },
    update: function () {
        if (wavePreviewAlpha === 0)
            return;
        this.shift += this.step + wavePreviewSpeed;
        var l = this.items.length;
        for (var i = 0; i < l; i++) {
            var item = this.items[i];
            var a = (i / l) * 2 * PI + this.shift;
            item.x = this.sx + Math.sin (a) * this.r * wavePreviewRadius - item.w / 2;
            item.y = this.sy + Math.cos (a) * this.r * wavePreviewRadius - item.h / 2;
            item.alpha = wavePreviewAlpha;
        }

    }
});

function showWavePreview (d) {
    $ (window).stop ().animate ({wavePreviewAlpha: 1,
        wavePreviewSpeed: 0.0,
        wavePreviewRadius: 1},
    {duration: d || 200});
}

function hideWavePreview (d) {
    $ (window).stop ().animate ({wavePreviewAlpha: 0,
        wavePreviewSpeed: 0.1,
        wavePreviewRadius: 0.5},
    {duration: d || 200});
}
/**@
 * #Collision
 * @category 2D
 * Component to detect collision between any two convex polygons.
 */
Crafty.c ("Collision2", {
    /**@
     * #.init
     * @comp Collision
     * Create a rectangle polygon based on the x, y, w, h dimensions.
     *
     * You must ensure that the x, y, w, h properties are set before the init function is called. If you have a Car component that sets these properties you should create your entity like this
     * ~~~
     * Crafty.e('2D, DOM, Car, Collision');
     * ~~~
     * And not like
     * ~~~
     * Crafty.e('2D, DOM, Collision, Car');
     * ~~~
     */
    init: function () {
        this.requires ("2D");
        var area = this._mbr || this;
        poly = new Crafty.polygon ([0, 0], [area._w, 0], [area._w, area._h], [0, area._h]);
        this.map = poly;
        this.attach (this.map);
        this.map.shift (area._x, area._y);
        this.collisionSkip = 2;
        this.collisionCounter = 0;
    },
    /**@
     * #.collision
     * @comp Collision
     * 
     * @sign public this .collision([Crafty.polygon polygon])
     * @param polygon - Crafty.polygon object that will act as the hit area
     * 
     * @sign public this .collision(Array point1, .., Array pointN)
     * @param point# - Array with an `x` and `y` position to generate a polygon
     * 
     * Constructor takes a polygon or array of points to use as the hit area.
     *
     * The hit area (polygon) must be a convex shape and not concave
     * for the collision detection to work.
     *
     * If no hit area is specified x, y, w, h properties of the entity will be used.
     * 
     * @example
     * ~~~
     * Crafty.e("2D, Collision").collision(
     *     new Crafty.polygon([50,0], [100,100], [0,100])
     * );
     * 
     * Crafty.e("2D, Collision").collision([50,0], [100,100], [0,100]);
     * ~~~
     * 
     * @see Crafty.polygon
     */
    collision: function (poly) {
        var area = this._mbr || this;
        if (!poly) {
            poly = new Crafty.polygon ([0, 0], [area._w, 0], [area._w, area._h], [0, area._h]);
        }

        if (arguments.length > 1) {
//convert args to array to create polygon
            var args = Array.prototype.slice.call (arguments, 0);
            poly = new Crafty.polygon (args);
        }

        this.map = poly;
        this.attach (this.map);
        this.map.shift (area._x, area._y);
        return this;
    },
    /**@
     * #.hit
     * @comp Collision
     * @sign public Boolean/Array hit(String component)
     * @param component - Check collision with entities that has this component
     * @return `false` if no collision. If a collision is detected, returns an Array of objects that are colliding.
     * 
     * Takes an argument for a component to test collision for. If a collision is found, an array of
     * every object in collision along with the amount of overlap is passed.
     *
     * If no collision, will return false. The return collision data will be an Array of Objects with the
     * type of collision used, the object collided and if the type used was SAT (a polygon was used as the hitbox) then an amount of overlap.\
     * ~~~
     * [{
     *    obj: [entity],
     *    type "MBR" or "SAT",
     *    overlap: [number]
     * }]
     * ~~~
     * `MBR` is your standard axis aligned rectangle intersection (`.intersect` in the 2D component).
     * `SAT` is collision between any convex polygon.
     * 
     * @see .onHit, 2D
     */
    hit: function (comp) {
        var area = this._mbr || this,
                results = Crafty.map.search (area, false),
                i = 0, l = results.length,
                dupes = {},
                id, obj, oarea, key,
                hasMap = ('map' in this && 'containsPoint' in this.map),
                finalresult = [];
        if (!l) {
            return false;
        }

        for (; i < l; ++i) {
            obj = results[i];
            oarea = obj._mbr || obj; //use the mbr

            if (!obj)
                continue;
            id = obj[0];
            //check if not added to hash and that actually intersects
            if (!dupes[id] && this[0] !== id && obj.__c[comp] &&
                    oarea._x < area._x + area._w && oarea._x + oarea._w > area._x &&
                    oarea._y < area._y + area._h && oarea._h + oarea._y > area._y)
                dupes[id] = obj;
        }

        for (key in dupes) {
            obj = dupes[key];
            if (hasMap && 'map' in obj) {
                var SAT = this._SAT (this.map, obj.map);
                SAT.obj = obj;
                SAT.type = "SAT";
                if (SAT)
                    finalresult.push (SAT);
            } else {
                finalresult.push ({obj: obj, type: "MBR"});
            }
        }

        if (!finalresult.length) {
            return false;
        }

        return finalresult;
    },
    /**@
     * #.onHit
     * @comp Collision
     * @sign public this .onHit(String component, Function hit[, Function noHit])
     * @param component - Component to check collisions for
     * @param hit - Callback method to execute when collided with component
     * @param noHit - Callback method executed once as soon as collision stops
     * 
     * Creates an enterframe event calling .hit() each time and if collision detected will invoke the callback.
     * 
     * @see .hit
     */
    onHit: function (comp, callback, callbackOff) {
        var justHit = false;
        this.bind ("EnterFrame", function () {
            if (++this.collisionCounter % this.collisionSkip !== 0)
                return;
            var hitdata = this.hit (comp);
            if (hitdata) {
                justHit = true;
                callback.call (this, hitdata);
            } else if (justHit) {
                if (typeof callbackOff === 'function') {
                    callbackOff.call (this);
                }
                justHit = false;
            }
        });
        return this;
    },
    _SAT: function (poly1, poly2) {
        var points1 = poly1.points,
                points2 = poly2.points,
                i = 0, l = points1.length,
                j, k = points2.length,
                normal = {x: 0, y: 0},
        length,
                min1, min2,
                max1, max2,
                interval,
                MTV = null,
                MTV2 = null,
                MN = null,
                dot,
                nextPoint,
                currentPoint;
        //loop through the edges of Polygon 1
        for (; i < l; i++) {
            nextPoint = points1[(i == l - 1 ? 0 : i + 1)];
            currentPoint = points1[i];
            //generate the normal for the current edge
            normal.x = -(nextPoint[1] - currentPoint[1]);
            normal.y = (nextPoint[0] - currentPoint[0]);
            //normalize the vector
            length = Math.sqrt (normal.x * normal.x + normal.y * normal.y);
            normal.x /= length;
            normal.y /= length;
            //default min max
            min1 = min2 = -1;
            max1 = max2 = -1;
            //project all vertices from poly1 onto axis
            for (j = 0; j < l; ++j) {
                dot = points1[j][0] * normal.x + points1[j][1] * normal.y;
                if (dot > max1 || max1 === -1)
                    max1 = dot;
                if (dot < min1 || min1 === -1)
                    min1 = dot;
            }

//project all vertices from poly2 onto axis
            for (j = 0; j < k; ++j) {
                dot = points2[j][0] * normal.x + points2[j][1] * normal.y;
                if (dot > max2 || max2 === -1)
                    max2 = dot;
                if (dot < min2 || min2 === -1)
                    min2 = dot;
            }

//calculate the minimum translation vector should be negative
            if (min1 < min2) {
                interval = min2 - max1;
                normal.x = -normal.x;
                normal.y = -normal.y;
            } else {
                interval = min1 - max2;
            }

//exit early if positive
            if (interval >= 0) {
                return false;
            }

            if (MTV === null || interval > MTV) {
                MTV = interval;
                MN = {x: normal.x, y: normal.y};
            }
        }

//loop through the edges of Polygon 2
        for (i = 0; i < k; i++) {
            nextPoint = points2[(i == k - 1 ? 0 : i + 1)];
            currentPoint = points2[i];
            //generate the normal for the current edge
            normal.x = -(nextPoint[1] - currentPoint[1]);
            normal.y = (nextPoint[0] - currentPoint[0]);
            //normalize the vector
            length = Math.sqrt (normal.x * normal.x + normal.y * normal.y);
            normal.x /= length;
            normal.y /= length;
            //default min max
            min1 = min2 = -1;
            max1 = max2 = -1;
            //project all vertices from poly1 onto axis
            for (j = 0; j < l; ++j) {
                dot = points1[j][0] * normal.x + points1[j][1] * normal.y;
                if (dot > max1 || max1 === -1)
                    max1 = dot;
                if (dot < min1 || min1 === -1)
                    min1 = dot;
            }

//project all vertices from poly2 onto axis
            for (j = 0; j < k; ++j) {
                dot = points2[j][0] * normal.x + points2[j][1] * normal.y;
                if (dot > max2 || max2 === -1)
                    max2 = dot;
                if (dot < min2 || min2 === -1)
                    min2 = dot;
            }

//calculate the minimum translation vector should be negative
            if (min1 < min2) {
                interval = min2 - max1;
                normal.x = -normal.x;
                normal.y = -normal.y;
            } else {
                interval = min1 - max2;
            }

//exit early if positive
            if (interval >= 0) {
                return false;
            }

            if (MTV === null || interval > MTV)
                MTV = interval;
            if (interval > MTV2 || MTV2 === null) {
                MTV2 = interval;
                MN = {x: normal.x, y: normal.y};
            }
        }

        return {overlap: MTV2, normal: MN};
    }
});
Crafty.c ('Skipper', {
    init: function () {
        this.frameSkip = 0;
        this.prevSkip = this.frameSkip;
        this.bind ('EnterFrame', this.enterFrame);
    },
    skip: function (frameSkip) {
        this.frameSkip = frameSkip || 0;
        this.prevSkip = this.frameSkip;
    },
    enterFrame: function () {
        if (this.frameSkip <= 0)
            return;
        this.prevSkip--;
        if (this.prevSkip === 0) {
            this.prevSkip = this.frameSkip + 1;
            Crafty.timer.simulateFrames (this.frameSkip);
        }
    }
});
window.skipper = Crafty.e ('Skipper');
window.timer = Crafty.e ('Framer');