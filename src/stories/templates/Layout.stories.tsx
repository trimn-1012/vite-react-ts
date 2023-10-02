import { StoryObj, Meta } from '@storybook/react';
import { within, userEvent } from '@storybook/testing-library';

import Layout from '@/templates/Layout';

export default {
  title: 'Templates/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Layout>;

type Story = StoryObj<typeof Layout>;

export const Template: Story = {};

export const LoggedIn: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const loginButton = canvas.getByRole('button', { name: /Log in/i });
    await userEvent.click(loginButton);
  },
};
