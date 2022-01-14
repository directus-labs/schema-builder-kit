import { Builder } from "./builder";

import { Field, FieldSchema, FieldMeta, FieldSpecial } from "./field";
import { onDelete, onDeselect } from "./relation";

export type CollectionAccountability = "all" | "activity" | null;

export type CollectionSchema = {};

export type CollectionMeta = {
  icon?: string;
  color?: string;
  sort_field?: string;
  archive_field?: string;
  archive_value?: string | null;
  unarchive_value?: string | null;
  archive_app_filter?: boolean;
  accountability?: CollectionAccountability;
  hidden?: boolean;
  singleton?: boolean;

  translations?: {
    language: string;
    translation: string;
    singular?: string;
    plural?: string;
  }[];
};

function date_special(field: Field, on_create: boolean, on_updated: boolean) {
  const special: FieldSpecial[] = [];

  if (on_create) {
    special.push("date-created");
  }

  if (on_updated) {
    special.push("date-updated");
  }

  if (special.length) {
    field.special(...special);
  }

  return field;
}

export class Collection {
  builder: Builder;
  name: string;
  schema: CollectionSchema;
  meta: CollectionMeta;
  fields: Field[];

  constructor(builder: Builder, name: string, schema?: CollectionSchema, meta?: CollectionMeta, fields?: Field[]) {
    this.builder = builder;
    this.name = name;
    this.schema = schema === undefined ? {} : schema;
    this.meta = meta === undefined ? {} : meta;
    this.fields = fields === undefined ? [] : fields;
  }

  findField(field: string) {
    return this.fields.find(({ name }) => name === field);
  }

  findPrimaryKey() {
    return this.fields.find((field) => field.schema.is_primary_key === true);
  }

  hidden(value: boolean = true) {
    this.meta.hidden = value;
    return this;
  }

  singleton(value: boolean = true) {
    this.meta.singleton = value;
    return this;
  }

  icon(value: string) {
    this.meta.icon = value;
    return this;
  }

  color(value: string) {
    this.meta.color = value;
    return this;
  }

  sort(field: string) {
    this.meta.sort_field = field;
    return this;
  }

  archive(
    field: string,
    archive: string | null = "archived",
    unarchive: string | null = "draft",
    filter: boolean = true
  ) {
    this.meta.archive_field = field;
    this.meta.archive_value = archive;
    this.meta.unarchive_value = unarchive;
    this.meta.archive_app_filter = filter;
    return this;
  }

  accountability(value: CollectionAccountability) {
    this.meta.accountability = value;
    return this;
  }

  translation(language: string, translation: string, singular?: string, plural?: string) {
    if (!Array.isArray(this.meta.translations)) {
      this.meta.translations = [];
    }

    this.meta.translations.push({ language, translation, singular, plural });
    return this;
  }

  field(name: string, type: string, schema?: FieldSchema, meta?: FieldMeta) {
    const field = new Field(this.builder, this, name, type, schema, meta);
    this.fields.push(field);
    return field;
  }

  relation(field: string, related_collection: string | null = null) {
    this.builder.relation(this.name, field, related_collection);
    return this;
  }

  primary_key(name: string, type: "integer" | "uuid" | "string") {
    const field = this.field(name, type).notNullable().pk();
    if (type === "integer") {
      return field.autoincrement();
    } else if (type === "uuid") {
      return field.special("uuid");
    } else {
      return field;
    }
  }

  user_created(
    name: string,
    options: {
      template: string;
      on_delete: onDelete;
    } = { template: "{{avatar.$thumbnail}} {{first_name}} {{last_name}}", on_delete: "SET NULL" }
  ) {
    const { template, on_delete } = options;
    const field = this.uuid(name, "user").interface("select-dropdown-m2o", { template }).display("user");

    field.relation("directus_users").on_delete(on_delete);

    return field;
  }

  role_created(
    name: string,
    options: {
      template: string;
      on_delete: onDelete;
    } = { template: "{{name}}", on_delete: "SET NULL" }
  ) {
    const { template, on_delete } = options;
    const field = this.uuid(name, "role")
      .interface("select-dropdown-m2o", { template })
      .display("related-values", { template });

    field.relation("directus_roles").on_delete(on_delete);

    return field;
  }

  user_updated(
    name: string,
    options: {
      template: string;
      on_delete: onDelete;
    } = { template: "{{avatar.$thumbnail}} {{first_name}} {{last_name}}", on_delete: "SET NULL" }
  ) {
    const { template, on_delete } = options;
    const field = this.uuid(name, null, "user").interface("select-dropdown-m2o", { template }).display("user");

    field.relation("directus_users").on_delete("SET NULL");

    return field;
  }

  role_updated(
    name: string,
    options: {
      template: string;
      on_delete: onDelete;
    } = { template: "{{name}}", on_delete: "SET NULL" }
  ) {
    const { template, on_delete } = options;
    const field = this.uuid(name, null, "role")
      .interface("select-dropdown-m2o", { template })
      .display("related-values", { template });

    field.relation("directus_roles").on_delete(on_delete);

    return field;
  }

  date_created(name: string) {
    return this.timestamp(name, true).interface("datetime").display("datetime", { relative: true });
  }

