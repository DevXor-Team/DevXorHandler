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
module.exports = (client, directory) => {
	let Component_table = new ascii(`Client All Components`);

	Component_table.setHeading("Component flle", "IsEnabled", "Load Status");
	// Component_table.setBorder('║', '=', '✥', '✥')
	Component_table.setBorder("║", "═", "✥", "🌟");
	Component_table.setAlign(0, ascii.CENTER);
	Component_table.setAlign(1, ascii.LEFT);
	Component_table.setAlign(2, ascii.LEFT);
	Component_table.setAlign(3, ascii.CENTER);

	glob(
		"**/*.js",
		{ cwd: path.join(__dirname, "../ComponentsAction") },
		(err, files) => {
			if (err) {
				client.logger.error(err);
				return;
			}

			files.forEach((file) => {
				const fileName = path.basename(file);

				/**
				 * @type {import("@utils/types/baseComponent")}
				 */
				const Component = require(`../ComponentsAction/${file}`);

				try {
					if (typeof Component !== "object") return;
					client.loadComponent(Component);
					delete require.cache[require.resolve("../ComponentsAction/" + file)];

					if (Component.enabled) Component_table.addRow(fileName, "✅", "✅");
					else Component_table.addRow(fileName, "❌", "✅");
				} catch (ex) {
					if (Component.enabled)
						Component_table.addRow(c.red(fileName), "❌", "❌");

					client.logger.error(
						`Failed to load ${fileName} Reason: ${ex.message}`,
					);
				}
			});
		},
	);

	client.logger.success(`Loaded ${client.ComponentsAction.size} Components`);

	console.log(Component_table.toString());
};
