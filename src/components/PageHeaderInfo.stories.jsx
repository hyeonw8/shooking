import { PageHeaderInfo } from "./PageHeaderInfo";

export default {
  title: 'components/PageHeaderInfo',
  component: PageHeaderInfo,
};

export const Default = {
  args: {
    title: '장바구니',
    description: '현재 2개의 상품이 담겨있습니다.',
  },
};

export const WithoutDescription = {
  args: {
    title: '장바구니',
  },
};
