import { SubmitButton } from './SubmitButton';

export default {
  title: 'payments/register-card/SubmitButton',
  component: SubmitButton,
};

export const Enabled = {
  args: { disabled: false },
};

export const Disabled = {
  args: { disabled: true },
};
