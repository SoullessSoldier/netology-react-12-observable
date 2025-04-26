export const searchSkills = async (search) => {
  const params = new URLSearchParams({query: search});
  const response = await fetch(`${import.meta.env.VITE_APP_SEARCH_URL}?${params}`, {})
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}