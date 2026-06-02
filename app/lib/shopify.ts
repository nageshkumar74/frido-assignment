const endpoint = `https://${process.env.SHOPIFY_STORE_DOMAIN}/api/2025-01/graphql.json`;

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