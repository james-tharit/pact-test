export async function productLabel(baseUrl, id) {
  const res = await fetch(`${baseUrl}/products/${id}`, {
    headers: { Accept: 'application/json' },
  });
  if (!res.ok) throw new Error(`product ${id}: HTTP ${res.status}`);
  const { id: productId, name } = await res.json();
  return `${productId}: ${name}`;
}
