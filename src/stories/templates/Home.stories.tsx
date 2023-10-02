import { StoryObj, Meta } from '@storybook/react';

import HomeTemplate from '@/templates/Home';

export default {
  title: 'Templates/Home',
  component: HomeTemplate,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof HomeTemplate>;

type Story = StoryObj<typeof HomeTemplate>;

export const Template: Story = {};
