import React, { SVGProps } from "react";

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => {};
}

function SidebarRow({ Icon, title, onClick }: Props) {
  return (
    <div
      onClick={() => onClick?.()}
      className="flex items-center max-w-fit space-x-2 px-4 py-3 rounded-full hover:bg-gray-100 cursor-pointer transition-all duration-200 group"
    >
      <Icon className="h-6 w-6 " />
      <p className="hidden md:inline-flex text-base font-light lg:text-xl group-hover:text-twitter">
        {title}
      </p>
    </div>
  );
}

export default SidebarRow;
