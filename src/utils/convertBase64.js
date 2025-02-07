export const decodeBase64 = (file, type) => {
  const binaryData = atob(file);
  console.log("wwwww", binaryData);
  const bytes = new Uint8Array(binaryData.length);
  for (let i = 0; i < binaryData.length; i++) {
    bytes[i] = binaryData.charCodeAt(i);
  }
  console.log("rrrrr", bytes);
  const blob = new Blob([bytes], { type: type });
  const url = URL.createObjectURL(blob);
  console.log("333333", blob, url);
  return url;
};
