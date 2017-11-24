
import { IMaybe, Maybe, nullOrUndefined } from "./maybe";

export function isString(value: any): value is string {
    return typeof value === "string";
}

export function isNumber(value: any): value is number {
    return typeof value === "number" && !isNaN(value);
}

export function isBoolean(value: any): value is boolean {
    return typeof value === "boolean";
}

export function isDate(value: any): value is Date {
    return value instanceof Date && !isNaN((<Date>value).getTime());
}

export function maybeString(value: any): IMaybe<string> {
    return Maybe.nullToMaybe(value)
        .filterType(isString);
}

export function maybeNumber(value: any): IMaybe<number> {
    return Maybe.nullToMaybe(value)
        .filterType(isNumber);
}

export function maybeParseFloat(value: any): IMaybe<number> {
    return maybeNumber(value)
        .or(maybeString(value).map(s => parseFloat(s)))
        .filter(n => !isNaN(n));
}

export function maybeDate(value: any): IMaybe<Date> {
    return Maybe.nullToMaybe(value)
        .filterType(isDate);
}

export function maybeParseDate(value: any): IMaybe<Date> {
    return maybeDate(value)
        .or(maybeString(value).map(s => new Date(Date.parse(s))))
        .filter(d => !isNaN(d.getTime()));
}

export function maybeBoolean(value: any): IMaybe<boolean> {
    return Maybe.nullToMaybe(value)
        .filterType(isBoolean);
}

export function maybeParseBoolean(value: any): IMaybe<boolean> {
    return maybeBoolean(value)
        .or(maybeString(value)
            .filter(v => v === "true" || v === "false")
            .map(v => v === "true"));
}