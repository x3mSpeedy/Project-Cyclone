/*** AIMING MODULE ***/

/*** Component - closest mob ***/
Crafty.c (AIMING_CLOSEST, {
    getElement: function (elems, startPoint) {
        var minDistance = Number.MAX_VALUE;
        var element = 0;
        var tempDist;
        for (var i in elems) {
            tempDist = distance (elems[i].center, startPoint);
            if (tempDist < minDistance) {
                minDistance = tempDist;
                element = elems[i].center;
            }
        }
        return element;
    }
});

/*** Component - furthest mob ***/
Crafty.c (AIMING_FURTHEST, {
    getElement: function (elems, startPoint) {
        var maxDistance = Number.MIN_VALUE;
        var element = 0;
        var tempDist;
        for (var i in elems) {
            tempDist = distance (elems[i].center, startPoint);
            if (tempDist > maxDistance) {
                maxDistance = tempDist;
                element = elems[i].center;
            }
        }
        return element;
    }
});

/*** Component - most health mob ***/
Crafty.c (AIMING_MOST_HEALTH, {
    getElement: function (elems, startPoint) {
        var maxHealth = Number.MIN_VALUE;
        var element = 0;
        var tempHealth;
        for (var i in elems) {
            tempHealth = elems[i].getHealth () + elems[i].getShield ();
            if (tempHealth > maxHealth) {
                maxHealth = tempHealth;
                element = elems[i].center;
            }
        }
        return element;
    }
});

/*** Component - least health mob ***/
Crafty.c (AIMING_LEAST_HEALTH, {
    getElement: function (elems, startPoint) {
        var minHealth = Number.MAX_VALUE;
        var element = 0;
        var tempHealth;
        for (var i in elems) {
            tempHealth = elems[i].getHealth () + elems[i].getShield ();
            if (tempHealth < minHealth) {
                minHealth = tempHealth;
                element = elems[i].center;
            }
        }
        return element;
    }
});

/*** Component - no freeze mob ***/
Crafty.c (AIMING_NO_FREEZE, {
    getElement: function (elems, startPoint) {
        for (var i in elems)
            if (elems[i].slowShot === null)
                return elems[i].center;
        return elems[0].center;
    }
});

/*** Component - shielded mob ***/
Crafty.c (AIMING_SHIELD, {
    getElement: function (elems, startPoint) {
        for (var i in elems) {
            if (elems[i].shield !== 0)
                return elems[i].center;
        }
        return elems[0].center;
    }
});

var closest = Crafty.e (AIMING_CLOSEST);
var furthest = Crafty.e (AIMING_FURTHEST);
var mostHealth = Crafty.e (AIMING_MOST_HEALTH);
var leastHealth = Crafty.e (AIMING_LEAST_HEALTH);
var noFreeze = Crafty.e (AIMING_NO_FREEZE);
var shield = Crafty.e(AIMING_SHIELD);

/*** Define as global object ***/
window.aiming = {
    get: function (type) {
        switch (type) {
            case AIMING_CLOSEST:
                return closest;
            case AIMING_FURTHEST:
                return furthest;
            case AIMING_MOST_HEALTH:
                return mostHealth;
            case AIMING_LEAST_HEALTH:
                return leastHealth;
            case AIMING_NO_FREEZE:
                return noFreeze;
            case AIMING_SHIELD:
                return shield;
        }
    }
};

