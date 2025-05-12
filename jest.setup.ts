import {
	toMatchImageSnapshot,
	type MatchImageSnapshotOptions,
} from "jest-image-snapshot";

// Configure default options for toMatchImageSnapshot
const customSnapshotsDir = `${process.cwd()}/__image_snapshots_baseline__`;

// Jest's 'expect' is global in setupFilesAfterEnv, so we can extend it directly.
expect.extend({
	toMatchImageSnapshot(received: unknown, options?: MatchImageSnapshotOptions) {
		// It's important to pass the context (`this`) to toMatchImageSnapshot
		// @ts-ignore - Ignore the type checking for this call
		return toMatchImageSnapshot.call(this, received, {
			customSnapshotsDir,
			...(options || {}),
		});
	},
});
