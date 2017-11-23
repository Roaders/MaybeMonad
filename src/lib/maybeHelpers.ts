
import { IMaybe, Maybe, nullOrUndefined } from "./maybe";

export function maybeString(value: any): IMaybe<string> {
    return Maybe.nullToMaybe<string>(value)
        .filter(value => typeof value === "string");
}

export function maybeNumber(value: any): IMaybe<number> {
    return Maybe.nullToMaybe<number>(value)
        .filter(value => typeof value === "number");
}

export function maybeBoolean(value: any): IMaybe<boolean> {
    return Maybe.nullToMaybe<boolean>(value)
        .filter(value => typeof value === "boolean");
}