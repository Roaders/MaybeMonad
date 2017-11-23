

export function objectToMaybeProps<T>(input: T, maybeFactories:{[p in keyof T]: ((value: T[p]) => Maybe<T[p]>) | null}): MaybeProps<T>{
            return {} as MaybeProps<T>;
        }
