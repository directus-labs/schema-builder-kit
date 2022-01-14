import { Builder } from "./builder";

export function build(callback: (builder: Builder) => void) {
  const builder = new Builder();

  callback(builder);

  return builder;
}
