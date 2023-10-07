/**
 * Creates an array of arrays containing a gradient at a given angle.
 * @param valueFrom
 * @param valueTo
 * @param width
 * @param height
 * @param angle
 * @returns {any[][]}
 */
const createGradientMatrix = (valueFrom, valueTo, width, height, angle) => {
    let grid = Array(height)
        .fill()
        .map(
            () => Array(width).fill(null)
        )

    // ...

    const normalizedValueTo = valueTo - valueFrom
}


/**
* Determines the a of `y = mx + a`
* @param x
* @param y
* @param m
* @returns {number}
*/
const getYOffset = (x, y, m) => y - m * x


const createGradientMatrix = (valueFrom, valueTo, width, height, angle) => {
    // ...
    // Some trigonometry to figure out the slope from an angle.
    let m = 1 / Math.tan(angle * Math.PI / 180)
    if (Math.abs(m) === Infinity) {
      m = Number.MAX_SAFE_INTEGER
    }
  
    const minYOffset = getYOffset(width - 1, 0, m)
    const maxYOffset = getYOffset(0, height - 1, m)
    const normalizedMaxYOffset = maxYOffset - minYOffset
  
    // ...
  }