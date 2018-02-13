var Lab = require('lab');
var Code = require('code');

var lab = exports.lab = Lab.script();
var describe = lab.describe;
var it = lab.it;
var expect = Code.expect;

var durational = require('../');

var StringTestCases = {
  'PT1H10M20S': { hours:  1, minutes: 10, seconds: 20 },
  'PT1H10M':    { hours:  1, minutes: 10, seconds:  0 },
  'PT1H20S':    { hours:  1, minutes:  0, seconds: 20 },
  'PT1H':       { hours:  1, minutes:  0, seconds:  0 },
  'PT10M20S':   { hours:  0, minutes: 10, seconds: 20 },
  'PT10M':      { hours:  0, minutes: 10, seconds:  0 },
  'PT20S':      { hours:  0, minutes:  0, seconds: 20 },
  'PT0S':       { hours:  0, minutes:  0, seconds:  0 }
};

describe('durational', function() {
  describe('fromSeconds', function() {
    it('accepts numbers as input', function() {
      expect(function(){
        durational.fromSeconds(15650);
      }).to.not.throw();

      expect(function(){
        durational.fromSeconds('15650');
      }).to.throw();
    });

    it('handles minutes, and seconds', function() {
      var result = durational.fromSeconds(50);

      expect(result).to.be.a.object();
      expect(result).to.be.equal({
        hours: 0,
        minutes: 0,
        seconds: 50
      });
    });

    it('handles minutes, and seconds', function() {
      var result = durational.fromSeconds(1250);

      expect(result).to.be.a.object();
      expect(result).to.be.equal({
        hours: 0,
        minutes: 20,
        seconds: 50
      });
    });

    it('handles hours, minutes, and seconds', function() {
      var result = durational.fromSeconds(15650);

      expect(result).to.be.a.object();
      expect(result).to.be.equal({
        hours: 4,
        minutes: 20,
        seconds: 50
      });
    });
  });

  describe('fromString', function() {
    it('accepts only strings', function() {
      expect(function() {
        durational.fromString('PT1H');
      }).to.not.throw();

      expect(function() {
        durational.fromString(50);
        durational.fromString({});
        durational.fromString([]);
      }).to.throw();
    });

    it('should return an object representing the duration', function() {
      Object.keys(StringTestCases).forEach(function(testcase){
        expect(durational.fromString(testcase)).to.equal(StringTestCases[testcase]);
      });

      expect(durational.fromString('PT1H0S')).to.equal({ hours:  1, minutes:  0, seconds:  0 });
    });

    it('should throw if given invalid format', function() {
      [
        '',         // Empty string
        'PT',       // Missing all values
        'P1H',      // Missing the T separator
        'PT10M1H',  // Wrong order should be 1H10M
        'PT10S1H',  // Wrong order should be 1H10S
        'PT10S6M',  // Wrong order should be 6M10S
        'PT10.7S',  // Trying to use fractional seconds
      ].forEach(function(string) {
        expect(function() {
          durational.fromString(string);
        }).to.throw();
      });
    });
  });

  describe('toString', function() {
    it('should convert from an object to a string', function() {
      Object.keys(StringTestCases).forEach(function(testcase){
        expect(durational.toString(StringTestCases[testcase])).to.equal(testcase);
      });
    });

    it('should convert from a number', function() {
      expect(durational.toString(4220)).to.equal('PT1H10M20S');
    });
  });

  describe('toSeconds', function() {
    it('should convert from string', function() {
      expect(durational.toSeconds('PT1H10M20S')).to.equal(4220);
    });

    it('should convert from a duration object', function() {
      expect(durational.toSeconds({
        hours: 1,
        minutes: 10,
        seconds: 21
      })).to.equal(4221);
    });
  });
});
