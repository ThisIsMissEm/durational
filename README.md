# durational

Simplistic library for dealing with Durations

## ABNF for Strings

The strings that this module outputs could be represented with the following ABNF, which is a subset of that found in RFC3339 for Durations:

```
   dur-second        = 1*DIGIT "S"
   dur-minute        = 1*DIGIT "M" [dur-second]
   dur-hour          = 1*DIGIT "H" [dur-minute]
   dur-time          = "T" (dur-hour / dur-minute / dur-second)

   duration          = "P" dur-time
```

Specifically, this module does not handle Years, Months, Days, or Weeks. It also doesn't accept fractional seconds (milli / nano seconds).

## Example Strings

```
  PT20S       //  0 Hours,  0 Minutes, 20 Seconds
  PT10M       //  0 Hours, 10 Minutes,  0 Seconds
  PT1H        //  1 Hours,  0 Minutes,  0 Seconds
  PT1H20S     //  1 Hours,  0 Minutes, 20 Seconds
  PT1H10M     //  1 Hours, 10 Minutes,  0 Seconds
  PT1H10M20S  //  1 Hours, 10 Minutes, 20 Seconds
  PT26H10M20S // 26 Hours, 10 Minutes, 20 Seconds
```

## Duration Object

When a method accepts or returns an object, it'll use the following structure:

```
  {
    hours: Integer,
    minutes: Integer,
    seconds: Integer
  }
```

## Methods

### fromSeconds(integer)

Takes an integer and creates a Duration Object. See the source code for details, but seconds are used first, then minutes, then hours.

For example, `fromSeconds(60)` would return `{ hours: 0, minutes: 1, seconds: 0 }`

### fromString(string)

Parses a given String using the format specified above. Returns an `Duration Object`.

### toString(object | integer)

Accepts a `Duration Object` or a `integer` value representing the duration in seconds. When an `integer` argument is given, the value is first passed to `fromSeconds`, in order to get it's `Duration Object` representation.

Returns a String matching the ABNF listed above. In the case of the duration having a total length of 0 seconds, `PT0S` is returned, such that you still can parse it at a later date.
