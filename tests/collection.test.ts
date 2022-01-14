import { Builder } from "../src/builder";

describe("integer primary key", () => {
  const field = new Builder().collection("example").primary_key("id", "integer").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is id", () => {
    expect(field.field).toBe("id");
  });

  it("type is integer", () => {
    expect(field.type).toBe("integer");
  });

  it("field is not null", () => {
    expect(field.schema.is_nullable).toBeFalsy();
  });

  it("is primary key", () => {
    expect(field.schema.is_primary_key).toBeTruthy();
  });

  it("is autoincrement", () => {
    expect(field.schema.has_auto_increment).toBeTruthy();
  });
});

describe("uuid primary key", () => {
  const field = new Builder().collection("example").primary_key("id", "uuid").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is id", () => {
    expect(field.field).toBe("id");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("field is not null", () => {
    expect(field.schema.is_nullable).toBeFalsy();
  });

  it("special contains uuid", () => {
    expect(field.meta.special).toContain("uuid");
  });

  it("is primary key", () => {
    expect(field.schema.is_primary_key).toBeTruthy();
  });
});

describe("string primary key", () => {
  const field = new Builder().collection("example").primary_key("id", "string").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is id", () => {
    expect(field.field).toBe("id");
  });

  it("type is string", () => {
    expect(field.type).toBe("string");
  });

  it("field is not null", () => {
    expect(field.schema.is_nullable).toBeFalsy();
  });

  it("is primary key", () => {
    expect(field.schema.is_primary_key).toBeTruthy();
  });
});

describe("user created field", () => {
  const builder = new Builder();
  const field = builder.collection("example").user_created("created_by").render();
  const { relations } = builder.render();
  const relation = relations.find(({ collection, field }) => collection === "example" && field === "created_by");

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_by", () => {
    expect(field.field).toBe("created_by");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains user-created", () => {
    expect(field.meta.special).toContain("user-created");
  });

  it("interface is select-dropdown-m2o", () => {
    expect(field.meta.interface).toBe("select-dropdown-m2o");
  });

  it("default interface template is {{avatar.$thumbnail}} {{first_name}} {{last_name}}", () => {
    expect(field.meta.options?.template).toBe("{{avatar.$thumbnail}} {{first_name}} {{last_name}}");
  });

  it("display is user", () => {
    expect(field.meta.display).toBe("user");
  });

  it("related with directus_users", () => {
    expect(relation?.related_collection).toBe("directus_users");
  });
});

describe("user updated field", () => {
  const builder = new Builder();
  const field = builder.collection("example").user_updated("updated_by").render();
  const { relations } = builder.render();
  const relation = relations.find(({ collection, field }) => collection === "example" && field === "updated_by");

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_by", () => {
    expect(field.field).toBe("updated_by");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains user-updated", () => {
    expect(field.meta.special).toContain("user-updated");
  });

  it("interface is select-dropdown-m2o", () => {
    expect(field.meta.interface).toBe("select-dropdown-m2o");
  });

  it("default interface template is {{avatar.$thumbnail}} {{first_name}} {{last_name}}", () => {
    expect(field.meta.options?.template).toBe("{{avatar.$thumbnail}} {{first_name}} {{last_name}}");
  });

  it("display is user", () => {
    expect(field.meta.display).toBe("user");
  });

  it("related with directus_users", () => {
    expect(relation?.related_collection).toBe("directus_users");
  });
});

describe("role created field", () => {
  const builder = new Builder();
  const field = builder.collection("example").role_created("created_by").render();
  const { relations } = builder.render();
  const relation = relations.find(({ collection, field }) => collection === "example" && field === "created_by");

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_by", () => {
    expect(field.field).toBe("created_by");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains role-created", () => {
    expect(field.meta.special).toContain("role-created");
  });

  it("interface is select-dropdown-m2o", () => {
    expect(field.meta.interface).toBe("select-dropdown-m2o");
  });

  it("default interface template is {{name}}", () => {
    expect(field.meta.options?.template).toBe("{{name}}");
  });

  it("display is related-values", () => {
    expect(field.meta.display).toBe("related-values");
  });

  it("default display template is {{name}}", () => {
    expect(field.meta.display_options?.template).toBe("{{name}}");
  });

  it("related with directus_roles", () => {
    expect(relation?.related_collection).toBe("directus_roles");
  });
});

