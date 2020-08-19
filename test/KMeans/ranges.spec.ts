import {KMeans} from "../../index";
import {expect} from "chai";

describe(
	"KMeans - extents",
	() => {
		it(
			"range extent one dimensions",
			() => {
				const k = new KMeans({k: 2, data: [1, 3, 4, 5, 3, 5, 19, 44]});
				expect(k.ranges).deep.eq([43]);
			},
		);

		it(
			"range extent 2 dimensions",
			() => {
				const k = new KMeans({k: 2, data: [[2, 5], [4, 7], [3, 1]]});
				expect(k.ranges).deep.eq([2, 6]);
			},
		);

		it(
			"range extent 3 dimensions",
			() => {
				const k = new KMeans({k: 2, data: [[2, 5, 60], [4, 7, 23], [3, 1, -89]]});
				expect(k.ranges).deep.eq([2, 6, 149]);
			},
		);
	},
);
