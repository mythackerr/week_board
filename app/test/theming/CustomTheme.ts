import {
  globalPlugins,
  createPlugin,
  type PluginDef,
} from "@fullcalendar/core/index.js";
import { Theme } from "@fullcalendar/core/internal";
import "./CustomTheme.css";
class CustomTheme extends Theme {}

CustomTheme.prototype.classes = {
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
  name: `customTheme`,
  themeClasses: {
    customTheme: CustomTheme,
  },
}) as PluginDef;

globalPlugins.push(plugin);

export default plugin;
