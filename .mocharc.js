module.exports = {
	require: ["ts-node/register", "tsconfig-paths/register"],
	spec: "test/**/*.spec.ts",
	watchFiles: ["**/*.ts"],
	recursive: true,
};
