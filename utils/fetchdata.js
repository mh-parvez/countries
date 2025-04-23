async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return null;
  }
}

export default fetchData;
