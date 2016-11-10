// Mocking window and document object:
require('./dom-mock')('<html><body><main></main></body></html>');

const jsdom = require('mocha-jsdom');
const assert = require('assert');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

describe('Test', function() {
  jsdom({ skipWindowCheck: true });


  it('Loads a standard zombie test', function() {
    let Test = require('../src/modules/Tests/Test.js');
    let paramStub = {
      video: 'zombie'
    }
    let locationStub = {
      query: {
        type: 'standard',
        challenge: 'none'
      }
    }

    let test = TestUtils.renderIntoDocument(
      <Test params={paramStub} location={locationStub} />
    );
    let headingText = TestUtils.findRenderedDOMComponentWithTag(
      test, 'h3');

    assert.equal(headingText.textContent, 'Zombie Antidote* video - standard questions - No time limit.');
  });
});