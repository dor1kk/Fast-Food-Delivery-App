// PaymentForm.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PaymentForm from './PaymentForm';

describe('PaymentForm', () => {
  const mockOrder = {
    id: '12345',
    total_price: 100.00,
  };

  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({}),
      })
    );
  });

  test('renders the PaymentForm with initial data', () => {
    render(<PaymentForm order={mockOrder} onClose={mockOnClose} />);

    expect(screen.getByLabelText('Order ID:')).toHaveValue(mockOrder.id);
    expect(screen.getByLabelText('Amount:')).toHaveValue(mockOrder.total_price.toString());
    expect(screen.getByLabelText('Status:')).toHaveValue('Pending');
    expect(screen.getByText('Credit Card')).toBeInTheDocument();
  });

  test('allows changing the payment method', () => {
    render(<PaymentForm order={mockOrder} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('PayPal'));

    expect(screen.getByText('PayPal').closest('div')).toHaveClass('border-blue-500');
  });

  test('calls onClose after successful submission', async () => {
    render(<PaymentForm order={mockOrder} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Submit Payment'));

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:8080/payments/payment',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );

    await screen.findByText('Payment saved successfully!');
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('displays an error message on failed submission', async () => {
    global.fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(<PaymentForm order={mockOrder} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText('Submit Payment'));

    await screen.findByText('Failed to save payment. Please try again.');

    expect(mockOnClose).not.toHaveBeenCalled();
  });
});
