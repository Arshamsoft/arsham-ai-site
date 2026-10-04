import Tile from './Tile';
import { serviceIcon } from '../lib/helpers';

export default function ServiceTile({ name }) {
  const Icon = serviceIcon(name);
  return (
    <Tile cut={16} className="h-full" faceClassName="p-6">
      <div className="flex h-full items-center gap-5">
        <span className="icon-cell">
          <Icon aria-hidden="true" />
        </span>
        <h3 className="text-lg font-bold leading-8">{name}</h3>
      </div>
    </Tile>
  );
}
