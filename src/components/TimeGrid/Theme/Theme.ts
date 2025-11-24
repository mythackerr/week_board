import {
  globalPlugins,
  createPlugin,
  type PluginDef,
} from "@fullcalendar/core/index.js";
import { Theme as FCTheme } from "@fullcalendar/core/internal";
import "./Theme.css";
class Theme extends FCTheme {}

Theme.prototype.classes = {
  root: "root",
  table: "table",
  tableCellShaded: "table-active",
  buttonGroup: "btn-group",
  button: "btn btn-primary",
  buttonActive: "active",
  popover: "popover",
  popoverHeader: "popover-header",
  popoverContent: "popover-body",
};

const plugin = createPlugin({
  name: `theme`,
  themeClasses: {
    customTheme: Theme,
  },
}) as PluginDef;

globalPlugins.push(plugin);

export default plugin;
