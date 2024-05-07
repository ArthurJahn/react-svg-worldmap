import * as React from "react";
import type { ComponentProps, ForwardedRef } from "react";

export interface Props extends Omit<ComponentProps<"path">, "href"> {
  strokeOpacity: string | number;
  hoverColor: string;
  href?: ComponentProps<"a"> | string | undefined;
}

function onMouseOver(strokeOpacity: number, hoverColor: string) {
  return (event: React.MouseEvent<SVGPathElement>) => {
    const path = event.currentTarget;
    const color: string = path.dataset.color || path.style.fill;
    path.dataset.color = color;
    path.style.fill = hoverColor;
    path.style.strokeWidth = "2";
    path.style.strokeOpacity = String(Math.min(strokeOpacity + 0.3, 1));
  };
}

function onMouseOut(strokeOpacity: number) {
  return (event: React.MouseEvent<SVGPathElement>) => {
    const path = event.currentTarget;
    path.style.strokeWidth = "1";
    path.style.strokeOpacity = String(strokeOpacity);
    path.style.fill = path.dataset.color || "";
  };
}

function Region({ href, ...props }: Props, ref: ForwardedRef<SVGPathElement>) {
  const path = (
    <path
      onMouseOver={onMouseOver(Number(props.strokeOpacity), props.hoverColor)}
      onMouseOut={onMouseOut(Number(props.strokeOpacity))}
      ref={ref}
      {...props}
    />
  );

  if (href)
    return <a {...(typeof href === "string" ? { href } : href)}>{path}</a>;

  return path;
}

export default React.forwardRef(Region);
