const SEMS = ["spring 2025", "fall 2025", "spring 2026", "fall 2026", "spring 2027"];
const PLANNED = 4; // semester index whose courses get dashed tiles

// [label, hue, [[code, name, semester index], ...]]
const ROWS = [
	["cs", 270, [
		["CS 429H", "Honors Computer Architecture", 0],
		["CS 439", "Operating Systems", 1],
		["CS 378", "Game Theory", 1],
		["CS 331", "Algorithms", 2],
		["CS 349", "Contemp. Issues", 2],
		["CS 342S", "Intro to Audio Processing", 3],
		["CS 378", "Systems for ML", 3],
		["CS 353", "Theory of Computation", 4],
		["CS 354H", "Honors Graphics", 4],
		["CS 388G", "Graduate Algorithms", 4],
	]],
	["math", 215, [
		["M 340L", "Linear Algebra", 0],
		["M 362K", "Probability I", 0],
		["M 427L", "Vector Calculus", 1],
		["M 328K", "Number Theory", 1],
		["M 343L", "Applied Number Theory", 2],
		["M 365C", "Real Analysis I", 2],
		["M 362M", "Stochastic Processes", 3],
		["M 375T", "Geometric Foundations of ML", 4],
	]],
	["other", 120, [
		["INB 321G", "Comp. Biology FRI", 0],
		["I 320", "Cybsec. Practicum", 1],
		["I 320", "Cybsec. Practicum", 2],
		["PHY 329", "Intro to Comp. Physics", 3],
		["LIN 350C", "Language and the Brain", 4],
	]],
];

const flow = document.getElementById("flow");
const add = (cls, html = "") => {
	const d = document.createElement("div");
	d.className = cls;
	d.innerHTML = html;
	flow.appendChild(d);
	return d;
};

// header row
add("");
SEMS.forEach((sem, i) => {
	if (i > 0) add("");
	add("sem", sem);
});

for (const [label, hue, courses] of ROWS) {
	add("label", label);
	SEMS.forEach((_, i) => {
		const here = courses.filter(c => c[2] === i);
		if (i > 0) add("arrow", here.length && courses.some(c => c[2] === i - 1) ? "→" : "");
		const cell = add("cell");
		for (const [code, name] of here) {
			const t = document.createElement("div");
			t.className = "tile tinted" + (i === PLANNED ? " planned" : "");
			t.style.setProperty("--h", hue);
			t.innerHTML = `<span class="code">${code}</span>${name}`;
			cell.appendChild(t);
		}
	});
}
