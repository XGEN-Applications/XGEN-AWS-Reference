const response = (statusCode, data) => {
  return {
    statusCode,
    headers: { 'Content-Type': 'text/plain' },
    body: JSON.stringify(data)
  };
} 

module.exports = response;