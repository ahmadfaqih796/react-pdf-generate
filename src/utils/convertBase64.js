export const decodeBase64 = (file, type) => {
  const binaryData = atob(file);
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }
  const blob = new Blob([bytes], { type: type });
  const url = URL.createObjectURL(blob);
  return url;
};
