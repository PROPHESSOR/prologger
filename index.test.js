// Jest test

'use strict';

/* global jest test describe expect */

const Logger = require('.');

function redefine() {
	console.log = jest.fn();
	console.warn = jest.fn();
	console.info = jest.fn();
	console.error = jest.fn();
}

describe('Базовая проверка компонентов', () => {
	test('Все базовые компоненты должны запускаться', () => {
		redefine();

		const logger = new Logger();

		logger.log('Logger.log');
		logger.warn('Logger.warn');
		logger.info('Logger.info');
		logger.success('Logger.success');
		logger.error('Logger.error');

		expect(console.log.mock.calls.length).toBe(2);
		expect(console.info.mock.calls.length).toBe(1);
		expect(console.error.mock.calls.length).toBe(1);
		expect(console.warn.mock.calls.length).toBe(1);
	});

});

describe('Проверка на использование соответствующего метода console', () => {
	const logger = new Logger();
	test('log должен использовать console.log', () => {
		redefine();
		logger.log(123);
		expect(console.log.mock.calls.length).toBe(1);
	});
	test('warn должен использовать console.warn', () => {
		redefine();
		logger.warn(123);
		expect(console.warn.mock.calls.length).toBe(1);
	});
	test('error должен использовать console.error', () => {
		redefine();
		logger.error(123);
		expect(console.error.mock.calls.length).toBe(1);
	});
	test('info должен использовать console.info', () => {
		redefine();
		logger.info(123);
		expect(console.info.mock.calls.length).toBe(1);
	});
	test('success должен использовать console.log', () => {
		redefine();
		logger.success(123);
		expect(console.log.mock.calls.length).toBe(1);
	});
});


describe('Проверка на корректное отображение level\'ов', () => {
	test('log:', () => {
		redefine();

		const logger = new Logger({
			levels: ['q', 'w']
		});

		logger.log(123, {
			level: 'q'
		});
		logger.log(123, {
			level: 'w'
		});
		logger.log(123, {
			level: 'e'
		});
		logger.log(123);

		expect(console.log.mock.calls.length).toBe(3);
	});

	test('warn:', () => {
		redefine();

		const logger = new Logger({
			levels: ['q', 'w']
		});

		logger.warn(123, {
			level: 'q'
		});
		logger.warn(123, {
			level: 'w'
		});
		logger.warn(123, {
			level: 'e'
		});
		logger.warn(123);

		expect(console.warn.mock.calls.length).toBe(3);
	});

	test('info:', () => {
		redefine();

		const logger = new Logger({
			levels: ['q', 'w']
		});

		logger.info(123, {
			level: 'q'
		});
		logger.info(123, {
			level: 'w'
		});
		logger.info(123, {
			level: 'e'
		});
		logger.info(123);

		expect(console.info.mock.calls.length).toBe(3);
	});

	test('error:', () => {
		redefine();

		const logger = new Logger({
			levels: ['q', 'w']
		});

		logger.error(123, {
			level: 'q'
		});
		logger.error(123, {
			level: 'w'
		});
		logger.error(123, {
			level: 'e'
		});
		logger.error(123);

		expect(console.error.mock.calls.length).toBe(3);
	});

	test('success:', () => {
		redefine();

		const logger = new Logger({
			levels: ['q', 'w']
		});

		logger.success(123, {
			level: 'q'
		});
		logger.success(123, {
			level: 'w'
		});
		logger.success(123, {
			level: 'e'
		});
		logger.success(123);

		expect(console.log.mock.calls.length).toBe(3);
	});

	describe('Проверка методов addLevels и removeLevel', () => {
		test('addLevel при получении не строки и не массива должен вернуть ошибку', () => {
			const logger = new Logger();
			expect(() => logger.addLevels(null)).toThrowError('Levels must be an Array or a String');
		});

		test('removeLevel при получении не строки должен вернуть ошибку', () => {
			const logger = new Logger();
			expect(() => logger.removeLevel(null)).toThrowError('Argument must be a String');
		});

	});

	describe('Проверка добавления уровней отображения', () => {
		test('Проверка добавления одного уровня (строка)', () => {
			redefine();
			const logger = new Logger();

			logger
				.log(123, { level: 'q' })
				.addLevels('q')
				.log(123, { level: 'q' });

			expect(console.log.mock.calls.length).toBe(1);
		});

		test('Проверка добавления двух уровней (массив)', () => {
			redefine();
			const logger = new Logger();

			logger
				.log(123, { level: 'q' })
				.log(123, { level: 'w' })
				.addLevels(['q', 'w'])
				.log(123, { level: 'q' })
				.log(123, { level: 'w' });

			expect(console.log.mock.calls.length).toBe(2);
		});

	});


	describe('Проверка удаления уровней отображения', () => {
		test('Проверка удаления одного уровня (строка)', () => {
			redefine();
			const logger = new Logger({
				levels: ['q']
			});

			logger
				.log(123, { level: 'q' })
				.removeLevel('q')
				.log(123, { level: 'q' });

			expect(console.log.mock.calls.length).toBe(1);
		});

	});


	describe('Проверка чистого отображения', () => {
		test('log должен просто передать значение на вывод', () => {
			redefine();
			const logger = new Logger({
				pure: true,
				showColors: false
			});

			logger.log('q');
			expect(console.log.mock.calls[0][0]).toBe('q');
		});

		test('warn должен просто передать значение на вывод', () => {
			redefine();
			const logger = new Logger({
				pure: true,
				showColors: false
			});

			logger.warn('q');
			expect(console.warn.mock.calls[0][0]).toBe('q');
		});

		test('info должен просто передать значение на вывод', () => {
			redefine();
			const logger = new Logger({
				pure: true,
				showColors: false
			});

			logger.info('q');
			expect(console.info.mock.calls[0][0]).toBe('q');
		});

		test('error должен просто передать значение на вывод', () => {
			redefine();
			const logger = new Logger({
				pure: true,
				showColors: false
			});

			logger.error('q');
			expect(console.error.mock.calls[0][0]).toBe('q');
		});

		test('success должен просто передать значение на вывод', () => {
			redefine();
			const logger = new Logger({
				pure: true,
				showColors: false
			});

			logger.success('q');
			expect(console.log.mock.calls[0][0]).toBe('q');
		});

	});


});
