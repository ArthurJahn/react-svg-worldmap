"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const React = tslib_1.__importStar(require("react"));
function onMouseOver(strokeOpacity, hoverColor) {
    return (event) => {
        const path = event.currentTarget;
        const color = path.dataset.color || path.style.fill;
        path.dataset.color = color;
        path.style.fill = hoverColor;
        path.style.strokeWidth = "2";
        path.style.strokeOpacity = String(Math.min(strokeOpacity + 0.3, 1));
    };
}
function onMouseOut(strokeOpacity) {
    return (event) => {
        const path = event.currentTarget;
        path.style.strokeWidth = "1";
        path.style.strokeOpacity = String(strokeOpacity);
        path.style.fill = path.dataset.color || "";
    };
}
function Region({ href, ...props }, ref) {
    const path = (React.createElement("path", { onMouseOver: onMouseOver(Number(props.strokeOpacity), props.hoverColor), onMouseOut: onMouseOut(Number(props.strokeOpacity)), ref: ref, ...props }));
    if (href)
        return React.createElement("a", { ...(typeof href === "string" ? { href } : href) }, path);
    return path;
}
exports.default = React.forwardRef(Region);
//# sourceMappingURL=Region.js.map