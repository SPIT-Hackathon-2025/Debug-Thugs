export const getMaticPrice = async () => {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd');
    const data = await response.json();
    return data['matic-network'].usd;
  } catch (error) {
    console.error('Error fetching MATIC price:', error);
    return null;
  }
}; 