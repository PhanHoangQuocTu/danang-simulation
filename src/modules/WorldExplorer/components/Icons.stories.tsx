import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Compass, MapIcon, Sun, Moon, Cloud, Keyboard, Gamepad2 } from './Icons';
const meta = { title: 'Modules/WorldExplorer/Icons', component: Compass } satisfies Meta<typeof Compass>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Catalog: Story = {
  render: () => (
    <div className='flex gap-4'>
      {[Compass, MapIcon, Sun, Moon, Cloud, Keyboard, Gamepad2].map((Icon, index) => (
        <Icon key={index} className='size-6' />
      ))}
    </div>
  ),
};
