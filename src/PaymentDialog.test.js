import { render, fireEvent, waitFor } from '@testing-library/react';
import PaymentDialog from './components/PaymentDialog';
import { mockPaymentApi } from './api/MockPaymentApi';

jest.mock('./api/MockPaymentApi');

describe('PaymentDialog Component', () => {
  it('handles successful payment', async () => {
    mockPaymentApi.mockResolvedValue({ status: 200, message: 'Payment successful' });
    const { getByText } = render(<PaymentDialog onClose={() => {}} />);
    
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Payment successful')).toBeInTheDocument();
    });
  });

  it('handles 400 Bad Request', async () => {
    mockPaymentApi.mockRejectedValue({ status: 400, message: 'Bad Request' });
    const { getByText } = render(<PaymentDialog onClose={() => {}} />);
    
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Bad Request')).toBeInTheDocument();
    });
  });

  it('handles 400 Bad Request', async () => {
    mockPaymentApi.mockRejectedValue({ status: 401, message: 'Unauthorized' });
    const { getByText } = render(<PaymentDialog onClose={() => {}} />);
    
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Unauthorized')).toBeInTheDocument();
    });
  });

  it('handles 400 Bad Request', async () => {
    mockPaymentApi.mockRejectedValue({ status: 500, message: 'Server Error' });
    const { getByText } = render(<PaymentDialog onClose={() => {}} />);
    
    const submitButton = getByText('Submit');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(getByText('Server Error')).toBeInTheDocument();
    });
  });
});
