import { FocusNode } from "@please/lrud";
import { Link, LinkProps, useNavigate } from "react-router-dom";

export interface FocusableLinkProps {
  focusKey?: string;
  focusClassName?: string;
}

export function FocusableLink({
  focusClassName,
  focusKey,
  to,
  ...props
}: LinkProps & FocusableLinkProps) {
  const navigate = useNavigate();

  return (
    <FocusNode
      onSelected={() => {
        navigate(to);
      }}
      focusId={focusKey}
      className="text-white/100"
      focusedClass={focusClassName}
    >
      <Link to={to} {...props} />
    </FocusNode>
  );
}
