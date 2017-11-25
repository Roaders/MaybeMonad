
import { Maybe } from "./maybe";
import { maybeBoolean, maybeParseDate, maybeParseFloat, maybeString } from "./maybeHelpers";
import { maybeNumber, maybeDate } from "../index";

export type MaybeProps<T> = {
    [P in keyof T]: Maybe<T[P]>;
}

export type MaybePropFactory<T> = {
    [P in keyof T]: ((value: T[P]) => Maybe<T[P]>) | T[P];
}

export function objectToMaybeProps<T>(input: T, maybeFactories: MaybePropFactory<T>): MaybeProps<T> {
    const result: any = {};

    for (let propName in maybeFactories) {
        const factoryValue = maybeFactories[propName];
        const inputValue = input[propName];

        switch (typeof factoryValue) {
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

    return result as MaybeProps<T>;
}

export function maybePropsToMaybeObject<T>(props: MaybeProps<T>): Maybe<T>{
    const result: T = <any>{};

    for(let propName in props){
        if(props[propName].isNothing){
            return Maybe.nothing();
        }

        result[propName] = props[propName].value;
    }

    return Maybe.justAllowNull(result);
}