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
    var props = ['health', 'shield', 'speed', 'size', 'image', 'wobble'];
    for (var i in props)
        g[props[i]] = o.hasOwnProperty (props[i])
                ? (isNaN (Number (o[props[i]]))
                ? window['ENEMY_' + props[i].toUpperCase ()][o[props[i]]]
                : Number (o[props[i]]))
                : g[props[i]];
    g.resistance = toDamage (o.resistance || g.resistance);
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
            health: ENEMY_HEALTH.normal,
            shield: ENEMY_SHIELD.no,
            speed: ENEMY_SPEED.normal,
            resistance: toDamage (0),
            size: ENEMY_SIZE.normal,
            image: ENEMY_IMAGE.normal,
            wobble: ENEMY_WOBBLE.normal
        };

    switch (name) {
        case 'test':
            return setMerge (enemy.preset (), {
                size: ENEMY_SIZE.huge
            });
        default:
            return null;
    }
};