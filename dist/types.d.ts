import type React from "react";
declare const isoCodes: ("FJ" | "TZ" | "EH" | "CA" | "US" | "KZ" | "UZ" | "PG" | "ID" | "AR" | "CL" | "CD" | "SO" | "KE" | "SD" | "TD" | "HT" | "DO" | "RU" | "BS" | "FK" | "NO" | "GL" | "TL" | "ZA" | "LS" | "MX" | "UY" | "BR" | "BO" | "PE" | "CO" | "PA" | "CR" | "NI" | "HN" | "SV" | "GT" | "BZ" | "VE" | "GY" | "SR" | "FR" | "EC" | "PR" | "JM" | "CU" | "ZW" | "BW" | "NA" | "SN" | "ML" | "MR" | "BJ" | "NE" | "NG" | "CM" | "TG" | "GH" | "CI" | "GN" | "GW" | "LR" | "SL" | "BF" | "CF" | "CG" | "GA" | "GQ" | "ZM" | "MW" | "MZ" | "SZ" | "AO" | "BI" | "IL" | "LB" | "MG" | "PS" | "GM" | "TN" | "DZ" | "JO" | "AE" | "QA" | "KW" | "IQ" | "OM" | "VU" | "KH" | "TH" | "LA" | "MM" | "VN" | "KP" | "KR" | "MN" | "IN" | "BD" | "BT" | "NP" | "PK" | "AF" | "TJ" | "KG" | "TM" | "IR" | "SY" | "AM" | "SE" | "BY" | "UA" | "PL" | "AT" | "HU" | "MD" | "RO" | "LT" | "LV" | "EE" | "DE" | "BG" | "GR" | "TR" | "AL" | "HR" | "CH" | "LU" | "BE" | "NL" | "PT" | "ES" | "IE" | "NC" | "SB" | "NZ" | "AU" | "LK" | "CN" | "TW" | "IT" | "DK" | "GB" | "IS" | "AZ" | "GE" | "PH" | "MY" | "BN" | "SI" | "FI" | "SK" | "CZ" | "ER" | "JP" | "PY" | "YE" | "SA" | "CYP" | "CY" | "MA" | "EG" | "LY" | "ET" | "DJ" | "SOM" | "UG" | "RW" | "BA" | "MK" | "RS" | "ME" | "XK" | "TT" | "SS")[];
export type ISOCode = (typeof isoCodes)[number] | Lowercase<(typeof isoCodes)[number]>;
export type SizeOption = "sm" | "md" | "lg" | "xl" | "xxl";
export interface DataItem<T extends string | number = number> {
    country: ISOCode;
    value: T;
}
export type Data<T extends string | number = number> = DataItem<T>[];
export interface CountryContext<T extends string | number = number> {
    countryCode: ISOCode;
    countryName: string;
    countryValue?: T | undefined;
    color: string;
    minValue: number;
    maxValue: number;
    prefix: string;
    suffix: string;
}
export interface Props<T extends string | number = number> {
    data: DataItem<T>[];
    title?: string;
    valuePrefix?: string;
    valueSuffix?: string;
    color?: string;
    hoverColor?: string;
    strokeOpacity?: number;
    backgroundColor?: string;
    tooltipBgColor?: string;
    tooltipTextColor?: string;
    rtl?: boolean;
    size?: SizeOption | "responsive" | number;
    frame?: boolean;
    frameColor?: string;
    borderColor?: string;
    richInteraction?: boolean;
    /** @deprecated */
    type?: string;
    styleFunction?: (context: CountryContext<T>) => React.CSSProperties;
    onClickFunction?: (context: CountryContext<T> & {
        event: React.MouseEvent<SVGElement, Event>;
    }) => void;
    tooltipTextFunction?: (context: CountryContext<T>) => string;
    hrefFunction?: (context: CountryContext<T>) => React.ComponentProps<"a"> | string | undefined;
    textLabelFunction?: (width: number) => ({
        label: string;
    } & React.ComponentProps<"text">)[];
}
export {};
//# sourceMappingURL=types.d.ts.map