const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;
console.log("Domain:", process.env.SHOPIFY_STORE_DOMAIN);
console.log(
  "Token:",
  process.env.SHOPIFY_STOREFRONT_TOKEN?.substring(0, 10)
);
export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        nodes {
          id
          title
          vendor

          featuredImage {
            url
          }

          variants(first: 10) {
            nodes {
              id
              title
              price {
                amount
              }
                compareAtPrice{
                 amount
                }
            }
          }
        }
      }
    }
  `;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token":
        process.env.SHOPIFY_STOREFRONT_TOKEN!,
    },
    body: JSON.stringify({ query }),
    cache: "no-store",
  });

 const data = await response.json();

// console.log("Response:", JSON.stringify(data, null, 2));

if (data.errors) {
  throw new Error(JSON.stringify(data.errors, null, 2));
}

return data.data.products.nodes;
}