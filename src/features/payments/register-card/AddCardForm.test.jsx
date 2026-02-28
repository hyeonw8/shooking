import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { PAYMENTS_ACTIONS } from '../shared/PaymentsReducer';
import { AddCardForm } from './AddCardForm';

// usePaymentsDispatch mock
const mockDispatch = vi.fn();

vi.mock('../shared/usePayments', () => ({
  usePaymentsDispatch: () => mockDispatch,
}));

// useNavigate mock
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 입력 컴포넌트들 mock
vi.mock('./input/CardNumberInput', () => ({
  CardNumberInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange('1234567812345678')}>
      mock-card-number
    </button>
  ),
}));

vi.mock('./input/ExpiryInput', () => ({
  ExpiryInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange('1230')}>
      mock-expiry
    </button>
  ),
}));

vi.mock('./input/CardOwnerInput', () => ({
  CardOwnerInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange('HONG GILDONG')}>
      mock-owner
    </button>
  ),
}));

vi.mock('./input/CvcInput', () => ({
  CvcInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange('123')}>
      mock-cvc
    </button>
  ),
}));

vi.mock('./input/CardPasswordInput', () => ({
  CardPasswordInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange('12')}>
      mock-password
    </button>
  ),
}));

vi.mock('./SubmitButton', () => ({
  SubmitButton: ({ disabled }) => (
    <button type="submit" disabled={disabled}>
      제출
    </button>
  ),
}));

describe('AddCardForm', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
    mockNavigate.mockClear();
  });

  it('초기에는 제출 버튼이 비활성화된다', () => {
    render(<AddCardForm />);

    const submit = screen.getByRole('button', { name: '제출' });
    expect(submit).toBeDisabled();
  });

  it('유효성 충족 후 제출하면 카드 추가 dispatch 후 payments로 이동한다', () => {
    render(<AddCardForm />);

    fireEvent.click(screen.getByRole('button', { name: 'mock-card-number' }));
    fireEvent.click(screen.getByRole('button', { name: 'mock-expiry' }));
    fireEvent.click(screen.getByRole('button', { name: 'mock-owner' }));
    fireEvent.click(screen.getByRole('button', { name: 'mock-cvc' }));
    fireEvent.click(screen.getByRole('button', { name: 'mock-password' }));

    const submit = screen.getByRole('button', { name: '제출' });
    expect(submit).not.toBeDisabled();

    fireEvent.click(submit);

    expect(mockDispatch).toHaveBeenCalledTimes(1);

    const dispatched = mockDispatch.mock.calls[0][0];
    expect(dispatched.type).toBe(PAYMENTS_ACTIONS.ADD_CARD);
    expect(dispatched.payload).toEqual(
      expect.objectContaining({
        cardNumber: '1234567812345678',
        expiry: '1230',
        cardOwner: 'HONG GILDONG',
        cvc: '123',
        passwordPrefix: '12',
      })
    );
    expect(dispatched.payload.id).toBeDefined();

    expect(mockNavigate).toHaveBeenCalledWith('/payments');
  });
});
