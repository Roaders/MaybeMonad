
import { objectToMaybeProps, MaybePropFactory, Maybe, IMaybe, maybeParseFloat, maybeParseDate, maybeParseBoolean } from "../index"

describe("MaybeProps", () => {

    interface IMyInterface {
        name: string;
        id: number;
    }

    interface ISampleObjectType {
        sampleString: string,
        sampleNumber: number,
        sampleBoolean: boolean,
        sampleObject: IMyInterface
    }

    const populatedObject: ISampleObjectType = {
        sampleString: "hello",
        sampleNumber: 123,
        sampleBoolean: true,
        sampleObject: { id: 0, name: "John" }
    }

    const maybePropFactory: MaybePropFactory<ISampleObjectType> = {
        sampleString: "",
        sampleNumber: 0,
        sampleBoolean: true,
        sampleObject: { name: "", id: 0 }
    };

    it("should convert every property on a populated object into a value maybe", () => {

        const props = objectToMaybeProps(populatedObject, maybePropFactory);

        for (let propName in populatedObject) {
            validateValueMaybe((<any>props)[propName], (<any>populatedObject)[propName]);
        }
    });

    it("should convert every property on an empty object into a nothing maybe", () => {

        const props = objectToMaybeProps({}, maybePropFactory);

        for (let propName in populatedObject) {
            validateNothingMaybe((<any>props)[propName]);
        }
    });

    describe("strings", () => {
        const nonStringValues = [123, true, new Date(), {}];

        type objectWithString = {
            myString: string
        }

        nonStringValues.forEach(nonString => {
            it(`should return a nothing maybe if '${nonString}' is passed as a string value`, () => {
                const props = objectToMaybeProps<objectWithString>(<any>{ myString: nonString }, { myString: "" });
                validateNothingMaybe(props.myString);
            });
        });
    });

    describe("numbers", () => {
        const nonNumbersValues = ["someString", true, new Date(), {}];

        type objectWithNumbers = {
            myNumber: number
        }

        nonNumbersValues.forEach(nonNumber => {
            it(`should return a nothing maybe if '${nonNumber}' is passed as a number value`, () => {
                const props = objectToMaybeProps<objectWithNumbers>(<any>{ myNumber: nonNumber }, { myNumber: 123 });
                validateNothingMaybe(props.myNumber);
            });
        });

        it("should convert a string to a number if maybeParseFloat is passed in factory", () => {
            const props = objectToMaybeProps<objectWithNumbers>(<any>{ myNumber: "123.45" }, { myNumber: maybeParseFloat });
            validateValueMaybe(props.myNumber, 123.45);
        });
    });

    describe("boolean", () => {
        const nonBooleanValues = ["someString", 123, new Date(), {}];

        type objectWithBoolean = {
            myBoolean: boolean
        }

        nonBooleanValues.forEach(nonBoolean => {
            it(`should return a nothing maybe if '${nonBoolean}' is passed as a boolean value`, () => {
                const props = objectToMaybeProps<objectWithBoolean>(<any>{ myBoolean: nonBoolean }, { myBoolean: true });
                validateNothingMaybe(props.myBoolean);
            });
        });

        it("should convert 'false' to a boolean if maybeParseBoolean is passed in factory", () => {
            const props = objectToMaybeProps<objectWithBoolean>(<any>{ myBoolean: "false" }, { myBoolean: maybeParseBoolean });
            validateValueMaybe(props.myBoolean, false);
        });

        it("should convert 'true' to a boolean if maybeParseBoolean is passed in factory", () => {
            const props = objectToMaybeProps<objectWithBoolean>(<any>{ myBoolean: "true" }, { myBoolean: maybeParseBoolean });
            validateValueMaybe(props.myBoolean, true);
        });
    });

    describe("date", () => {
        const nonNDateValues = ["someString", 123, true, {}];

        type objectWithDate = {
            myDate: Date
        }

        nonNDateValues.forEach(nonDate => {
            it(`should return a nothing maybe if '${nonDate}' is passed as a date value`, () => {
                const props = objectToMaybeProps<objectWithDate>(<any>{ myDate: nonDate }, { myDate: new Date() });
                validateNothingMaybe(props.myDate);
            });
        });

        it("should convert a string to a date if maybeParseDate is passed in factory", () => {
            const props = objectToMaybeProps<objectWithDate>(<any>{ myDate: "Dec 25, 1995" }, { myDate: maybeParseDate });
            expect(props.myDate.hasValue).toBeTruthy();
            expect(props.myDate.value.getTime()).not.toBeNaN();
        });
    });

    function validateValueMaybe(maybe: IMaybe<any>, expectedValue: any) {
        expect(maybe).toBeDefined("Maybe was not defined");
        expect(maybe.hasValue).toBeTruthy("Maybe was expected to have a value but did not");
        expect(maybe.value).toBe(expectedValue);

    }

    function validateNothingMaybe(maybe: IMaybe<any>) {
        expect(maybe).toBeDefined("Maybe was not defined");
        expect(maybe.isNothing).toBeTruthy("Maybe was expected to be nothing bit had a value");
    }
});