import jsdom from 'jsdom'

global.window = jsdom.jsdom().defaultView;
global.document = window.document;
global.navigator = window.navigator;
