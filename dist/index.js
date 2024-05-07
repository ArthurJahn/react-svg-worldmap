"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regions = exports.WorldMap = void 0;
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
const react_1 = require("react");
const d3_geo_1 = require("d3-geo");
const countries_geo_js_1 = tslib_1.__importDefault(require("./countries.geo.js"));
const constants_js_1 = require("./constants.js");
const utils_js_1 = require("./utils.js");
const draw_js_1 = require("./draw.js");
const Frame_js_1 = tslib_1.__importDefault(require("./components/Frame.js"));
const Region_js_1 = tslib_1.__importDefault(require("./components/Region.js"));
const TextLabel_js_1 = tslib_1.__importDefault(require("./components/TextLabel.js"));
function toValue({ value }) {
    return typeof value === "string" ? 0 : value;
}
function WorldMap(props) {
    const { data, title, valuePrefix = "", valueSuffix = "", color = constants_js_1.defaultColor, hovercolor = constants_js_1.defaultColor, strokeOpacity = 0.2, backgroundColor = "white", tooltipBgColor = "black", tooltipTextColor = "white", rtl = false, size = constants_js_1.defaultSize, frame = false, frameColor = "black", borderColor = "black", richInteraction = false, styleFunction = (0, constants_js_1.defaultCountryStyle)(borderColor, strokeOpacity), tooltipTextFunction = constants_js_1.defaultTooltip, onClickFunction, hrefFunction, textLabelFunction = () => [], } = props;
    const windowWidth = (0, utils_js_1.useWindowWidth)();
    // Inits
    const width = typeof size === "number" ? size : (0, utils_js_1.responsify)(size, windowWidth);
    const height = width * constants_js_1.heightRatio;
    const [scale, setScale] = (0, react_1.useState)(1);
    const [translateX, setTranslateX] = (0, react_1.useState)(0);
    const [translateY, setTranslateY] = (0, react_1.useState)(0);
    const containerRef = (0, react_1.createRef)();
    // Calc min/max values and build country map for direct access
    const countryValueMap = Object.fromEntries(data.map(({ country, value }) => [country.toUpperCase(), value]));
    const minValue = Math.min(...data.map(toValue));
    const maxValue = Math.max(...data.map(toValue));
    // Build a path & a tooltip for each country
    const projection = (0, d3_geo_1.geoMercator)();
    const pathGenerator = (0, d3_geo_1.geoPath)().projection(projection);
    const onClick = React.useCallback((context) => (event) => onClickFunction?.({ ...context, event }), [onClickFunction]);
    const regions = countries_geo_js_1.default.features.map((feature) => {
        const triggerRef = (0, react_1.createRef)();
        const { I: isoCode, N: countryName, C: coordinates } = feature;
        const geoFeature = {
            type: "Feature",
            properties: { NAME: countryName, ISO_A2: isoCode },
            geometry: {
                type: "MultiPolygon",
                coordinates: coordinates,
            },
        };
        const context = {
            countryCode: isoCode,
            countryValue: countryValueMap[isoCode],
            countryName,
            color,
            minValue,
            maxValue,
            prefix: valuePrefix,
            suffix: valueSuffix,
        };
        const path = (React.createElement(Region_js_1.default, { ref: triggerRef, d: pathGenerator(geoFeature), style: styleFunction(context), onClick: onClick(context), strokeOpacity: strokeOpacity, hovercolor: hovercolor, href: hrefFunction?.(context), key: countryName }));
        const tooltip = (0, draw_js_1.drawTooltip)(typeof context.countryValue === "undefined"
            ? undefined
            : tooltipTextFunction(context), tooltipBgColor, tooltipTextColor, rtl, triggerRef, containerRef);
        return { path, highlightedTooltip: tooltip };
    });
    // Build paths
    const regionPaths = regions.map((entry) => entry.path);
    // Build tooltips
    const regionTooltips = regions.map((entry) => entry.highlightedTooltip);
    const eventHandlers = {
        onMouseDown(e) {
            e.preventDefault();
            e.stopPropagation();
        },
        onDoubleClick(e) {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            if (scale === 4) {
                setTranslateX(0);
                setTranslateY(0);
                setScale(1);
            }
            else {
                setTranslateX(2 * translateX - x);
                setTranslateY(2 * translateY - y);
                setScale(scale * 2);
            }
        },
    };
    // Render the SVG
    return (React.createElement("figure", { className: "worldmap__figure-container", style: { backgroundColor } },
        title && (React.createElement("figcaption", { className: "worldmap__figure-caption" }, title)),
        React.createElement("svg", { ref: containerRef, height: `${height}px`, width: `${width}px`, ...(richInteraction ? eventHandlers : undefined) },
            frame && React.createElement(Frame_js_1.default, { color: frameColor }),
            React.createElement("g", { transform: `translate(${translateX}, ${translateY}) scale(${(width / 960) * scale}) translate(0, 240)`, style: { transition: "all 0.2s" } }, regionPaths),
            React.createElement("g", null, textLabelFunction(width).map((labelProps) => (React.createElement(TextLabel_js_1.default, { ...labelProps, key: labelProps.label })))),
            regionTooltips)));
}
exports.default = WorldMap;
exports.WorldMap = WorldMap;
const regions = countries_geo_js_1.default.features.map((g) => ({ name: g.N, code: g.I }));
exports.regions = regions;
//# sourceMappingURL=index.js.map