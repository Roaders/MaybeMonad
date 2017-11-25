

export enum MaybeType {
    "Just",
    "Nothing"
}

export type nullOrUndefined = null | undefined;

export class Maybe<T>{

    private static _guard: any = {};

    //  Constructor

    constructor(private _type: MaybeType, private _value: T | undefined, guard: any){
        if(guard !== Maybe._guard){
            throw new Error("Direct contruction of Maybe not possible. Please use Maybe.just, Maybe.nothing or Maybe.nullToMaybe instead.");
        }
    }

    //  Static Methods

    /**
     * Creates a Maybe of the given value.
     * Values of null and undefined are permitted.
     * Example: var maybe = Maybe.justAllowNull(null);
     * @param value 
     */
    public static justAllowNull<T>(value: T): Maybe<T>{
        return new Maybe<T>(MaybeType.Just, value, Maybe._guard);
    }

    /**
     * Creates a Nothing Maybe of the given type
     * Example: var maybe = Maybe.nothing<string>();
     */
    public static nothing<T>(): Maybe<T>{
        return new Maybe<T>(MaybeType.Nothing, undefined, Maybe._guard);
    }

    /**
     * Creates a Maybe with the passed value.
     * If the passed value is null or undefined a Maybe of type Nothing is created.
     * Example: var maybe = Maybe.nullToMaybe("Hello maybe world");
     * @param value 
     */
    public static nullToMaybe<T>(value: T | nullOrUndefined): Maybe<T>{
        if(value == null){
            return Maybe.nothing<T>();
        }
        return new Maybe<T>(MaybeType.Just, value, Maybe._guard);
    }

    /**
     * Creates a Maybe of the given value if the test is true.
     * If the test is true and null or undefined are passed a Nothing Maybe will be creted
     * If the test is false a Nothing Maybe will be created.
     * Example: var maybe = Maybe.if(someBooleanFunction(),"Function returns true");
     * @param test 
     * @param value 
     */
    public static if<T>(test: boolean, value: T | nullOrUndefined): Maybe<T>{
        if(!test){
            return Maybe.nothing<T>();
        }
        return Maybe.nullToMaybe(value);
    } 

    //  Properties

    /**
     * Returns the value of the Maybe.
     * This will throw an error if called on a Nothing Maybe
     * It is recommended to use defaultTo instead so that a default value can be provided for the Nothing case
     */
    public get value(): T{
        if(this.isNothing){
            throw new Error("Unable to access value of a nothing Maybe. Use defaultTo instead.");
        }
        return this._value!;
    }

    /**
     * indicates if this is a Nothing Maybe
     */
    public get isNothing(): boolean{
        return this._type === MaybeType.Nothing;
    }
    
    /**
     * indicates if this is a Value Maybe
     */
    public get hasValue(): boolean{
        return this._type === MaybeType.Just;
    }

    //  Public Methods

    /**
     * maps a maybe to another value
     * if the selector function returns null a Nothing Maybe is returned
     * Example: Maybe.nullToMaybe("Hello").map(value => value.length);
     * @param selector 
     */
    public map<TOut>(selector: (value: T) => TOut | nullOrUndefined): Maybe<TOut>{
        if(this.isNothing){
            return Maybe.nothing<TOut>();
        }
        return Maybe.nullToMaybe(selector(this._value!));
    }

    /**
     * maps a maybe to another value
     * null and undefined values may be returned from the selector function
     * Example: Maybe.nullToMaybe("Hello").mapAllowNull(value => null);
     * @param selector 
     */
    public mapAllowNull<TOut>(selector: (value: T) => TOut): Maybe<TOut>{
        if(this.isNothing){
            return Maybe.nothing<TOut>();
        }
        return Maybe.justAllowNull(selector(this._value!));
    }

    /**
     * executes a function if the maybe is valid.
     * The function is not executed if the Maybe is Nothing.
     * Example: Maybe.nullToMaybe("Hello world").do(message => console.log(message));
     * @param action 
     */
    public do(action: (value: T) => void): Maybe<T>{
        if(!this.isNothing){
            action(this._value!);
        }

        return this;
    }

    /**
     * executes a function if the maybe is nothing.
     * The function is not executed if the Maybe is valid
     * Example: Maybe.nullToMaybe(null).elseDo(() => console.log("no message found"));
     * @param action 
     */
    public elseDo(action: () => void ): Maybe<T>{
        if(this.isNothing){
            action();
        }

        return this;
    }

