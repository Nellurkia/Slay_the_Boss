// Here's you will find all the sound effects used in the game.
// Sound effects are pre-recorded audio files; BGM is a separate looping track.
let audioContext

// Global mute control
let isMuted = false

// All sound effects (not the BGM) are boosted by this factor.
const SFX_VOLUME_MULTIPLIER = 1

// Background music, kept separate so it isn't affected by SFX_VOLUME_MULTIPLIER.
let bgmAudio
const BGM_VOLUME = 0.2 // 0 (silent) to 1 (full volume)

export function playBGM() {
	if (!bgmAudio) {
		bgmAudio = new Audio('/bgm.mp3')
		bgmAudio.loop = true
		bgmAudio.volume = BGM_VOLUME
	}
	if (isMuted) return
	bgmAudio.play().catch(() => {})
}

// Scale definitions for musical sequences (used by playCoin)
const majorScale = [523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77, 1046.5] // C5, D5, E5, F5, G5, A5, B5, C6
const minorScale = [440.0, 523.25, 587.33, 659.25, 698.46, 783.99, 880.0, 987.77] // A4, C5, D5, E5, F5, G5, A5, B5
const pentatonicScale = [523.25, 659.25, 783.99, 880.0, 1046.5] // C5, E5, G5, A5, C6

// Sound effect files, keyed by the trigger function that plays them.
const SFX_FILES = {
	startGame: '/startgame.mp3',
	startTurn: '/startturn.mp3',
	endTurn: '/endturn.mp3',
	cardToHand: '/cardtohand.mp3',
	selectCard: '/selectcard.mp3',
	playCard: '/playcard.mp3',
}

// Decoded SFX buffers, cached (by promise, to dedupe concurrent loads of the same file) so each file is only fetched/decoded once.
const sfxBufferCache = {}

function loadSfxBuffer(url) {
	if (!sfxBufferCache[url]) {
		sfxBufferCache[url] = fetch(url)
			.then((response) => response.arrayBuffer())
			.then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
	}
	return sfxBufferCache[url]
}

// Plays a pre-recorded sound effect file, boosted by SFX_VOLUME_MULTIPLIER.
async function playSfx(url) {
	if (!audioContext) init()
	if (isMuted) return
	const buffer = await loadSfxBuffer(url)
	if (isMuted) return
	const source = audioContext.createBufferSource()
	source.buffer = buffer
	const gainNode = audioContext.createGain()
	gainNode.gain.value = SFX_VOLUME_MULTIPLIER
	source.connect(gainNode)
	gainNode.connect(audioContext.destination)
	source.start()
}

// Initialize audio context
export async function init() {
	if (!audioContext) {
		try {
			audioContext = new window.AudioContext()
			// Warm the cache so the first play of each effect isn't delayed by fetch+decode.
			Object.values(SFX_FILES).forEach((url) => loadSfxBuffer(url))
		} catch (error) {
			console.error('Failed to create audio context:', error)
		}
	}
	return Promise.resolve()
}

/**
 * Plays a beep sound with frequency modulation
 */
export function beep(startFrequency = 440, endFrequency = 880, duration = 0.5, waveform = 'square', volume = 0.1) {
	if (!audioContext) init()
	if (isMuted) return
	volume *= SFX_VOLUME_MULTIPLIER
	const oscillator = audioContext.createOscillator()
	oscillator.type = waveform // 'square', 'sawtooth', 'triangle', or 'sine'
	oscillator.frequency.setValueAtTime(startFrequency, audioContext.currentTime)

	if (endFrequency && duration > 0) {
		oscillator.frequency.exponentialRampToValueAtTime(endFrequency, audioContext.currentTime + duration)
	}

	// Adding a simple gain envelope for a more "blippy" sound
	const gainNode = audioContext.createGain()
	gainNode.gain.setValueAtTime(0, audioContext.currentTime)
	gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.01) // Quick ramp up
	gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration) // And down

	oscillator.connect(gainNode)
	gainNode.connect(audioContext.destination)

	oscillator.start()
	oscillator.stop(audioContext.currentTime + duration)
}

/**
 * Plays a coin/reward high pitched sound
 */
export function playCoin(type, volume = 0.5) {
	if (!audioContext) init()
	if (isMuted) return

	const scales = [majorScale, minorScale, pentatonicScale]
	let selectedScale = scales[Math.floor(Math.random() * scales.length)]
	if (type === 'major') selectedScale = majorScale
	if (type === 'minor') selectedScale = minorScale
	if (type === 'pentatonic') selectedScale = pentatonicScale

	selectedScale.forEach((note, index) => {
		setTimeout(() => {
			beep(note, note, 0.1, 'triangle', volume)
		}, index * 100)
	})
}

/**
 * Plays a whoosh sound effect
 */
export function playWhoosh(duration = 1, startFreq = 200, endFreq = 800, volume = 0.2) {
	if (!audioContext) init()
	if (isMuted) return
	volume *= SFX_VOLUME_MULTIPLIER

	// Sine wave oscillator
	const oscillator = audioContext.createOscillator()
	oscillator.type = 'sine'
	oscillator.frequency.setValueAtTime(startFreq, audioContext.currentTime)
	oscillator.frequency.exponentialRampToValueAtTime(endFreq, audioContext.currentTime + duration)

	// Gain envelope for smooth fade-in and fade-out
	const gainNode = audioContext.createGain()
	gainNode.gain.setValueAtTime(0, audioContext.currentTime)
	gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + duration * 0.2)
	gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + duration)

	oscillator.connect(gainNode)
	gainNode.connect(audioContext.destination)

	oscillator.start()
	oscillator.stop(audioContext.currentTime + duration)
}

export function startGame() {
	playBGM()
	playSfx(SFX_FILES.startGame)
}

export function startTurn() {
	playSfx(SFX_FILES.startTurn)
}

export function endTurn() {
	playSfx(SFX_FILES.endTurn)
}

export function cardToHand() {
	playSfx(SFX_FILES.cardToHand)
}

export function selectCard() {
	playSfx(SFX_FILES.selectCard)
}

export function playCard(/*card*/) {
	playSfx(SFX_FILES.playCard)
}

export const toggleMute = (shouldMute) => {
	isMuted = shouldMute
	if (bgmAudio) {
		if (shouldMute) bgmAudio.pause()
		else bgmAudio.play().catch(() => {})
	}
}
