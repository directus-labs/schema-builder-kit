const STATUS_INTERFACE_CHOICES = [
  { text: "$t:published", value: "published" },
  { text: "$t:draft", value: "draft" },
  { text: "$t:archived", value: "archived" }
];

const STATUS_DISPLAY_CHOICES = [
  { background: "#00C897", value: "published" },
  { background: "#D3DAE4", value: "draft" },
  { background: "#F7971C", value: "archived" }
];

const TOOLBAR_FULL = [
  "bold",
  "italic",
  "underline",
  "removeformat",
  "customLink",
  "bullist",
  "numlist",
  "blockquote",
  "h1",
  "h2",
  "h3",
  "customImage",
  "customMedia",
  "hr",
  "code",
  "fullscreen",
  "aligncenter",
  "alignjustify",
  "alignleft",
  "alignnone",
  "alignright",
  "forecolor",
  "backcolor",
  "strikethrough",
  "subscript",
  "superscript",
  "unlink",
  "cut",
  "copy",
  "paste",
  "h4",
  "h5",
  "h6",
  "fontselect",
  "fontsizeselect",
  "indent",
  "outdent",
  "undo",
  "redo",
  "remove",
  "selectall",
  "table",
  "visualaid",
  "ltr rtl"
];

const TOOLBAR_BASIC = ["h1", "h2", "h3", "bold", "italic", "underline", "bullist", "numlist", "hr"];

module.exports = {
  STATUS_INTERFACE_CHOICES,
  STATUS_DISPLAY_CHOICES,
  TOOLBAR_FULL,
  TOOLBAR_BASIC
};
