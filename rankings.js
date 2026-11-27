// song rankings for kpop.html: each list is in rank order (index 0 = #1),
// TIERS gives the number of tiles per pyramid row, and ALBUM_HUES maps
// album -> hue for a light tint (albums not listed stay untinted)

const IVE_SONGS = [
	["ATTITUDE", "IVE EMPATHY"],
	["After LIKE", "After LIKE"],
	["Off The Record", "I've MINE"],
	["REBEL HEART", "IVE EMPATHY"],
	["Blue Blood", "I've IVE"],
	["SNAKESKIN", "Looks Can Kill"],
	["Looks Can Kill", "Looks Can Kill"],
	["Ice Queen", "IVE SWITCH"],
	["NOT YOUR GIRL", "I've IVE"],
	["Hot Coffee", "REVIVE+"],
	["BANG BANG", "REVIVE+"],
	["Be Alright", "Be Alright"],
	["Lips", "I've IVE"],
	["Odd (Gaeul solo)", "REVIVE+"],
	["Will", "ALIVE"],
	["♥beats", "IVE SECRET"],
	["Hush", "REVIVE+"],
	["Mine", "I've IVE"],
	["Fashion", "LUCID DREAM"],
	["JIGSAW", "LUCID DREAM"],
	["Payback", "I've MINE"],
	["FLU", "IVE EMPATHY"],
	["Force (Yujin solo)", "REVIVE+"],
	["LUCID DREAM", "LUCID DREAM"],
	["Fireworks", "REVIVE+"],
	["LOVE DIVE", "LOVE DIVE"],
	["Accendio", "IVE SWITCH"],
	["Stuck in Your Head", "REVIVE+"],
	["Unreal (Liz solo)", "REVIVE+"],
	["XOXZ", "IVE SECRET"],
	["Mirror Mirror", "Looks Can Kill"],
	["Summer Festa", "Summer Festa (single)"],
	["BLACKHOLE", "REVIVE+"],
	["Holy Moly", "I've MINE"],
	["OTT", "I've MINE"],
	["I AM", "I've IVE"],
	["ELEVEN", "ELEVEN"],
	["Take It", "ELEVEN"],
	["WOW", "IVE SWITCH"],
	["Wild Bird", "IVE SECRET"],
	["Shine With Me", "I've IVE"],
	["DARE ME", "Be Alright"],
	["Royal", "LOVE DIVE"],
	["WAVE", "WAVE"],
	["Kitsch", "I've IVE"],
	["All Night (feat. Saweetie)", "All Night (single)"],
	["TKO", "IVE EMPATHY"],
	["HEYA", "IVE SWITCH"],
	["RESET", "IVE SWITCH"],
	["My Satisfaction", "After LIKE"],
	["Supernova Love (with David Guetta)", "Supernova Love (single)"],
	["Either Way", "I've MINE"],
	["Dear, My Feelings", "IVE SECRET"],
	["Blue Heart", "IVE SWITCH"],
	["I WANT", "I WANT (single)"],
	["Gotcha (Baddest Eros)", "IVE SECRET"],
	["Thank U", "IVE EMPATHY"],
	["Next Page", "I've IVE"],
	["Girls Girls Girls", "Looks Can Kill"],
	["In Your Heart (Rei solo)", "REVIVE+"],
	["You Wanna Cry", "IVE EMPATHY"],
	["Midnight Kiss", "IVE SECRET"],
	["Heroine", "I've IVE"],
	["Baddie", "I've MINE"],
	["Classic", "WAVE"],
	["Cherish", "I've IVE"],
	["Super Icy (Leeseo solo)", "REVIVE+"],
	["CRUMBS", "Looks Can Kill"],
	["Hypnosis", "I've IVE"],
	["8 (Wonyoung solo)", "REVIVE+"],
	["CRUSH", "ALIVE"],
	["Glow Motion", "Looks Can Kill"],
];
const IVE_TIERS = [3, 7, 10, 10, 10, 10, 10, 12];
const IVE_ALBUM_HUES = {
	"I've IVE": 0,
	"REVIVE+": 30,
	"LUCID DREAM": 55,
	"IVE SWITCH": 120,
	"I've MINE": 175,
	"Looks Can Kill": 215,
	"IVE SECRET": 270,
	"IVE EMPATHY": 320,
};

const IZNA_SONGS = [
	["R.I.P.", "SET THE TEMPO"],
	["Love All", "Love All (single)"],
	["LEAN ON ME", "SET THE TEMPO"],
	["ROCK, PAPER, SCISSORS", "SET THE TEMPO"],
	["FAKE IT", "N/a"],
	["In The Rain (빗속에서)", "Not Just Pretty"],
	["HEADACHE", "HANDLE WITH CARE"],
	["Racecar", "Not Just Pretty"],
	["TIMEBOMB", "N/a"],
	["INFINITY", "SET THE TEMPO"],
	["BEEP", "BEEP (single album)"],
	["SIGN", "SIGN (single)"],
	["METRONOME", "SET THE TEMPO"],
	["DUMB HOT!", "HANDLE WITH CARE"],
	["IWALY", "N/a"],
	["Supercrush", "Not Just Pretty"],
	["IZNA", "N/a"],
	["Mamma Mia", "Not Just Pretty"],
	["DRIP", "N/a"],
];
const IZNA_TIERS = [3, 4, 5, 7];
const IZNA_ALBUM_HUES = {
	"SET THE TEMPO": 0,
	"N/a": 215,
	"Not Just Pretty": 120,
	"HANDLE WITH CARE": 270,
};

function buildPyramid(id, songs, tiers, hues){
	const pyramid = document.getElementById(id);
	let rank = 0;
	for(const n of tiers){
		const row = document.createElement('div');
		row.className = 'tier';
		for(let j = 0; j < n; j++, rank++){
			const t = document.createElement('div');
			t.className = 'tile';
			const [song, album] = songs[rank];
			if(album in hues){
				t.classList.add('tinted');
				t.style.setProperty('--h', hues[album]);
			}
			t.innerHTML = `<span class="rank">${rank + 1}</span>${song}<span class="album">${album}</span>`;
			row.appendChild(t);
		}
		pyramid.appendChild(row);
	}
}

buildPyramid('ive-pyramid', IVE_SONGS, IVE_TIERS, IVE_ALBUM_HUES);
buildPyramid('izna-pyramid', IZNA_SONGS, IZNA_TIERS, IZNA_ALBUM_HUES);

// start scrolled to the middle so the top of the pyramid is in view
for(const r of document.querySelectorAll('.ranking')){
	r.addEventListener('toggle', e => {
		const sc = e.target.querySelector('.pyramid-scroll');
		sc.scrollLeft = (sc.scrollWidth - sc.clientWidth) / 2;
	});
}
