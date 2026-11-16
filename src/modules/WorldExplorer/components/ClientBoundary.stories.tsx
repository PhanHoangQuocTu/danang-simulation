import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Loading } from './ClientBoundary';
const meta = {
  title: 'Modules/WorldExplorer/Loading',
  component: Loading,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Loading>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Preparing: Story = {};
