function uniformInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function stdNorm() {
	const U = Math.sqrt(-2 * Math.log(Math.random()));
	const V = 2 * Math.PI * Math.random();
	return U * Math.cos(V);
}

function normal(mu, sigma) {
	return mu + sigma * stdNorm();
}

/**
* Compute rand number with normal distribution, restricted to interval [μ – σ, μ + σ].
* For quick implementation we use the fact that P(μ – 3σ < X < μ + 3σ) = 0.99...
*/
function truncNormal(mu, sigma) {
	return Math.max(mu - sigma, Math.min(mu + sigma, normal(mu, sigma / 3)));
}

function stdNorm2D() {
	const U = Math.sqrt(-2 * Math.log(Math.random()));
	const V = 2 * Math.PI * Math.random();
	return [
		U * Math.cos(V), 
		U * Math.sin(V)
	];
}

function normal2D(mu, sigma) {
	const stdNorm2DVar = stdNorm2D();
	return [
		mu[0] + sigma[0] * stdNorm2DVar[0], 
		mu[1] + sigma[1] * stdNorm2DVar[1]
	];
}

function truncNormal2D(mu, sigma) {
	const normal2DVar = normal2D(mu, [sigma[0] / 3, sigma[1] / 3]);
	return {
		x: Math.max(mu[0] - sigma[0], Math.min(mu[0] + sigma[0], normal2DVar[0])),
		y: Math.max(mu[1] - sigma[1], Math.min(mu[1] + sigma[1], normal2DVar[1]))
	};
}

function uniformInt2D(min, max) {
	return {
		x: uniformInt(min[0], max[0]),
		y: uniformInt(min[1], max[1]),
	};
}

export default {
	uniformInt,
	uniformInt2D, 
	truncNormal2D
};