import {KMeans} from "@lib";
import {expect} from "chai";

describe(
	"KMeans - extents",
	() => {
		it(
			"extent one dimensions",
			() => {
				const k = new KMeans({k: 2, data: [1, 3, 4, 5, 3, 5, 19, 44]});
				expect(k.extents).deep.eq([{min: 1, max: 44}]);
			},
		);

		it(
			"extent 2 dimensions",
			() => {
				const k = new KMeans({k: 2, data: [[2, 5], [4, 7], [3, 1]]});
				expect(k.extents).deep.eq([{min: 2, max: 4}, {min: 1, max: 7}]);
			},
		);

		it(
			"extent 3 dimensions",
			() => {
				const k = new KMeans({k: 2, data: [[2, 5, 60], [4, 7, 23], [3, 1, -89]]});
				expect(k.extents).deep.eq([
					{min: 2, max: 4},
					{min: 1, max: 7},
					{min: -89, max: 60},
				]);
			},
		);
	},
);
