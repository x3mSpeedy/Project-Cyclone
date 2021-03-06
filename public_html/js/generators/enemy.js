window.enemy = window.enemy || {};

/**
 * Method returns enemy object, which will serve as generator based on
 * given object.
 * Object can contain several properies, such as health, or speed. 
 * Inheritance can be done by setting property 'preset' to desired parent.
 * <br /><br />
 * Value of properties is either number or constant name.<br />
 * E.g. {health: '200'} => health will be 200 <br />
 * E.g. {health: 'boss'} => health will be ENEMY_HEALTH.boss
 * <br /><br />
 * Value of resistance can only be array
 * @param {Object} o
 * @returns {Object} enemy generator with given properties
 * @example enemy.parse({
 *     preset: 'test',
 *     health: 'weak',
 *     speed: 'snail',
 *     resistance
 * });
 */
enemy.parse = function (o) {
    g = enemy.preset (o.preset);
    var props = ['health', 'shield', 'speed', 'wobble'];
    for (var i in props)
        g[props[i]] = o.hasOwnProperty (props[i])
                ? (isNaN (Number (o[props[i]]))
                ? window['ENEMY_' + props[i].toUpperCase ()][o[props[i]]]
                : Number (o[props[i]]))
                : g[props[i]];
    g.resistance = toDamage (ENEMY_TYPE[o.resistance || 'no']);
    g.money = o.money || 0;
    g.image = "{0}_{1}".format (ENEMY_IMAGE[o.image || 'red'],
            o.size ? (ENEMY_SIZE[o.size] || o.size) : ENEMY_SIZE.normal);
    return g;
};


/**
 * Method returns enemy object, which will serve as generator
 * @param {String} name of the preset
 * @returns {Object} default generator, preset generator or null if given name
 * is unregistered
 * @example enemy.preset ('test'); //# will return generator with name 'test'
 */
enemy.preset = function (name) {
    if (name === undefined || name === null)
        return {
            health: ENEMY_HEALTH.lvl0,
            shield: ENEMY_SHIELD.lvl0,
            speed: ENEMY_SPEED.lvl1,
            resistance: toDamage (ENEMY_TYPE.no),
            size: ENEMY_SIZE.lvl24,
            image: ENEMY_IMAGE.red,
            wobble: ENEMY_WOBBLE.lvl1,
            money: 0
        };

    switch (name) {
        case 'slow_small_weak':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.small,
                speed: ENEMY_SPEED.slow,
                health: ENEMY_HEALTH.weak
            });
        case 'normal_small_weak':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.small,
                speed: ENEMY_SPEED.normal,
                health: ENEMY_HEALTH.weak
            });
        case 'fast_small_weak':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.small,
                speed: ENEMY_SPEED.fast,
                health: ENEMY_HEALTH.weak
            });


        case 'slow_normal_normal':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.normal,
                speed: ENEMY_SPEED.slow,
                health: ENEMY_HEALTH.normal
            });
        case 'normal_normal_normal':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.normal,
                speed: ENEMY_SPEED.normal,
                health: ENEMY_HEALTH.normal
            });
        case 'fast_normal_normal':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.normal,
                speed: ENEMY_SPEED.fast,
                health: ENEMY_HEALTH.normal
            });



        case 'slow_normal_strong':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.normal,
                speed: ENEMY_SPEED.slow,
                health: ENEMY_HEALTH.normal
            });
        case 'normal_normal_strong':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.normal,
                speed: ENEMY_SPEED.normal,
                health: ENEMY_HEALTH.normal
            });
        case 'fast_normal_strong':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.normal,
                speed: ENEMY_SPEED.fast,
                health: ENEMY_HEALTH.normal
            });
        default:
            return null;
    }
};