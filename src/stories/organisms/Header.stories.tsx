import { StoryObj, Meta } from '@storybook/react';

import { Header } from '@/organisms/Header';

export default {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta<typeof Header>;

type Story = StoryObj<typeof Header>;

export const LoggedIn: Story = {
  args: {
    user: {
      id: 1,
      firstName: 'Terry',
      lastName: 'Medhurst',
      maidenName: 'Smitham',
      age: 50,
      gender: 'male',
      email: 'atuny0@sohu.com',
      phone: '+63 791 675 8914',
      username: 'atuny0',
      password: '9uQFF1Lh',
      birthDate: '2000-12-25',
      image: 'https://robohash.org/hicveldicta.png',
      bloodGroup: 'A−',
    },
  },
};

export const LoggedOut: Story = {};
