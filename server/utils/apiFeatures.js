function escapeRegExp(string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

class APIFeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ["page", "sort", "limit", "fields", "exclude"];
		excludedFields.forEach((el) => delete queryObj[el]);

		if (this.queryString.exclude) {
			this.handleExclude();
		}

		// 1B) Advanced filtering
		let queryStr = JSON.stringify(queryObj);
		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));

		return this;
	}

	handleExclude() {
		const excludeItems = this.queryString.exclude
			.split(",")
			.map((item) => item.trim().toLowerCase())
			.filter((item) => item.length > 0);

		if (excludeItems.length > 0) {
			// Since ingredients is [String], we need to check each string in the array
			// Use $and to ensure ALL excluded ingredients are absent
			const excludeConditions = excludeItems.map((ingredient) => ({
				ingredients: {
					$not: {
						$elemMatch: {
							$regex: escapeRegExp(ingredient),
							$options: "i",
						},
					},
				},
			}));

			this.query = this.query.find({
				$and: excludeConditions,
			});
		}

		return this;
	}

	sorting() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		} else {
			this.query = this.query.sort("-createdAt");
		}

		return this;
	}
	limiting() {
		if (this.queryString.fields) {
			const fields = this.queryString.fields.split(",").join(" ");
			this.query = this.query.select(fields);
		} else {
			this.query = this.query.select("-__v");
		}

		return this;
	}
	paginating() {
		const page = this.queryString.page * 1 || 1;
		const limit = this.queryString.limit * 1 || 100;
		const skip = (page - 1) * limit;

		this.query = this.query.skip(skip).limit(limit);

		return this;
	}
}
module.exports = APIFeatures;
