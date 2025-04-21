export const getSlides = async () => {
  try {
    const response = await fetch("http://localhost:3001/api/slides", {
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch slides");
    }
    const slides = await response.json();
    return slides;
  } catch (error) {
    console.error("Error fetching slides:", error);
    return [];
  }
};
