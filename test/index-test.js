// Mocking window and document object:
require('./dom-mock')('<html><body><main></main></body></html>');

const jsdom = require('mocha-jsdom');
const assert = require('assert');
const React = require('react');
const TestUtils = require('react-addons-test-utils');

describe('Index', function() {
  jsdom({ skipWindowCheck: true });

  it('should contain heading: Video Tests', function() {
    let Index = require('../src/modules/Index.js');
    let heading = TestUtils.renderIntoDocument(
      <Index />
    );
    let headingText = TestUtils.findRenderedDOMComponentWithTag(
      heading, 'h1');

    assert.equal(headingText.textContent, 'Video Tests');
  });
});