import {KMeans} from "../../index";
import {expect} from "chai";

const data = [
	[6, 5],
	[9, 10],
	[10, 1],
	[5, 5],
	[7, 7],
	[4, 1],
	[10, 7],
	[6, 8],
	[10, 2],
	[9, 4],
	[2, 5],
	[9, 1],
	[10, 9],
	[2, 8],
	[1, 1],
	[6, 10],
	[3, 8],
	[2, 3],
	[7, 9],
	[7, 7],
	[3, 6],
	[5, 8],
	[7, 5],
	[10, 9],
	[10, 9],
];

describe(
	"KMeans - assignment",
	() => {
		const kmean = new KMeans({k: 2, data});
		kmean.run();
		const clusters = [];
		kmean.assignments.forEach((cluster) => {
			if (!clusters.includes(cluster)) {
				clusters.push(cluster);
			}
		});
		it(
			"should assign to valid cluster",
			() => {
				expect(clusters.length).eq(2);
			},
		);

		it(
			"should have iteration",
			() => {
				expect(kmean.iterations).gt(0);
			},
		);
	},
);
