
import { maybeBoolean, maybeNumber, maybeString } from "../index";

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
});