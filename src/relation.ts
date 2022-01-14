import { Builder } from "./builder";

export type onDelete = "NO ACTION" | "SET NULL" | "SET DEFAULT" | "CASCADE" | "RESTRICT";
export type onUpdate = "NO ACTION";
export type onDeselect = "nullify" | "delete";

export type RelationSchema = {
  on_delete?: onDelete;
  on_update?: onUpdate;
};

export type RelationMeta = {
  one_field?: null | string;
  junction_field?: null | string;
  sort_field?: null | string;
  one_deselect_action?: onDeselect;
  one_collection_field?: null | string;
  one_allowed_collections?: null | string[];
};

export class Relation {
  builder: Builder;
  collection: string;
  field: string;
  related_collection: string | null;
  schema: RelationSchema;
  meta: RelationMeta;

  constructor(
    builder: Builder,
    collection: string,
    field: string,
    related_collection: string | null = null,
    schema?: RelationSchema,
    meta?: RelationMeta
  ) {
    this.builder = builder;
    this.collection = collection;
    this.field = field;
    this.related_collection = related_collection;
    this.schema = schema === undefined ? {} : schema;
    this.meta = meta === undefined ? {} : meta;
  }

  one_field(name: string) {
    this.meta.one_field = name;
    return this;
  }

  one_deselect_action(name: onDeselect) {
    this.meta.one_deselect_action = name;
    return this;
  }

  junction_field(name: string) {
    this.meta.junction_field = name;
    return this;
  }

  sort_field(name: string) {
    this.meta.sort_field = name;
    return this;
  }

  on_update(option: onUpdate) {
    this.schema.on_update = option;
    return this;
  }

  on_delete(option: onDelete) {
    this.schema.on_delete = option;
    return this;
  }

  render() {
    return {
      collection: this.collection,
      field: this.field,
      related_collection: this.related_collection,
      schema: this.schema,
      meta: this.meta
    };
  }
}
