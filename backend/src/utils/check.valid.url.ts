export const isValidUrl = (urlString: string) => {
  try {
    return new URL(urlString);
  } catch (e) {
    return false;
  }
};
