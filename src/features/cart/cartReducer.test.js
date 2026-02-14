import { describe, it, expect } from 'vitest';
import { cartReducer, initialState } from './cartReducer';

describe('cartReducer', () => {
  it('toggle 액션으로 cartIds에 id를 추가한다', () => {
    const nextState = cartReducer(initialState, {
      type: 'toggle',
      payload: 1,
    });

    expect(nextState.cartIds).toEqual([1]);
  });

  it('이미 담긴 id는 toggle 액션으로 제거한다', () => {
    const prevState = { cartIds: [1] };

    const nextState = cartReducer(prevState, {
      type: 'toggle',
      payload: 1,
    });

    expect(nextState.cartIds).toEqual([]);
  });

  it('알 수 없는 action type이면 state를 그대로 반환한다', () => {
    const prevState = { cartIds: [1, 2] };

    const nextState = cartReducer(prevState, {
      type: 'UNKNOWN',
      payload: 1,
    });

    expect(nextState).toBe(prevState);
  });

  it('toggle은 기존 state 객체를 직접 변경하지 않는다(불변성)', () => {
    const prevState = { cartIds: [1] };

    const nextState = cartReducer(prevState, {
      type: 'toggle',
      payload: 2,
    });

    expect(prevState.cartIds).toEqual([1]);
    expect(nextState.cartIds).toEqual([1, 2]);
    expect(nextState).not.toBe(prevState);
  });

  it('여러 개의 id가 있을 때 중간 id를 제거한다', () => {
    const prevState = { cartIds: [1, 2, 3] };

    const nextState = cartReducer(prevState, {
      type: 'toggle',
      payload: 2,
    });

    expect(nextState.cartIds).toEqual([1, 3]); // filter 로직이 정확히 동작하는지 검증
  });

  it('문자열 id도 toggle로 제거할 수 있다', () => {
    const prevState = { cartIds: ['a', 'b'] };

    const nextState = cartReducer(prevState, {
      type: 'toggle',
      payload: 'b',
    });

    expect(nextState.cartIds).toEqual(['a']); // id 타입이 number가 아니어도 정상 동작해야 함
  });
});