describe("role updated field", () => {
  const builder = new Builder();
  const field = builder.collection("example").role_updated("updated_by").render();
  const { relations } = builder.render();
  const relation = relations.find(({ collection, field }) => collection === "example" && field === "updated_by");

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_by", () => {
    expect(field.field).toBe("updated_by");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains role-updated", () => {
    expect(field.meta.special).toContain("role-updated");
  });

  it("interface is select-dropdown-m2o", () => {
    expect(field.meta.interface).toBe("select-dropdown-m2o");
  });

  it("default interface template is {{name}}", () => {
    expect(field.meta.options?.template).toBe("{{name}}");
  });

  it("display is related-values", () => {
    expect(field.meta.display).toBe("related-values");
  });

  it("default display template is {{name}}", () => {
    expect(field.meta.display_options?.template).toBe("{{name}}");
  });

  it("related with directus_roles", () => {
    expect(relation?.related_collection).toBe("directus_roles");
  });
});

describe("date created field", () => {
  const field = new Builder().collection("example").date_created("created_at").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_at", () => {
    expect(field.field).toBe("created_at");
  });

  it("type is timestamp", () => {
    expect(field.type).toBe("timestamp");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("interface is datetime", () => {
    expect(field.meta.interface).toBe("datetime");
  });

  it("display is datetime", () => {
    expect(field.meta.display).toBe("datetime");
  });

  it("display options has relative", () => {
    expect(field.meta.display_options?.relative).toBeTruthy();
  });
});

describe("date updated field", () => {
  const field = new Builder().collection("example").date_updated("updated_at").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_at", () => {
    expect(field.field).toBe("updated_at");
  });

  it("type is timestamp", () => {
    expect(field.type).toBe("timestamp");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });

  it("interface is datetime", () => {
    expect(field.meta.interface).toBe("datetime");
  });

  it("display is datetime", () => {
    expect(field.meta.display).toBe("datetime");
  });

  it("display options has relative", () => {
    expect(field.meta.display_options?.relative).toBeTruthy();
  });
});

describe("string field", () => {
  const field = new Builder().collection("example").string("title").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is title", () => {
    expect(field.field).toBe("title");
  });

  it("type is string", () => {
    expect(field.type).toBe("string");
  });

  it("default max_length is 255", () => {
    expect(field.schema.max_length).toBe(255);
  });
});

describe("text field", () => {
  const field = new Builder().collection("example").text("description").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is description", () => {
    expect(field.field).toBe("description");
  });

  it("type is text", () => {
    expect(field.type).toBe("text");
  });
});

describe("boolean field", () => {
  const field = new Builder().collection("example").boolean("active").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is active", () => {
    expect(field.field).toBe("active");
  });

  it("type is boolean", () => {
    expect(field.type).toBe("boolean");
  });

  it("special contains boolean", () => {
    expect(field.meta.special).toContain("boolean");
  });
});

describe("integer field", () => {
  const field = new Builder().collection("example").integer("amount").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is amount", () => {
    expect(field.field).toBe("amount");
  });

  it("type is integer", () => {
    expect(field.type).toBe("integer");
  });

  it("default precision is 32", () => {
    expect(field.schema.numeric_precision).toBe(32);
  });
});

describe("bigInteger field", () => {
  const field = new Builder().collection("example").bigInteger("amount").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is amount", () => {
    expect(field.field).toBe("amount");
  });

  it("type is bigInteger", () => {
    expect(field.type).toBe("bigInteger");
  });

  it("default precision is 64", () => {
    expect(field.schema.numeric_precision).toBe(64);
  });
});

describe("float field", () => {
  const field = new Builder().collection("example").float("amount").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is amount", () => {
    expect(field.field).toBe("amount");
  });

  it("type is float", () => {
    expect(field.type).toBe("float");
  });

  it("default precision is 10", () => {
    expect(field.schema.numeric_precision).toBe(10);
  });

  it("default scale is 5", () => {
    expect(field.schema.numeric_scale).toBe(5);
  });
});

describe("decimal field", () => {
  const field = new Builder().collection("example").decimal("amount").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is amount", () => {
    expect(field.field).toBe("amount");
  });

  it("type is decimal", () => {
    expect(field.type).toBe("decimal");
  });

  it("default precision is 10", () => {
    expect(field.schema.numeric_precision).toBe(10);
  });

  it("default scale is 5", () => {
    expect(field.schema.numeric_scale).toBe(5);
  });
});

describe("datetime field", () => {
  const field = new Builder().collection("example").datetime("last_access").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_access", () => {
    expect(field.field).toBe("last_access");
  });

  it("type is datetime", () => {
    expect(field.type).toBe("datetime");
  });

  it("hasn't special", () => {
    expect(field.meta.special).toBeUndefined();
  });
});

describe("on create datetime field", () => {
  const field = new Builder().collection("example").datetime("created_at", true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_at", () => {
    expect(field.field).toBe("created_at");
  });

  it("type is datetime", () => {
    expect(field.type).toBe("datetime");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special not contains date-updated", () => {
    expect(field.meta.special).not.toContain("date-updated");
  });
});

