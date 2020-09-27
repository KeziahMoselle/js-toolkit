interface MatrixTransform {
    scaleX?: number;
    scaleY?: number;
    skewX?: number;
    skewY?: number;
    translateX?: number;
    translateY?: number;
}
/**
 * Format a CSS transform matrix with the given values.
 *
 * @param  {Number} options.scaleX     The scale on the x axis.
 * @param  {Number} options.scaleY     The scale on the y axis.
 * @param  {Number} options.skewX      The skew on the x axis.
 * @param  {Number} options.skewY      The skew on the y axis.
 * @param  {Number} options.translateX The translate on the x axis.
 * @param  {Number} options.translateY The translate on the y axis.
 * @return {String}                    A formatted CSS matrix transform.
 */
export default function matrix(transform: MatrixTransform): string;
export {};
