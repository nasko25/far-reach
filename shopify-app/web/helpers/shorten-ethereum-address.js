export function shortenEthereumAddress(address, startLength = 6, endLength = 4) {
    if (address.length < startLength + endLength + 3) {
        return address; // Return original address if it's too short to shorten
    }
    const start = address.substring(0, startLength);
    const end = address.substring(address.length - endLength);
    return `${start}...${end}`;
}
  