describe("on updated datetime field", () => {
  const field = new Builder().collection("example").datetime("updated_at", false, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_at", () => {
    expect(field.field).toBe("updated_at");
  });

  it("type is datetime", () => {
    expect(field.type).toBe("datetime");
  });

  it("special not contains date-created", () => {
    expect(field.meta.special).not.toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("on created and on updated datetime field", () => {
  const field = new Builder().collection("example").datetime("last_write", true, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_write", () => {
    expect(field.field).toBe("last_write");
  });

  it("type is datetime", () => {
    expect(field.type).toBe("datetime");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("timestamp field", () => {
  const field = new Builder().collection("example").timestamp("last_access").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_access", () => {
    expect(field.field).toBe("last_access");
  });

  it("type is timestamp", () => {
    expect(field.type).toBe("timestamp");
  });

  it("hasn't special", () => {
    expect(field.meta.special).toBeUndefined();
  });
});

describe("on create timestamp field", () => {
  const field = new Builder().collection("example").timestamp("created_at", true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_at", () => {
    expect(field.field).toBe("created_at");
  });

  it("type is timestamp", () => {
    expect(field.type).toBe("timestamp");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special not contains date-updated", () => {
    expect(field.meta.special).not.toContain("date-updated");
  });
});

describe("on updated timestamp field", () => {
  const field = new Builder().collection("example").timestamp("updated_at", false, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_at", () => {
    expect(field.field).toBe("updated_at");
  });

  it("type is timestamp", () => {
    expect(field.type).toBe("timestamp");
  });

  it("special not contains date-created", () => {
    expect(field.meta.special).not.toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("on created and on updated timestamp field", () => {
  const field = new Builder().collection("example").timestamp("last_write", true, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_write", () => {
    expect(field.field).toBe("last_write");
  });

  it("type is timestamp", () => {
    expect(field.type).toBe("timestamp");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("date field", () => {
  const field = new Builder().collection("example").date("last_access").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_access", () => {
    expect(field.field).toBe("last_access");
  });

  it("type is date", () => {
    expect(field.type).toBe("date");
  });

  it("hasn't special", () => {
    expect(field.meta.special).toBeUndefined();
  });
});

describe("on create date field", () => {
  const field = new Builder().collection("example").date("created_at", true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_at", () => {
    expect(field.field).toBe("created_at");
  });

  it("type is date", () => {
    expect(field.type).toBe("date");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special not contains date-updated", () => {
    expect(field.meta.special).not.toContain("date-updated");
  });
});

describe("on updated date field", () => {
  const field = new Builder().collection("example").date("updated_at", false, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_at", () => {
    expect(field.field).toBe("updated_at");
  });

  it("type is date", () => {
    expect(field.type).toBe("date");
  });

  it("special not contains date-created", () => {
    expect(field.meta.special).not.toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("on created and on updated date field", () => {
  const field = new Builder().collection("example").date("last_write", true, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_write", () => {
    expect(field.field).toBe("last_write");
  });

  it("type is date", () => {
    expect(field.type).toBe("date");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("time field", () => {
  const field = new Builder().collection("example").time("last_access").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_access", () => {
    expect(field.field).toBe("last_access");
  });

  it("type is time", () => {
    expect(field.type).toBe("time");
  });

  it("hasn't special", () => {
    expect(field.meta.special).toBeUndefined();
  });
});

describe("on create time field", () => {
  const field = new Builder().collection("example").time("created_at", true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is created_at", () => {
    expect(field.field).toBe("created_at");
  });

  it("type is time", () => {
    expect(field.type).toBe("time");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special not contains date-updated", () => {
    expect(field.meta.special).not.toContain("date-updated");
  });
});

describe("on updated time field", () => {
  const field = new Builder().collection("example").time("updated_at", false, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is updated_at", () => {
    expect(field.field).toBe("updated_at");
  });

  it("type is time", () => {
    expect(field.type).toBe("time");
  });

  it("special not contains date-created", () => {
    expect(field.meta.special).not.toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("on created and on updated time field", () => {
  const field = new Builder().collection("example").time("last_write", true, true).render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is last_write", () => {
    expect(field.field).toBe("last_write");
  });

  it("type is time", () => {
    expect(field.type).toBe("time");
  });

  it("special contains date-created", () => {
    expect(field.meta.special).toContain("date-created");
  });

  it("special contains date-updated", () => {
    expect(field.meta.special).toContain("date-updated");
  });
});

describe("json field", () => {
  const field = new Builder().collection("example").json("data").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is data", () => {
    expect(field.field).toBe("data");
  });

  it("type is json", () => {
    expect(field.type).toBe("json");
  });

  it("special contains json", () => {
    expect(field.meta.special).toContain("json");
  });
});

describe("csv field", () => {
  const field = new Builder().collection("example").csv("tags").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is tags", () => {
    expect(field.field).toBe("tags");
  });

  it("type is csv", () => {
    expect(field.type).toBe("csv");
  });

  it("special contains csv", () => {
    expect(field.meta.special).toContain("csv");
  });
});

describe("uuid field", () => {
  const field = new Builder().collection("example").uuid("unique_id").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is unique_id", () => {
    expect(field.field).toBe("unique_id");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("hasn't special", () => {
    expect(field.meta.special).toBeUndefined();
  });
});

describe("generated uuid field", () => {
  const field = new Builder().collection("example").uuid("unique_id", "uuid").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is unique_id", () => {
    expect(field.field).toBe("unique_id");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains uuid", () => {
    expect(field.meta.special).toContain("uuid");
  });
});

describe("hash field", () => {
  const field = new Builder().collection("example").hash("password").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is password", () => {
    expect(field.field).toBe("password");
  });

  it("type is hash", () => {
    expect(field.type).toBe("hash");
  });

  it("special contains hash", () => {
    expect(field.meta.special).toContain("hash");
  });
});

describe("geometryPoint field", () => {
  const field = new Builder().collection("example").geometryPoint("geometry").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is geometry", () => {
    expect(field.field).toBe("geometry");
  });

  it("type is geometry.Point", () => {
    expect(field.type).toBe("geometry.Point");
  });
});

