const fs = require('fs');
const path = require('path');

jest.mock('fs');

describe('Event Loader', () => {
	test('should attach events to client', () => {
		const mockEvent = { name: 'ready', once: true, execute: jest.fn() };
		const client = { once: jest.fn(), on: jest.fn() };

		fs.readdirSync.mockReturnValue(['ready.js']);
		jest.mock(path.join(__dirname, '../../events/ready.js'), () => mockEvent, { virtual: true });

		// Mock the require to return our functions
		const { loadEvents } = require('../../index');

		// Mock the event file require
		const originalRequire = require;
		require = jest.fn((filePath) => {
			if (filePath.includes('ready.js')) return mockEvent;
			return originalRequire(filePath);
		});

		loadEvents(client);

		expect(client.once).toHaveBeenCalledWith('ready', expect.any(Function));

		// Restore require
		require = originalRequire;
	});
});
