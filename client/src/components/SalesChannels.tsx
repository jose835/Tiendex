import React, { FC } from 'react';
import { Eye } from "../icons/icons";

interface SalesChannelProps {
  Icon: React.ElementType;
  text: string;
  showEyeIcon?: boolean;
}

const SalesChannel: FC<SalesChannelProps> = ({ Icon, text, showEyeIcon = false }) => (
  <div className="group flex items-center justify-between w-full hover:bg-white/30 mb-2 cursor-pointer py-1 px-3 rounded-lg">
    <div className="flex">
      <Icon />
      <h3 className="text-black font-semibold text-sm ml-3">{text}</h3>
    </div>
    {showEyeIcon && (
      <div className="hover:bg-graying/20 rounded-md px-[1px] hidden group-hover:block">
        <Eye />
      </div>
    )}
  </div>
);

export default SalesChannel;