describe("geometryLineString field", () => {
  const field = new Builder().collection("example").geometryLineString("geometry").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is geometry", () => {
    expect(field.field).toBe("geometry");
  });

  it("type is geometry.LineString", () => {
    expect(field.type).toBe("geometry.LineString");
  });
});

describe("geometryPolygon field", () => {
  const field = new Builder().collection("example").geometryPolygon("geometry").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is geometry", () => {
    expect(field.field).toBe("geometry");
  });

  it("type is geometry.Polygon", () => {
    expect(field.type).toBe("geometry.Polygon");
  });
});

describe("geometryMultiPoint field", () => {
  const field = new Builder().collection("example").geometryMultiPoint("geometry").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is geometry", () => {
    expect(field.field).toBe("geometry");
  });

  it("type is geometry.MultiPoint", () => {
    expect(field.type).toBe("geometry.MultiPoint");
  });
});

describe("geometryMultiLineString field", () => {
  const field = new Builder().collection("example").geometryMultiLineString("geometry").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is geometry", () => {
    expect(field.field).toBe("geometry");
  });

  it("type is geometry.MultiLineString", () => {
    expect(field.type).toBe("geometry.MultiLineString");
  });
});

describe("geometryMultiPolygon field", () => {
  const field = new Builder().collection("example").geometryMultiPolygon("geometry").render();

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is geometry", () => {
    expect(field.field).toBe("geometry");
  });

  it("type is geometry.MultiPolygon", () => {
    expect(field.type).toBe("geometry.MultiPolygon");
  });
});

describe("file field", () => {
  const builder = new Builder();
  const field = builder.collection("example").file("pdf").render();
  const { relations } = builder.render();
  const relation = relations.find(({ collection, field }) => collection === "example" && field === "pdf");

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is pdf", () => {
    expect(field.field).toBe("pdf");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains file", () => {
    expect(field.meta.special).toContain("file");
  });

  it("interface is file", () => {
    expect(field.meta.interface).toBe("file");
  });

  it("display is file", () => {
    expect(field.meta.display).toBe("file");
  });

  it("related with directus_files", () => {
    expect(relation?.related_collection).toBe("directus_files");
  });
});

describe("image field", () => {
  const builder = new Builder();
  const field = builder.collection("example").image("avatar").render();
  const { relations } = builder.render();
  const relation = relations.find(({ collection, field }) => collection === "example" && field === "avatar");

  it("collection name is example", () => {
    expect(field.collection).toBe("example");
  });

  it("field name is avatar", () => {
    expect(field.field).toBe("avatar");
  });

  it("type is uuid", () => {
    expect(field.type).toBe("uuid");
  });

  it("special contains file", () => {
    expect(field.meta.special).toContain("file");
  });

  it("interface is file", () => {
    expect(field.meta.interface).toBe("file-image");
  });

  it("display is file", () => {
    expect(field.meta.display).toBe("image");
  });

  it("related with directus_files", () => {
    expect(relation?.related_collection).toBe("directus_files");
  });
});
