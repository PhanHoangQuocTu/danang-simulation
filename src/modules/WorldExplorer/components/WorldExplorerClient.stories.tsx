import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import WorldExplorerClient from './WorldExplorerClient';
const meta = {
  title: 'Modules/WorldExplorer/Runtime',
  component: WorldExplorerClient,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof WorldExplorerClient>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Interactive: Story = {};
