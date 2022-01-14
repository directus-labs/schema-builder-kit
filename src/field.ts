import { Builder } from "./builder";
import { Collection } from "./collection";

export type Width = "half" | "half-left" | "half-right" | "full" | "fill";

export type FieldSpecial =
  | "boolean"
  | "uuid"
  | "json"
  | "csv"
  | "hash"
  | "conceal"
  | "user-created"
  | "user-updated"
  | "role-created"
  | "role-updated"
  | "date-created"
  | "date-updated"
  | "file"
  | "files"
  | "o2m"
  | "m2o"
  | "m2m"
  | "m2a";

export type FieldSchema = {
  max_length?: number;
  numeric_precision?: number;
  numeric_scale?: number;
  default_value?: any | null;
  is_nullable?: boolean;
  is_unique?: boolean;
  is_primary_key?: boolean;
  has_auto_increment?: boolean;
};

export type FieldMeta = {
  width?: Width;

  required?: boolean;
  readonly?: boolean;
  hidden?: boolean;

  special?: FieldSpecial[];

  interface?: string;
  options?: Record<string, any>;

  display?: string;
  display_options?: Record<string, any>;

  translations?: {
    language: string;
    translation: string;
  }[];
};

export class Field {
  builder: Builder;
  collection: Collection;
  name: string;
  type: string;
  schema: FieldSchema;
  meta: FieldMeta;

  constructor(
    builder: Builder,
    collection: Collection,
    name: string,
    type: string,
    schema?: FieldSchema,
    meta?: FieldMeta
  ) {
    this.builder = builder;
    this.collection = collection;
    this.name = name;
    this.type = type;
    this.schema = schema === undefined ? {} : schema;
    this.meta = meta === undefined ? {} : meta;
  }

  default(value: any) {
    this.schema.default_value = value;
    return this;
  }

  nullable(value: boolean = true) {
    this.schema.is_nullable = value;
    return this;
  }

  notNullable() {
    this.schema.is_nullable = false;
    return this;
  }

  pk(value: boolean = true) {
    this.schema.is_primary_key = value;
    return this;
  }

  autoincrement(value: boolean = true) {
    this.schema.has_auto_increment = value;
    return this;
  }

  unique(value: boolean = true) {
    this.schema.is_unique = value;
    return this;
  }

  special(...special: FieldSpecial[]) {
    this.meta.special = special;
    return this;
  }

  width(value: Width) {
    this.meta.width = value;
    return this;
  }

  required(value: boolean = true) {
    this.meta.required = value;
    return this;
  }

  readonly(value: boolean = true) {
    this.meta.readonly = value;
    return this;
  }

  hidden(value: boolean = true) {
    this.meta.hidden = value;
    return this;
  }

  interface(name: string, options?: Record<string, any>) {
    this.meta.interface = name;
    this.meta.options = options;
    return this;
  }

  display(name: string, options?: Record<string, any>) {
    this.meta.display = name;
    this.meta.display_options = options;
    return this;
  }

  translation(language: string, translation: string) {
    if (!Array.isArray(this.meta.translations)) {
      this.meta.translations = [];
    }

    this.meta.translations.push({ language, translation });
  }

  relation(related_collection: string | null = null) {
    return this.builder.relation(this.collection.name, this.name, related_collection);
  }

  render() {
    return {
      collection: this.collection.name,
      field: this.name,
      type: this.type,
      schema: this.schema,
      meta: this.meta
    };
  }
}
