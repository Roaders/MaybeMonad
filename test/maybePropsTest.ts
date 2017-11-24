
import { objectToMaybeProps, MaybePropFactory, Maybe } from "../index"

describe("MaybeProps", () => {

    interface IMyInterface {
        name: string;
        id: number;
    }

    type sampleObjectType = {
        sampleString: string,
        sampleNumber: number,
        sampleBoolean: boolean,
        sampleObject: IMyInterface
    }

    const populatedObject: sampleObjectType = {
        sampleString: "hello",
        sampleNumber: 123,
        sampleBoolean: true,
        sampleObject: { id: 0, name: "John" }
    }

    const maybePropFactory: MaybePropFactory<sampleObjectType> = {
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

    it("should return nothing maybes if the wrong type was used for a property", () => {

    });

    function validateValueMaybe(maybe: Maybe<any>, expectedValue: any) {
        expect(maybe).toBeDefined("Maybe was not defined");
        expect(maybe.hasValue).toBeTruthy("Maybe was expected to have a value but did not");
        expect(maybe.value).toBe(expectedValue);

    }

    function validateNothingMaybe(maybe: Maybe<any>) {
        expect(maybe).toBeDefined("Maybe was not defined");
        expect(maybe.isNothing).toBeTruthy("Maybe was expected to be nothing bit had a value");
    }
});