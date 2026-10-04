import Tile from './Tile';
import { StarMark } from './Star';

// پیام خالی بودن یا خطا، همراه با کاری که کاربر می‌تونه انجام بده
export default function StateMessage({ title, text, action = null }) {
  return (
    <Tile cut={26} faceClassName="flex flex-col items-start gap-5 p-8 md:flex-row md:items-center md:p-10">
      <StarMark size={44} className="flex-none text-saffron" />
      <div className="flex-1">
        <p className="font-display text-xl font-bold leading-9">{title}</p>
        {text ? <p className="mt-1 leading-8 text-muted">{text}</p> : null}
      </div>
      {action}
    </Tile>
  );
}