  date_updated(name: string) {
    return this.timestamp(name, false, true).interface("datetime").display("datetime", { relative: true });
  }

  string(name: string, max_length: number = 255) {
    return this.field(name, "string", { max_length: max_length });
  }

  text(name: string) {
    return this.field(name, "text");
  }

  boolean(name: string) {
    return this.field(name, "boolean").special("boolean");
  }

  integer(name: string, precision: number = 32) {
    return this.field(name, "integer", { numeric_precision: precision });
  }

  bigInteger(name: string, precision: number = 64) {
    return this.field(name, "bigInteger", { numeric_precision: precision });
  }

  float(name: string, precision: number = 10, scale: number = 5) {
    return this.field(name, "float", {
      numeric_precision: precision,
      numeric_scale: scale
    });
  }

  decimal(name: string, precision: number = 10, scale: number = 5) {
    return this.field(name, "decimal", {
      numeric_precision: precision,
      numeric_scale: scale
    });
  }

  datetime(name: string, on_create: boolean = false, on_updated: boolean = false) {
    return date_special(this.field(name, "datetime"), on_create, on_updated);
  }

  timestamp(name: string, on_create: boolean = false, on_updated: boolean = false) {
    return date_special(this.field(name, "timestamp"), on_create, on_updated);
  }

  date(name: string, on_create: boolean = false, on_updated: boolean = false) {
    return date_special(this.field(name, "date"), on_create, on_updated);
  }

  time(name: string, on_create: boolean = false, on_updated: boolean = false) {
    return date_special(this.field(name, "time"), on_create, on_updated);
  }

  json(name: string) {
    return this.field(name, "json").special("json");
  }

  csv(name: string) {
    return this.field(name, "csv").special("csv");
  }

  uuid(name: string, on_create: "uuid" | "user" | "role" | null = null, on_update: "user" | "role" | null = null) {
    const field = this.field(name, "uuid");

    const special: FieldSpecial[] = [];

    if (on_create) {
      const options = {
        uuid: "uuid",
        user: "user-created",
        role: "role-created"
      };
      const value = options[on_create] as FieldSpecial;
      special.push(value);
    }

    if (on_update) {
      const options = {
        user: "user-updated",
        role: "role-updated"
      };
      const value = options[on_update] as FieldSpecial;
      special.push(value);
    }

    if (special.length) {
      field.special(...special);
    }

    return field;
  }

  hash(name: string) {
    return this.field(name, "hash").special("hash");
  }

  geometryPoint(name: string) {
    return this.field(name, "geometry.Point");
  }

  geometryLineString(name: string) {
    return this.field(name, "geometry.LineString");
  }

  geometryPolygon(name: string) {
    return this.field(name, "geometry.Polygon");
  }

  geometryMultiPoint(name: string) {
    return this.field(name, "geometry.MultiPoint");
  }

  geometryMultiLineString(name: string) {
    return this.field(name, "geometry.MultiLineString");
  }

  geometryMultiPolygon(name: string) {
    return this.field(name, "geometry.MultiPolygon");
  }

  file(name: string) {
    const field = this.field(name, "uuid").special("file").interface("file").display("file");

    field.relation("directus_files").on_delete("SET NULL");

    return field;
  }

  image(name: string) {
    const field = this.field(name, "uuid").special("file").interface("file-image").display("image");

    field.relation("directus_files").on_delete("SET NULL");

    return field;
  }

  foreign(
    name: string,
    related_collection: string,
    related_field: string | null,
    options: {
      template?: string;
      sort_field?: string;
      junction_field?: string;
      one_deselect_action?: onDeselect;
      on_delete?: onDelete;
    }
  ) {
    const collection = this.builder.findCollection(related_collection);

    if (!collection) {
      throw Error("Collection not exists");
    }

    const primary_key = collection.findPrimaryKey();

    if (!primary_key) {
      throw Error("Collection hasn't primary key");
    }

    const { template } = options;

    const field = this.field(name, primary_key.type)
      .interface("select-dropdown-m2o", { template })
      .display("related-values", { template });

    const { sort_field, junction_field, one_deselect_action, on_delete } = options;
    const relation = field.relation(related_collection);

    if (related_field) {
      relation.one_field(related_field);
    }

    if (junction_field) {
      relation.junction_field(junction_field);
    }

    if (sort_field) {
      relation.sort_field(sort_field);
    }

    if (one_deselect_action) {
      relation.one_deselect_action(one_deselect_action);
    }

    if (on_delete) {
      relation.on_delete(on_delete);
    }

    return field;
  }

  o2m(name: string, options: { template?: string }) {
    const { template } = options;
    return this.field(name, "alias")
      .special("o2m")
      .interface("list-o2m", { template })
      .display("related-values", { template });
  }

  m2m(name: string, options: { template?: string }) {
    const { template } = options;
    return this.field(name, "alias")
      .special("m2m")
      .interface("list-m2m", { template })
      .display("related-values", { template });
  }

  render() {
    return {
      collection: this.name,
      schema: this.schema,
      meta: this.meta,
      fields: this.fields.map((field) => field.render())
    };
  }
}
