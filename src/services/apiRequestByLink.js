const apiRequestByLink = async (link) => {
  try {
    const response = await fetch(link);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default apiRequestByLink;
