import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { PAYMENTS_ACTIONS } from '../shared/PaymentsReducer';
import { AddCardForm } from './AddCardForm';

// 테스트마다 바꿔 끼울 mock 입력값들
const mockValues = {
  cardNumber: '1234567812345678',
  expiry: '1230',
  cardOwner: 'HONG GILDONG',
  cvc: '123',
  passwordPrefix: '12',
};

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
    <button type="button" onClick={() => onChange(mockValues.cardNumber)}>
      mock-card-number
    </button>
  ),
}));

vi.mock('./input/ExpiryInput', () => ({
  ExpiryInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange(mockValues.expiry)}>
      mock-expiry
    </button>
  ),
}));

vi.mock('./input/CardOwnerInput', () => ({
  CardOwnerInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange(mockValues.cardOwner)}>
      mock-owner
    </button>
  ),
}));

vi.mock('./input/CvcInput', () => ({
  CvcInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange(mockValues.cvc)}>
      mock-cvc
    </button>
  ),
}));

vi.mock('./input/CardPasswordInput', () => ({
  CardPasswordInput: ({ onChange }) => (
    <button type="button" onClick={() => onChange(mockValues.passwordPrefix)}>
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

const fillAllFieldsByClick = () => {
  fireEvent.click(screen.getByRole('button', { name: 'mock-card-number' }));
  fireEvent.click(screen.getByRole('button', { name: 'mock-expiry' }));
  fireEvent.click(screen.getByRole('button', { name: 'mock-owner' }));
  fireEvent.click(screen.getByRole('button', { name: 'mock-cvc' }));
  fireEvent.click(screen.getByRole('button', { name: 'mock-password' }));
};

describe('AddCardForm', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 만료일 검증이 Date에 의존하므로 시간 고정
    vi.setSystemTime(new Date('2030-01-01T00:00:00.000Z'));

    mockDispatch.mockClear();
    mockNavigate.mockClear();
    
    // 정상 케이스 기본값
    mockValues.cardNumber = '1234567812345678';
    mockValues.expiry = '1230'; // 2030-01 기준, 12/30은 유효
    mockValues.cardOwner = 'HONG GILDONG';
    mockValues.cvc = '123';
    mockValues.passwordPrefix = '12';
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('초기에는 제출 버튼이 비활성화된다', () => {
    render(<AddCardForm />);

    const submit = screen.getByRole('button', { name: '제출' });
    expect(submit).toBeDisabled();
  });

  it('유효성 충족 후 제출하면 카드 추가 dispatch 후 payments로 이동한다', () => {
    render(<AddCardForm />);

    fillAllFieldsByClick();

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

  it('만료일이 과거면 제출 버튼이 비활성화되고 submit해도 dispatch되지 않는다', () => {
    // 현재를 2031년으로 두면 12/30은 과거(yy=30 < 31)
    vi.setSystemTime(new Date('2031-01-01T00:00:00.000Z'));
    mockValues.expiry = '1230';

    render(<AddCardForm />);

    fillAllFieldsByClick();

    const submit = screen.getByRole('button', { name: '제출' });
    expect(submit).toBeDisabled();

    fireEvent.click(submit);
    expect(mockDispatch).not.toHaveBeenCalled();
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('만료일 MM이 01~12 범위를 벗어나면 제출 버튼이 비활성화된다', () => {
    mockValues.expiry = '0030'; // mm=0
    render(<AddCardForm />);

    fillAllFieldsByClick();

    const submit = screen.getByRole('button', { name: '제출' });
    expect(submit).toBeDisabled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });

  it('카드 소유자명이 공백뿐이면 제출 버튼이 비활성화된다', () => {
    mockValues.cardOwner = '   '; // trim() 하면 빈 문자열
    render(<AddCardForm />);

    fillAllFieldsByClick();

    const submit = screen.getByRole('button', { name: '제출' });
    expect(submit).toBeDisabled();
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
