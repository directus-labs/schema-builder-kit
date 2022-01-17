# Directus Schema Builder Kit

This repository is a proof of concept for creating data models for directus programmatically instead of with the admin UI.

## Quickstart Guide

1. Install packages: `make install` or `npm i && cd templates && npm i`
2. Build package: `make build` or `npm run build`
3. Run directus: `make docker-compose` or `docker-compose up -d`
4. Create .env file: `cd templates && cp example.env .env`
5. Run template:
    - Blog: `make blog-template` or `cd templates && npm run blog`


## Example

```javascript
import { build } from "directus-schema-builder-kit"

const model = build((builder) => {
  const products = builder
    .collection("products")
    .sort("order")
    .archive("status", "archived", "draft")
    .accountability("all")
    .translation("es-ES", "Productos", "producto", "productos");

  products
    .primary_key("id", "uuid")
    .hidden()
    .readonly()
    .translation("es-ES", "ID");

  products
    .date_created("created_at")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Fecha de creación");

  products
    .user_created("created_by")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Creado por");

  products
    .date_updated("updated_at")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Fecha de actualización");

  products
    .user_updated("updated_by")
    .hidden()
    .readonly()
    .width("half")
    .translation("es-ES", "Actualizado por");

  products
    .integer("order")
    .hidden()
    .width("full")
    .translation("es-ES", "Orden");

  products
    .string("status")
    .default("draft")
    .notNullable()
    .width("full")
    .interface("select-dropdown", {
      choices: [
        { text: "$t:published", value: "published" },
        { text: "$t:draft", value: "draft" },
        { text: "$t:archived", value: "archived" }
      ]
    })
    .display("labels", {
      showAsDot: true,
      choices: [
        { background: "#00C897", value: "published" },
        { background: "#D3DAE4", value: "draft" },
        { background: "#F7971C", value: "archived" }
      ]
    })
    .translation("es-ES", "Estado");

  products
    .string("title")
    .notNullable()
    .width("full")
    .interface("input", { trim: true })
    .display("formatted-value", { bold: true })
    .required()
    .translation("es-ES", "Título");

  products
    .string("slug")
    .notNullable()
    .unique()
    .width("full")
    .interface("input", { trim: true, slug: true })
    .display("formatted-value", { prefix: "https://example.com/", color: "#00C897" })
    .required()
    .translation("es-ES", "Página");

  products
    .decimal("price")
    .notNullable()
    .width("full")
    .interface("input", { step: 0.01, min: 0 })
    .display("formatted-value", { format: true, suffix: " €" })
    .required()
    .translation("es-ES", "Precio");
});

const baseURL = "http://localhost:8080";
const email = "admin@example.com";
const password = "secret";

model.fetch(baseURL, email, password).then(({ collections, relations }) => {
  console.log(JSON.stringify(collections, null, 2));
  console.log(JSON.stringify(relations, null, 2));
});
```
