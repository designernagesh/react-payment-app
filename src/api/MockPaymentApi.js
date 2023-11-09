export const mockPaymentApi = (paymentData) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate a successful response
        if (paymentData.to === 'mock@example.com' && paymentData.from && paymentData.amount > 0) {
          resolve({ status: 200, message: 'Payment successful' });
        }
        // Simulate a 400 Bad Request
        else if (paymentData.to === 'invalid-email' || paymentData.amount <= 0) {
          reject({ status: 400, message: 'Bad Request' });
        }
        // Simulate a 401 Unauthorized
        else if (paymentData.to === 'unauthorized@example.com') {
          reject({ status: 401, message: 'Unauthorized' });
        }
        // Simulate a 5XX Server Error
        else {
          reject({ status: 500, message: 'Server Error' });
        }
      }, 1000); // Simulating a 1-second delay
    });
  };
  