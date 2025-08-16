const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('Event Loader', () => {
	test('should attach events to client', () => {
		const mockEvent = { name: 'ready', once: true, execute: jest.fn() };
		const client = { once: jest.fn(), on: jest.fn() };

		fs.readdirSync.mockReturnValue(['ready.js']);
		jest.mock(path.join(__dirname, '../src/events/ready.js'), () => mockEvent, { virtual: true });

		const loadEvents = require('../src/index').loadEvents;
		loadEvents(client);

		expect(client.once).toHaveBeenCalledWith('ready', expect.any(Function));
	});
});
