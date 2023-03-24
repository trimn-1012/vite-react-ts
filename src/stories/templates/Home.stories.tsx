import { ComponentStory, ComponentMeta } from '@storybook/react';

import HomeTemplate from '@/templates/Home';

export default {
  title: 'Templates/Home',
  component: HomeTemplate,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof HomeTemplate>;

const Template: ComponentStory<typeof HomeTemplate> = args => (
  <HomeTemplate {...args} />
);

export const Default = Template.bind({});
