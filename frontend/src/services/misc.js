export const shortenKey = (address) => {
  const firstPart = address.slice(0, 5);
  const lastPart = address.slice(-5);
  const shortenedAddress = firstPart + '...' + lastPart;
  return shortenedAddress;
};

export const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('Public key copied to clipboard');
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
    });
};
