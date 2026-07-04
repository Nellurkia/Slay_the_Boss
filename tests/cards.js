import test from 'ava'
import {cards} from '../src/content/cards.js'
import {createCard} from '../src/game/cards.js'

test('can create an attack card', (t) => {
	const card = createCard('捶打')
	t.is(card.name, '捶打')
	t.is(card.type, 'attack')
	t.is(card.target, 'enemy')
	t.is(typeof card.damage, 'number')
	t.is(typeof card.energy, 'number')
	t.truthy(card.description)
})

test('can create a skill card', (t) => {
	const card = createCard('绷住')
	t.is(card.type, 'skill')
	t.is(card.target, 'player')
	t.is(typeof card.block, 'number')
})

test('card name must be exact', (t) => {
	t.throws(() => createCard('Naaaah doesnt exist'))
})

test('can upgrade Strike card', (t) => {
	const strikeplus = createCard('捶打', true)
	t.is(strikeplus.damage, 9)
	t.true(strikeplus.upgraded)
	const strike = createCard('捶打')
	t.is(strike.damage, 6)
})

test('can upgrade all cards', (t) => {
	for (const card of cards) {
		const upgraded = createCard(card.name, true)
		t.true(upgraded.upgraded)
		t.true(upgraded.name.includes('+'), upgraded.name)
	}
})

test('card names with plus always upgrade', (t) => {
	t.is(createCard('PUA').name, 'PUA')
	t.is(createCard('PUA', true).name, '高级PUA+', 'different upgraded name')
	t.is(createCard('高级PUA+', true).name, '高级PUA+', 'if name contains + we always upgrade')
	t.is(createCard('高级PUA+', false).name, '高级PUA+', 'if name contains + we always upgrade')
})

test('createCard handles already-upgraded card names', (t) => {
	// Regular cards with + suffix
	const bashPlus = createCard('电眼+')
	t.true(bashPlus.upgraded)
	t.is(bashPlus.name, '电眼+')

	// Special cards with different upgrade names
	const highSuccube = createCard('高级PUA+')
	t.true(highSuccube.upgraded)
	t.is(highSuccube.name, '高级PUA+')
})

test('upgrading is consistent', (t) => {
	// Regular upgrade path
	const card1 = createCard('电眼', true)
	const card2 = createCard('电眼+')
	delete card1.id
	delete card2.id
	t.deepEqual(card1, card2, 'Both upgrade paths should create identical cards')

	// Special upgrade name path
	const succubePath1 = createCard('PUA', true)
	const succubePath2 = createCard('高级PUA+')
	delete succubePath1.id
	delete succubePath2.id
	t.deepEqual(succubePath1, succubePath2, 'Special upgrade paths should be consistent')
})

test('all upgraded card names follow conventions', (t) => {
	const specialUpgradeCards = new Set(['PUA']) // Add any cards with special upgrade names here

	for (const card of cards) {
		const upgraded = createCard(card.name, true)

		if (specialUpgradeCards.has(card.name)) {
			t.true(upgraded.name.endsWith('+'),
				`Special upgrade ${upgraded.name} should still end with +`)
		} else {
			t.is(upgraded.name, card.name + '+',
				`Regular upgrade of ${card.name} should be ${card.name}+`)
		}
	}
})
