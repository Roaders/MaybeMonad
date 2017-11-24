
import { Maybe, IMaybe } from "./maybe";
import { maybeBoolean, maybeParseDate, maybeParseFloat, maybeString } from "./maybeHelpers";
import { maybeNumber, maybeDate } from "../index";

export type MaybeProps<T> = {
    [P in keyof T]: IMaybe<T[P]>;
}

export type MaybePropFactory<T> = {
    [P in keyof T]: ((value: T[P]) => IMaybe<T[P]>) | T[P];
}

export function objectToMaybeProps<T>(input: T, maybeFactories: MaybePropFactory<T>): MaybeProps<T> {
    const result: any = {};

    for (let propName in maybeFactories) {
        const factoryValue = maybeFactories[propName];
        const inputValue = input[propName];

        switch (typeof maybeFactories[propName]) {
            case "string":
                result[propName] = maybeString(inputValue);
                break;

            case "number":
                result[propName] = maybeNumber(inputValue);
                break;

            case "boolean":
                result[propName] = maybeBoolean(inputValue);
                break;

            case "function":
                const factoryFunction = factoryValue as (value: any) => Maybe<any>;
                result[propName] = factoryFunction(inputValue);
                break;

            default:
                if(factoryValue instanceof Date){
                    result[propName] = maybeDate(inputValue);
                } else {
                    result[propName] = Maybe.nullToMaybe(inputValue);
                }
        }
    }

    return result;
}