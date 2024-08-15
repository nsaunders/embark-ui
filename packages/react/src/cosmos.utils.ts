export function controlLabel({
  text,
  type,
}: {
  text: string;
  type: "demo" | "global" | "prop";
}) {
  let prefix: string;
  switch (type) {
    case "demo":
      prefix = "🔍";
      break;
    case "global":
      prefix = "🌐";
      break;
    case "prop":
      prefix = "🏷️";
      break;
  }
  prefix += prefix ? " " : "";
  return `${prefix}${text}`;
}
