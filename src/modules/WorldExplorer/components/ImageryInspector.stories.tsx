import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { danangSourceRegistry } from '@/worlds/danang/data-sources';
import { DANANG_GEO_REFERENCE } from '@/worlds/danang/georeference';
import { ImageryInspector } from './ImageryInspector';
import '@/styles/world-explorer.css';

const meta = {
  title: 'Modules/WorldExplorer/Imagery',
  component: ImageryInspector,
  args: { registry: danangSourceRegistry, reference: DANANG_GEO_REFERENCE.reference },
  decorators: [
    (Story) => (
      <div className='world-explorer world-imagery-story'>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageryInspector>;
export default meta;
type Story = StoryObj<typeof meta>;
export const NoApprovedImagery: Story = {};
export const RejectedAsset: Story = { args: { asset: { invalid: true } } };
