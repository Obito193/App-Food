function sanitizeNumber(value) {
  return Number(String(value).replace(/[^0-9]/g, '')) || 0;
}

function formatCurrency(value) {
  const [integerPart, decimalPart] = String(value).split('.');
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return decimalPart ? `${formattedInteger},${decimalPart}đ` : `${formattedInteger}đ`;
}
module.exports = {sanitizeNumber, formatCurrency}