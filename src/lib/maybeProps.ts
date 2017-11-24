
import { Maybe, IMaybe } from "./maybe"

export type MaybeProps<T> = {
    [P in keyof T]: IMaybe<T[P]>;
}

export type MaybePropFactory<T> = {
    [P in keyof T]: ((value: T[P]) => IMaybe<T[P]>) | T[P];
}

export function objectToMaybeProps<T>(input: T, maybeFactories: MaybePropFactory<T>): MaybeProps<T> {
    const result = {} as MaybeProps<T>;

    console.log(`Maybe props for ${JSON.stringify(input)}`);

    for(let propName in maybeFactories){
        console.log(`creating maybe for ${input[propName]}`);

        result[propName] = Maybe.nullToMaybe(input[propName]);
    }

    console.log(`output ${JSON.stringify(result)}`);

    return result;
}