    /**
     * Transforms the maybe from a Nothing maybe to a valid maybe with the supplied value
     * Has no effect if the Maybe is valid
     * If value is null or undefined returns a nothing maybe
     * Example: Maybe.nothing<string>().orElse("GoodBye"); (returns maybe with value of 'Goodbye')
     * @param value 
     */
    public orElse(value: T | nullOrUndefined): Maybe<T>{
        if(this.isNothing){
            return Maybe.nullToMaybe(value);
        }

        return this;
    }

    /**
     * Transforms the maybe from a Nothing maybe to a valid maybe with the supplied value
     * Has no effect if the Maybe is valid
     * Null or undefined values are permitted
     * Example: Maybe.nothing<string>().orElse(null); (returns maybe with null value)
     * @param value 
     */
    public orElseAllowNull(value: T): Maybe<T>{
        if(this.isNothing){
            return Maybe.justAllowNull(value);
        }

        return this;
    }

    /**
     * Retuns a new Maybe if initial maybe and selector Maybe are valid.
     * If either Maybe is nothing a nothing Maybe is returned
     * Example: Maybe.nullToMaybe(thing.parameterOne).and(paramOneValue => Maybe.nullToMaybe(thing.parameterTwo)) (return maybe with value of arameterTwo)
     * @param selector 
     */
    public and<TOut>(selector: (value: T) => Maybe<TOut>): Maybe<TOut>{
        if(this.isNothing){
            return Maybe.nothing<TOut>();
        }

        return selector(this._value!);
    }
    
    /**
     * If maybe is nothing return the other maybe;
     * Example: Maybe.nothing<string>().or(Maybe.nullToMaybe("here I am")) (return maybe with value "here I am");
     * @param other 
     */
    public or(other: Maybe<T>): Maybe<T>{
        if(this.isNothing){
            return other;
        }

        return this;
    }

    /**
     * Returns the value of a maybe whilst safely providing a default value to be used in case the Maybe is nothing.
     * Example: Maybe.nothing<string>().defaultTo("I am the default") (return a string of value "I am the default!")
     * @param defaultValue 
     */
    public defaultTo<TDefault>(defaultValue: TDefault): T | TDefault{
        if(this.isNothing){
            return defaultValue;
        }

        return this._value!;
    }

    /**
     * turns the Maybe into a nothing maybe if the function evaluates to false
     * Example: Maybe.nullToMaybe("").filter(value => value != "")
     * @param predicate 
     */
    public filter(predicate: (value: T) => boolean): Maybe<T>{

        return this.and(v => predicate(v) ? this : Maybe.nothing<T>());
    }


    /**
     * turns the maybe into a nothing maybe if the value is not of the specified type
     * also changes the type of the maybe
     * for example this could turn Maybe<string | number> into Maybe<string>
     * 
     * Maybe.just(stringOrNumber).filterType(<(value) => value is string>(value => typeof value === 'string'))
     * 
     * @param predicate
     */
    filterType<TOut>(predicate: (value: any) => value is TOut): Maybe<TOut> {
        return this.and(v => predicate(v) ? Maybe.justAllowNull(v) : Maybe.nothing<TOut>());
    }

    /**
     * Combines multiple Maybes into one Maybe with a value of an array of all the maybe values
     * If any maybe is nothing a Nothing Maybe will be returned
     * Example: Maybe.nullToMaybe("Hello").combine(Maybe.nullToMaybe("World")).do(array => console.log(array[0] + " " + array[1])) (logs "Hello World")
     * @param maybes 
     */
    public combine(... maybes: Maybe<any>[]): Maybe<any>{
        if(this.isNothing || maybes.some(v => v.isNothing)){
            return Maybe.nothing<any>();
        }

        maybes.unshift(this);

        return Maybe.nullToMaybe(maybes.map(m => m.value));
    }

    /**
     * Throws an error if the maybe isNothing
     * 
     * @param message error message to throw if isNothing is true
     */
    public throwIfNothing(message: string){
        if(this.isNothing){
            throw new Error(message);
        }
    }

    /**
     * Throws an error with the specified message if this maybe is nothing
     * If there is a value it is returned.
     * 
     * @param message error message to throw if isNothing is true
     */
    public throwIfNothingValue(message: string): T{
        this.throwIfNothing(message);

        return this._value!;
    }
}