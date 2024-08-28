import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DeliveryModal from './DeliveryModal';

describe('DeliveryModal', () => {
  const mockOnClose = jest.fn();
  const mockOnSave = jest.fn();
  const mockSetDeliveredTime = jest.fn();
  const mockDelivery = {
    delivery_status: 'Assigned',
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders correctly when open', () => {
    const { getByText, getByLabelText } = render(
      <DeliveryModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        delivery={mockDelivery}
        setDeliveredTime={mockSetDeliveredTime}
      />
    );

    expect(getByText('Update Delivery')).toBeInTheDocument();
    expect(getByLabelText('Delivered Time:')).toBeInTheDocument();
    expect(getByLabelText('Status:')).toBeInTheDocument();
  });

  test('does not render when closed', () => {
    const { queryByText } = render(
      <DeliveryModal
        isOpen={false}
        onClose={mockOnClose}
        onSave={mockOnSave}
        delivery={mockDelivery}
        setDeliveredTime={mockSetDeliveredTime}
      />
    );

    expect(queryByText('Update Delivery')).not.toBeInTheDocument();
  });

  test('calls onClose when the overlay or cancel button is clicked', () => {
    const { getByText, getByRole } = render(
      <DeliveryModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        delivery={mockDelivery}
        setDeliveredTime={mockSetDeliveredTime}
      />
    );

    fireEvent.click(getByRole('button', { name: '×' }));
    fireEvent.click(getByText('Cancel'));

    expect(mockOnClose).toHaveBeenCalledTimes(2);
  });

  test('calls onSave with the correct arguments when save button is clicked', () => {
    const { getByRole } = render(
      <DeliveryModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        delivery={mockDelivery}
        setDeliveredTime={mockSetDeliveredTime}
      />
    );

    fireEvent.click(getByRole('button', { name: 'Save' }));

    expect(mockOnSave).toHaveBeenCalledWith(mockDelivery, 'Assigned');
  });

  test('updates status when the select input changes', () => {
    const { getByLabelText } = render(
      <DeliveryModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        delivery={mockDelivery}
        setDeliveredTime={mockSetDeliveredTime}
      />
    );

    fireEvent.change(getByLabelText('Status:'), { target: { value: 'Delivered' } });

    expect(getByLabelText('Status:')).toHaveValue('Delivered');
  });

  test('calls setDeliveredTime when the datetime-local input changes', () => {
    const { getByLabelText } = render(
      <DeliveryModal
        isOpen={true}
        onClose={mockOnClose}
        onSave={mockOnSave}
        delivery={mockDelivery}
        setDeliveredTime={mockSetDeliveredTime}
      />
    );

    fireEvent.change(getByLabelText('Delivered Time:'), { target: { value: '2024-08-28T12:00' } });

    expect(mockSetDeliveredTime).toHaveBeenCalledWith('2024-08-28T12:00');
  });
});
