const ascii = require("ascii-table");
const c = require("chalk");
const path = require("path");
const { recursiveReadDirSync } = require("@utils/class/utils");
const glob = require("glob");

/**
 *
 * @param {import("@root/src/base/baseClient")} client
 * @param {string} directory directory containing the event files
 */
module.exports = async (client, directory) => {
	// client.logger.log(`Loading events...`);
	let success = 0;
	let failed = 0;

	let Evtable = new ascii(`Client Events`);

	Evtable.setHeading("event flle", "Load Status");
	// Evtable.setBorder('║', '=', '✥', '✥')
	Evtable.setBorder("║", "═", "✥", "🌟");
	Evtable.setAlign(0, ascii.CENTER);
	Evtable.setAlign(1, ascii.LEFT);
	Evtable.setAlign(2, ascii.LEFT);
	Evtable.setAlign(3, ascii.CENTER);

	glob("**/*.js", { cwd: path.join(__dirname, "../events") }, (err, files) => {
		if (err) {
			client.logger.error(err);
			return;
		}

		files.forEach((file) => {
			const fileName = path.basename(file);
			try {
				const event = require("../events/" + file);
				const eventName = event.name;

				if (event.once) {
					client.once(eventName, (...args) => event.execute(client, ...args));
				} else {
					client.on(eventName, (...args) => event.execute(client, ...args));
				}
				Evtable.addRow(fileName, "✅");

				delete require.cache[require.resolve(`../events/${file}`)];
				success += 1;
			} catch (ex) {
				failed += 1;
				Evtable.addRow(c.red(fileName), "❌");

				console.log(`loadEvent - ${file}`, ex);
			}
		});
	});
	console.log(Evtable.toString());

	client.logger.log(
		`Loaded ${
			success + failed
		} events. Success (${success}) Failed (${failed})`,
	);
};
