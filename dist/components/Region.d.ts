import * as React from "react";
import type { ComponentProps } from "react";
export interface Props extends Omit<ComponentProps<"path">, "href"> {
    strokeOpacity: string | number;
    hovercolor: string;
    href?: ComponentProps<"a"> | string | undefined;
}
declare const _default: React.ForwardRefExoticComponent<Omit<Props, "ref"> & React.RefAttributes<SVGPathElement>>;
export default _default;
//# sourceMappingURL=Region.d.ts.map