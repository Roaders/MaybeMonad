
import { maybeBoolean, maybeNumber, maybeString, maybeDate, maybeParseFloat, maybeParseDate, maybeParseBoolean } from "../index";

describe("Maybe Helper", () => {

    describe("maybeString", () => {

        it("should return a value maybe when a string is passed as a value", () => {
            expect(maybeString("hello").isNothing).toBeFalsy();
            expect(maybeString("hello").value).toBe("hello");
        });

        it("should return a nothing maybe when a number is passed as a value", () => {
            expect(maybeString(123).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a boolean is passed as a value", () => {
            expect(maybeString(true).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeString({}).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeString(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeString(undefined).isNothing).toBeTruthy();
        });
    });

    describe("maybeNumber", () => {

        it("should return a nothing maybe when a string is passed as a value", () => {
            expect(maybeNumber("hello").isNothing).toBeTruthy();
        });

        it("should return a value maybe when a number is passed as a value", () => {
            expect(maybeNumber(123).isNothing).toBeFalsy();
            expect(maybeNumber(123).value).toBe(123);
        });

        it("should return a nothing maybe when NaN is passed as a value", () => {
            expect(maybeNumber(NaN).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a boolean is passed as a value", () => {
            expect(maybeNumber(true).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeNumber({}).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeNumber(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeNumber(undefined).isNothing).toBeTruthy();
        });
    });

    describe("maybeParseFloat", () => {

        it("should return a nothing maybe when a non-valid string is passed as a value", () => {
            expect(maybeParseFloat("hello").isNothing).toBeTruthy();
        });

        it("should return a value maybe when a number is passed as a value", () => {
            expect(maybeParseFloat(123).isNothing).toBeFalsy();
            expect(maybeParseFloat(123).value).toBe(123);
        });

        it("should return a value maybe when a valid string is passed as a value", () => {
            expect(maybeParseFloat("123.45").isNothing).toBeFalsy();
            expect(maybeParseFloat("123.45").value).toBe(123.45);
        });

        it("should return a nothing maybe when NaN is passed as a value", () => {
            expect(maybeParseFloat(NaN).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a boolean is passed as a value", () => {
            expect(maybeParseFloat(true).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeParseFloat({}).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeParseFloat(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeParseFloat(undefined).isNothing).toBeTruthy();
        });
    });

    describe("maybeBoolean", () => {

        it("should return a nothing maybe when a string is passed as a value", () => {
            expect(maybeBoolean("hello").isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a number is passed as a value", () => {
            expect(maybeBoolean(123).isNothing).toBeTruthy();
        });

        it("should return a value maybe when a boolean is passed as a value", () => {
            expect(maybeBoolean(true).isNothing).toBeFalsy();
            expect(maybeBoolean(true).value).toEqual(true);
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeBoolean({}).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeBoolean(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeBoolean(undefined).isNothing).toBeTruthy();
        });
    });


    describe("maybeParseBoolean", () => {

        it("should return a nothing maybe when a string is passed as a value", () => {
            expect(maybeParseBoolean("hello").isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a number is passed as a value", () => {
            expect(maybeParseBoolean(123).isNothing).toBeTruthy();
        });

        it("should return a value maybe when a boolean is passed as a value", () => {
            expect(maybeParseBoolean(true).isNothing).toBeFalsy();
            expect(maybeParseBoolean(true).value).toEqual(true);
        });

        it("should return a value maybe when 'true' is passed as a value", () => {
            expect(maybeParseBoolean('true').isNothing).toBeFalsy();
            expect(maybeParseBoolean('true').value).toEqual(true);
        });

        it("should return a value maybe when 'false' is passed as a value", () => {
            expect(maybeParseBoolean('false').isNothing).toBeFalsy();
            expect(maybeParseBoolean('false').value).toEqual(false);
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeParseBoolean({}).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeParseBoolean(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeParseBoolean(undefined).isNothing).toBeTruthy();
        });
    });

    describe("maybeDate", () => {

        it("should return a nothing maybe when a string is passed as a value", () => {
            expect(maybeDate("hello").isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a number is passed as a value", () => {
            expect(maybeDate(123).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a boolean is passed as a value", () => {
            expect(maybeDate(true).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeDate({}).isNothing).toBeTruthy();
        });

        it("should return a value maybe when an valid date is passed as a value", () => {
            const date = new Date();
            expect(maybeDate(date).isNothing).toBeFalsy();
            expect(maybeDate(date).value.getTime()).toBe(date.getTime());
        });

        it("should return a nothing maybe when an invalid date is passed as a value", () => {
            expect(maybeDate(new Date(Date.parse("this is not a date"))).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeDate(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeDate(undefined).isNothing).toBeTruthy();
        });
    });

    describe("maybeParseDate", () => {

        it("should return a nothing maybe when a string is passed as a value", () => {
            expect(maybeParseDate("hello").isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a number is passed as a value", () => {
            expect(maybeParseDate(123).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when a boolean is passed as a value", () => {
            expect(maybeParseDate(true).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when an object is passed as a value", () => {
            expect(maybeParseDate({}).isNothing).toBeTruthy();
        });

        it("should return a value maybe when an valid date is passed as a value", () => {
            const date = new Date();
            expect(maybeParseDate(date).isNothing).toBeFalsy();
            expect(maybeParseDate(date).value.getTime()).toBe(date.getTime());
        });

        it("should return a value maybe when an valid string is passed as a value", () => {
            expect(maybeParseDate("Dec 25, 1995").isNothing).toBeFalsy();
            expect(maybeParseDate("Dec 25, 1995").value.getTime()).not.toBeNaN();
        });

        it("should return a nothing maybe when an invalid date is passed as a value", () => {
            expect(maybeParseDate(new Date(Date.parse("this is not a date"))).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when null is passed as a value", () => {
            expect(maybeParseDate(null).isNothing).toBeTruthy();
        });

        it("should return a nothing maybe when undefined is passed as a value", () => {
            expect(maybeParseDate(undefined).isNothing).toBeTruthy();
        });
    });
});