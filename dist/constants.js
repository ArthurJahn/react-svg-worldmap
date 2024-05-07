"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultTooltip = exports.defaultCountryStyle = exports.sizeMap = exports.heightRatio = exports.defaultColor = exports.defaultSize = void 0;
exports.defaultSize = "xl";
exports.defaultColor = "#dddddd";
exports.heightRatio = 3 / 4;
exports.sizeMap = {
    sm: 240,
    md: 336,
    lg: 480,
    xl: 640,
    xxl: 1200,
};
const defaultCountryStyle = (stroke, strokeOpacity) => (context) => {
    const { countryValue, minValue, maxValue, color } = context;
    const calculatedValue = typeof countryValue === "string"
        ? minValue
        : // TODO bug in TS-ESLint; report this
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
            countryValue;
    let opacityLevel = calculatedValue !== undefined
        ? 0.2 + 0.8 * ((calculatedValue - minValue) / (maxValue - minValue))
        : 0;
    // If there's only one value, the calculation would be dividing by zero.
    // We adjust it to the maximum value.
    if (Number.isNaN(opacityLevel))
        opacityLevel = 1;
    const style = {
        fill: color,
        fillOpacity: opacityLevel,
        stroke,
        strokeWidth: 1,
        strokeOpacity,
        cursor: "pointer",
    };
    return style;
};
exports.defaultCountryStyle = defaultCountryStyle;
const defaultTooltip = (context) => {
    const { countryName, countryValue, prefix, suffix } = context;
    return `${countryName} ${prefix} ${countryValue.toLocaleString()} ${suffix}`;
};
exports.defaultTooltip = defaultTooltip;
//# sourceMappingURL=constants.js.map