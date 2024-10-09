import { twMerge } from "tailwind-merge";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const CenterContent = ({ children, className }: Props) => {
  return (
    <div className={twMerge(`flex items-center justify-center h-screen`, className)}>
      {children}
    </div>
  );
};

export default CenterContent;
