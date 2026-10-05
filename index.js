console.log("Inicio de la aplicacion");
console.log(process.argv);

const args = process.argv.slice(2);

const API_BASE = "https://fakestoreapi.com";


async function getAllProducts() {
  const { ok, status, data } = await fetch(`${API_BASE}/products`, {
    method: "GET",
  });

  if (!ok) throw new Error(`GET /products failed (${status})`);
  return data;
}

async function getProductById(id) {
  const { ok, status, data } = await fetch(`${API_BASE}/products/${id}`, {
    method: "GET",
  });

  if (!ok) throw new Error(`GET /products/${id} failed (${status})`);
  return data;
}

async function createProduct({ title, price, category }) {
  const { ok, status, data } = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, price, category }),
  });

  if (!ok) throw new Error(`POST /products failed (${status})`);
  return data;
}

async function deleteProduct(id) {
  const { ok, status, data } = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
  });

  if (!ok) throw new Error(`DELETE /products/${id} failed (${status})`);
  return data;
}

async function main() {
  const [method, route, ...rest] = args;

  switch (method) {
    case "GET": {
      if (route === "products") {
        const products = await getAllProducts();
        console.log(products);
        return;
      }

      if (route && route.startsWith("products/")) {
        const id = route.split("/")[1];
        const product = await getProductById(id);
        console.log(product);
        return;
      }

      console.log("GET command incomplete or incorrect");
      return;
    }

    case "POST": {
      if (route !== "products") {
        console.log("POST command incomplete or incorrect");
        return;
      }

      const [title, priceRaw, category] = rest;
      const price = Number(priceRaw);
      if (!title || Number.isNaN(price) || !category) {
        console.log("Information missing or incorrect for creating a product. Please provide title, price, and category.");
        return;
      }

      const created = await createProduct({ title, price, category });
      console.log(created);
      console.log("product id:", created.id);
      return;
    }

    case "DELETE": {
      if (route && route.startsWith("products/")) {
        const id = route.split("/")[1];
        const result = await deleteProduct(id);
        console.log("Product deleted:", result);
        return;
      }

      console.log("DELETE command incomplete or incorrect");
      return;
    }

    default:
      console.log("Command incomplete or incorrect");
  }
}

main().catch((err) => console.error("Fatal:", err.message));