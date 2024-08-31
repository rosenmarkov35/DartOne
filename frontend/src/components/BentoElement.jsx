import { Link } from "react-router-dom";


export default function BentoElement({ children, linkTo=null, ...props }) {
  return (
    <Link to={linkTo} {...props}>
      {children}
    </Link>
  );
}
