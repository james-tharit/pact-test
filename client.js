export async function getProduct(baseUrl, id) {
  const res = await fetch(`${baseUrl}/products/${id}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`product ${id}: HTTP ${res.status}`);
  return res.json();
}
