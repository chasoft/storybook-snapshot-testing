// filepath: /mnt/744C19C64C198450/2025/projects/storybook-screenshot-testing/test-runner-jest.config.js
const { getJestConfig } = require("@storybook/test-runner");
// const { toMatchImageSnapshot } = require('jest-image-snapshot'); // This line is not needed here

module.exports = {
	// Import the default Jest configuration from the @storybook/test-runner
	...getJestConfig(),
	/** Add your own overrides below
	 * @see https://jestjs.io/docs/configuration
	 */
	// setupFilesAfterEnv: ["./jest.setup.ts"], // Removed as .storybook/test-runner.ts now handles snapshot setup
	testTimeout: 120000, // Increase timeout to 2 minutes
	transform: {
		// ...getJestConfig().transform, // spread in default transforms (already part of getJestConfig)
		"^.+\\.stories\\.tsx?$": "@storybook/test-runner/playwright/transform", // Use playwright transform for stories
		"^.+\\.[tj]sx?$": "babel-jest", // Ensure other JS/TS files are transformed by babel-jest if needed
	},
	// Add reporter to output failed test images
	reporters: [
		"default",
		[
			"jest-html-reporters",
			{
				publicPath: "./html-report",
				filename: "report.html",
				expand: true,
				// Add any other options here
			},
		],
	],
	// Add testEnvironmentOptions to configure Playwright
	testEnvironmentOptions: {
		"jest-playwright": {
			browsers: ["chromium"],
			launchOptions: {
				headless: true,
				timeout: 60000, // Browser launch timeout (ms)
			},
			contextOptions: {
				viewport: { width: 1280, height: 720 }, // Use a consistent viewport size
			},
		},
	},
};

// expect.extend({ toMatchImageSnapshot }); // This should be in jest.setup.ts, not here
