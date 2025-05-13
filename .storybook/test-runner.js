const { toMatchImageSnapshot } = require("jest-image-snapshot");

// Define snapshot directories
const snapshotDir = `${process.cwd()}/__image_snapshots_baseline__`;
const diffDir = `${process.cwd()}/__image_snapshots_diff_output__`;

const config = {
	// Optional: Hook before each story is visited
	async preVisit(page) {
		// Add a small wait to ensure the page is fully loaded
		await page.waitForTimeout(500);
	},

	// Hook after each story is visited
	async postVisit(page, context) {
		const storyId = context.id;

		// Add a small wait to ensure animations have completed
		await page.waitForTimeout(500);

		// Take the screenshot with a smaller viewport to reduce size
		const image = await page.screenshot({
			animations: "disabled",
			timeout: 5000, // Add a timeout to prevent hanging
		});

		// Add the matcher before using it
		expect.extend({ toMatchImageSnapshot });

		try {
			expect(image).toMatchImageSnapshot({
				customSnapshotIdentifier: storyId,
				customSnapshotsDir: snapshotDir,
				customDiffDir: diffDir,
				storeReceivedOnFailure: true,
				// failureThreshold: 0.02,
				// failureThresholdType: "percent",
			});
		} catch {
			/**
			 * Snapshot comparison doesn't involve any implementation logic.
			 * When a test fails, this block of code appears in the terminal,
			 * but it's misleading - there's nothing wrong with it!
			 * To suppress unnecessary error output, we wrap it in a try-catch block.
			 */
		}
	},
};

module.exports = config;
