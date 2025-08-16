const { Collection } = require('discord.js');

describe('Command Execution', () => {
	test('should execute command if found', async () => {
		const mockCommand = {
			data: { name: 'ping' },
			execute: jest.fn(),
		};

		const client = {
			commands: new Collection([['ping', mockCommand]]),
		};

		const interaction = {
			commandName: 'ping',
			reply: jest.fn(),
		};

		await client.commands.get('ping').execute(interaction);
		expect(mockCommand.execute).toHaveBeenCalledWith(interaction);
	});
});
