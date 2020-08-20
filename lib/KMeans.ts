type ExtentType = {
	min: number;
	max: number;
};

interface KMeansOptions {
	/**
   * number cluster of centeroids
   */
	k: number;

	/**
   * data array with points
   */
	data: Array<unknown>;
}

export class KMeans {
	readonly k: number;
	data: Array<unknown>;

	/**
   * Keeps track of which cluster centroid index each data point belongs to.
   */
	assignments = [];

	/**
   * the extents (min, max) for each dimensions.
   */
	extents: Array<ExtentType> = [];

	means: Array<Array<number>> = [];

	/**
   * range of each extent.
   */
	ranges: Array<number> = [];

	/**
   * Keep track of number of times centroids move.
   */
	iterations = 0;

	constructor(options: KMeansOptions) {
		this.k = options.k;
		this.data = options.data;
		this.extents = this.getExtent();
		this.ranges = this.getExtentRanges();
		this.means = this.getMeans();
	}

	/**
   * get the minimum and maximum value for each dimension in the data array
   * 
   * ```
   * const kmeans = new KMeans({k: 2, data: [[2, 5, 60], [4, 7, 23], [3, 1, -89]]});
   * console.log(kmeans.extents);
   * // [{min: 2, max: 4}, {min: 1, max: 7}, {min: -89, max: 60}]
   * ```
   */
	private getExtent() {
		const extents = [];
		for (let i = 0; i < this.data.length; i++) {
			let point = this.data[i];
			const extent = {min: Infinity, max: -Infinity};

			// multidimensional array
			if (Array.isArray(point)) {
				for (let j = 0; j < point.length; j++) {
					if (!extents[j]) {
						extents[j] = {...extent};
					}

					if (point[j] < extents[j].min) {
						extents[j].min = point[j];
					}

					if (point[j] > extents[j].max) {
						extents[j].max = point[j];
					}
				}
			} else {
				if (typeof point !== "number") {
					throw new TypeError("data should be array of number");
				}

				if (!extents[0]) {
					extents[0] = extent;
				}

				if (point < extents[0].min) {
					extents[0].min = point;
				}

				if (point > extents[0].max) {
					extents[0].max = point;
				}
			}
		}
		return extents;
	}

	/**
   * return the range of each extent
   * ```
   * const kmeans = new KMeans({k: 2, data: [[2, 5, 60], [4, 7, 23], [3, 1, -89]]});
   * console.log(kmeans.extents);
   * // [{min: 2, max: 4}, {min: 1, max: 7}, {min: -89, max: 60}]
   * 
   * console.log(kmeans.ranges);
   * // [2, 6, 149]
   * ```
   */
	private getExtentRanges() {
		const ranges = [];

		this.extents.forEach((extent) => {
			ranges.push(extent.max - extent.min);
		});

		return ranges;
	}

	/**
   * returns and array of randomly generated cluster centroid points
   * bounds based on the data dimension ranges
   */
	private getMeans() {
		const means = [];
		let n = this.k;

		while (n--) {
			const mean = [];

			for (let i = 0; i < this.extents.length; i++) {
				mean[i] = this.extents[i].min + Math.random() * this.ranges[i];
			}

			means.push(mean);
		}
		return means;
	}

	/**
   * calculate distance on each point to the the mean based on Euclidean distance
   * assign each point to the closest mean point
   * 
   * https://en.wikipedia.org/wiki/Euclidean_distance
   */
	private getDataPoints() {
		const assignments = [];

		for (let i = 0; i < this.data.length; i++) {
			// d(p, q)[]
			const distances = [];
			const point = this.data[i];

			for (let j = 0; j < this.means.length; j++) {
				const mean = this.means[j];
				let sum = 0;

				let difference = 0;
				if (Array.isArray(point)) {
					for (let dim = 0; dim < point.length; dim++) {
						// diff = (pn - qn)
						difference = point[dim] - mean[dim];
					}
				} else {
					// diff = (pn - qn)
					difference = (point as number) - mean[0];
				}
				// diff = (diff)^2
				difference = Math.pow(difference, 2);

				sum += difference;
				distances[j] = Math.sqrt(sum);
			}

			// get the closest centroid
			const smallestDistance = Math.min.apply(null, distances);
			assignments[i] = distances.indexOf(smallestDistance);
		}

		return assignments;
	}

	run() {
		this.iterations += 1;

		// reassign point to nearest cluster centroids.
		this.assignments = this.getDataPoints();
	}
}
