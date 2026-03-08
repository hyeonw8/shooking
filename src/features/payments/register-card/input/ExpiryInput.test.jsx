import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { describe, expect, it, vi } from 'vitest';

import { ExpiryInput } from './ExpiryInput';

// controlled input 정석: 테스트용 wrapper로 value를 실제로 업데이트
function ExpiryInputWrapper({ onChangeSpy }) {
  const [value, setValue] = useState('');

  return (
    <ExpiryInput
      value={value}
      onChange={(digits) => {
        onChangeSpy(digits);
        setValue(digits); // 부모가 value 갱신
      }}
    />
  );
}

describe('ExpiryInput', () => {
  // 1.	입력 필터링 로직: onChange로 “숫자만/최대 4자리” 전달되는지
  // 2.	표시 포맷 로직: value prop에 따라 input에 "MM / YY" 형태로 보이는지

  it('숫자만 추출해 최대 4자리까지 onChange로 전달한다', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();

    render(<ExpiryInputWrapper onChangeSpy={handleChange} />);

    // input은 controlled라 화면 value는 고정일 수 있어도,
    const input = screen.getByLabelText('만료일');
    await user.type(input, 'ab12!!34zz56');

    // 최종적으로 1234까지는 반드시 한 번은 호출됨
    expect(handleChange).toHaveBeenCalledWith('1234');

    // (선택) 4자리 초과는 잘리는지도 같이 보려면:
    expect(handleChange).not.toHaveBeenCalledWith('12345');
  });

  it('0~2자리는 그대로 표시한다', () => {
    const { rerender } = render(<ExpiryInput value="1" onChange={() => {}} />);
    expect(screen.getByLabelText('만료일')).toHaveValue('1');

    rerender(<ExpiryInput value="12" onChange={() => {}} />);
    expect(screen.getByLabelText('만료일')).toHaveValue('12');
  });

  it('3~4자리는 "MM / YY" 형식으로 표시한다', () => {
    const { rerender } = render(
      <ExpiryInput value="123" onChange={() => {}} />
    );
    expect(screen.getByLabelText('만료일')).toHaveValue('12 / 3');

    rerender(<ExpiryInput value="1234" onChange={() => {}} />);
    expect(screen.getByLabelText('만료일')).toHaveValue('12 / 34');
  });

  it('value에 숫자 외 문자가 섞여도 표시값은 정상 포맷으로 나온다', () => {
    render(<ExpiryInput value="12 / 34" onChange={() => {}} />);
    expect(screen.getByLabelText('만료일')).toHaveValue('12 / 34');
  });
});
