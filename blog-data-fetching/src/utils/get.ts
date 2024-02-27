export async function get(url: string) {
  const result = await fetch(url);

  if (!result.ok) {
    throw new Error("Unable to fetch data, something went wrong");
  }

  const data = await result.json();

  return data;
}
