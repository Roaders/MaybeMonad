# maybe-monad

[![Greenkeeper badge](https://badges.greenkeeper.io/Roaders/maybe-monad.svg)](https://greenkeeper.io/)
[![Build Status](https://travis-ci.org/Roaders/maybe-monad.svg?branch=master)](https://travis-ci.org/Roaders/maybe-monad)
[![Known Vulnerabilities](https://snyk.io/test/github/roaders/maybe-monad/badge.svg)](https://snyk.io/test/github/roaders/maybe-monad)

A Typescript implementation of the Maybe mondad.

## Installation

`npm install --save maybe-monad`

## Usage

### Maybe

The Usual use case of the Maybe monad is to make it easier to deal with possibly null or undefined values.
A Maybe may have a value or it may not have a value. further processing can take place based on this.

For example:

```
var someObjectFromAService;

const name: string = Maybe.nullToMaybe(someObjectFromAService)
    .map(object => object.name)
    .filter(name => name != '')
    .do(name => console.log('The name is ' + name))
    .elseDo(() => console.log(`There was no name defined`))
    .defaultTo(`Default Name`);
```
This is a simple example. If at any point the value is null then no more processing will occur (until we get to `defaultTo`).

You can use Maybe to deal with logic that does involve `null`. Use the relevant `allowNull` operators such as `mapAllowNull`.

Maybes can be very powerful when combined together using the `and`, `or` and `combine` operators.

### MaybeProps

MaybeProps can be used to deal with an entire object that has been removed from a service for example.

If we have these type:

```
interface IMyInterface {
    name: string;
    id: number;
}

interface ISampleObjectType {
    sampleString: string,
    sampleNumber: number,
    sampleBoolean: boolean,
    sampleObject: IMyInterface,
    sampleDate: Date
}
```

and you receive an instance of `ISampleObjectType` from a remote service you probably want to check that infact every property has a valid value.

MaybeProps can help you with this.

To create a MaybeProps Object you have to pass a factory object. This factory object lists all the property names that we need to check (Interfaces are only compile time, not run time) and indicates what type these properties should be:

```
const factoryObject: ISampleObjectType = {
    sampleString: "",
    sampleNumber: 0,
    sampleBoolean: true,
    sampleObject: {name: "", id: 0},
    sampleDate: new Date()
};

const props = objectToMaybeProps(objectFromService,factoryObject);
```

It does not matter what values the properties on the factory object are, just the type.

By default no conversion takes place so `"true"` will not be turned into `true` and `"123.45"` will not be converted to a number. Complex objects will only be checked that they are not null. properties of complex objects will not be checked.

We can add extra conversions and checks though by instead of using simple values in the factory object we supply methods for creating the maybe for each property instead.

For example:

```
const factoryObject: ISampleObjectType = {
    sampleString: value => maybeString(value).filter(v => v != "") // ensures string is not empty,
    sampleNumber: value => maybeParseFloat(value), // uses parseFloat to convert string
    sampleBoolean: value => maybeParseBoolean(value),  // 'true' => true
    sampleObject: value => Maybe.nulltoMaybe(value).bind(v => Maybe.nullToMaybe(v.name)), //checks second level properties
    sampleDate: value => maybeParseDate(value) // parses strings and converts to valid dates
};
```

we can also deal with interfaces like this:

```
interface ISampleObjectType {
    sampleString: string,
    sampleNumber: number,
    sampleBoolean?: boolean,
    sampleDate: Date
}
```

where we have one property that is optional:

```
const factoryObject: ISampleObjectType = {
    sampleString: "",
    sampleNumber: 0,
    sampleBoolean: value => Maybe.justAllowNull(value),
    sampleDate: new Date()
};
```

once we have our maybeProps object we can use each maybe as we would any other:

```
const props = objectToMaybeProps(objectFromService,factoryObject);

props.sampleString.do(v => console.log(`string was ${v}`));
props.sampleNumber = props.sampleNumber.filter(v => v > 100);
```

and once we want to use our object we can convert the MaybeProps<T> back into T:

```
const props = objectToMaybeProps(objectFromService,factoryObject);

const maybeVerifiedObject: Maybe<ISampleObjectType> = maybePropsToMaybeObject(props);

maybeVerifiedObject.throwIfNothing("a property was missing");
```

## Tests

Tests can be run as follows:

```
git clone https://github.com/Roaders/maybe-monad.git
cd maybe-monad
npm install
npm test
```