/**
 * Manages all sound effects and music within the game. Implements a singleton pattern to ensure only one instance manages sound.
 */
class SoundManager {
    static instance = new SoundManager();
    
    /**
     * Initializes a new instance of SoundManager if it does not already exist.
     */
    constructor() {
        if (!SoundManager.instance) {
            this.sounds = {
                backgroundMusic: new Audio("audio/background_music.mp3"),
                endbossBackgroundMusic: new Audio("audio/endboss_music.mp3"),
                endbossHurt: new Audio("audio/endboss_hurt.mp3"),
                endbossDead: new Audio("audio/endboss_dead.mp3"),
                endbossSwimming: new Audio("audio/endboss_swimming.mp3"),
                swimming: new Audio("audio/swimming.mp3"),
                finSlap: new Audio("audio/fin_slap_sound.mp3"),
                bubbleAttack: new Audio("audio/bubble_spit_sound.mp3"),
                collectBottle: new Audio("audio/collect_bottle.mp3"),
                collectCoin: new Audio("audio/collect_coin.mp3"),
                sharkieDead: new Audio("audio/sharkie_dead.mp3"),
                sharkieHurt: new Audio("audio/sharkie_hurt.mp3"),
                sharkieElectric: new Audio("audio/electric_sound.mp3"),
                sharkieIdle: new Audio('audio/sharkie_idle.mp3'),
                gameOver: new Audio('audio/game_over.mp3'),
                jellyFishDead: new Audio('audio/jellyfish_dead.mp3'),
                pufferFish: new Audio('audio/pufferFish.mp3'),
                pufferFishDead: new Audio('audio/pufferFish_dead.mp3'),
                youWin: new Audio('audio/you_win.mp3'),
            };
            this.sounds.backgroundMusic.volume = 0.1;
            this.sounds.endbossBackgroundMusic.volume = 0.3;
            this.sounds.pufferFish.volume = 0.5;
            this.sounds.youWin.volume = 0.3
            this.isMuted = false;
            SoundManager.instance = this;
        }
        return SoundManager.instance;
    }

    /**
     * Stops a specific sound and resets its playback position.
     * @param {string} soundName - The name of the sound to stop.
     */
    stop(soundName) {
        if (this.sounds[soundName]) {
            const sound = this.sounds[soundName];
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Stops all sounds currently playing and resets their playback positions.
     */
    stopAllSounds() {
        for (let key in this.sounds) {
            const sound = this.sounds[key];
            sound.pause();
            sound.currentTime = 0; 
        }
    }
    
    /**
     * Toggles the mute state of all sounds. If muted, all sounds are paused. Otherwise, appropriate sounds are resumed.
     */
    toggleMute() {
        this.isMuted = !this.isMuted;
        for (let key in this.sounds) {
            const sound = this.sounds[key];
            if (this.isMuted) {
                if (!sound.paused) {
                    sound.pause();
                }
            } else {
                if (key === "endbossBackgroundMusic" && world.endbossEncounterStarted) {
                    sound.play();
                } else if (key === "backgroundMusic" && !world.endbossEncounterStarted) {
                    sound.play();
                }
            }
        }
    }

    /**
     * Plays a specific sound if not muted.
     * @param {string} soundName - The name of the sound to play.
     */
    play(soundName) {
        if (!this.isMuted && this.sounds[soundName]) {
            this.sounds[soundName].play();
        }
    }

    /**
     * Plays a specific sound for a set duration, then stops it.
     * @param {string} soundName - The name of the sound to play.
     * @param {number} duration - The duration in milliseconds to play the sound.
     */
    playForDuration(soundName, duration) {
        if (!this.isMuted && this.sounds[soundName]) {
            const sound = this.sounds[soundName];
            sound.play();
            setTimeout(() => {
                sound.pause();
                sound.currentTime = 0; 
            }, duration);
        }
    }

    /**
     * Plays a specific sound multiple times simultaneously (e.g., for sound effects that need to overlap).
     * @param {string} soundName - The name of the sound to play.
     */
    playMultipleSoundsAtOnce(soundName) {
        if (!this.isMuted && this.sounds[soundName]) {
            this.sounds[soundName].cloneNode(true).play();
        }
    }
}
