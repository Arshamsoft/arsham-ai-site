import { Link } from 'react-router-dom';

// variant: primary | ghost | light | icon
export default function Button({ to, href, variant = 'primary', icon = null, children, className = '', ...rest }) {
  const classes = `btn btn-${variant} ${className}`.trim();
  const inner = (
    <span className="btn-edge">
      <span className="btn-face">
        {icon}
        {children ? <span>{children}</span> : null}
      </span>
    </span>
  );

  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {inner}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...rest}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {inner}
    </button>
  );
}
