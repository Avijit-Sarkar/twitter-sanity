/* eslint-disable @next/next/no-img-element */
import React from "react";
import {
  BellIcon,
  HashtagIcon,
  BookmarkIcon,
  InboxStackIcon,
  EllipsisHorizontalCircleIcon,
  EnvelopeIcon,
  UserIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import SidebarRow from "./SidebarRow";

function Sidebar() {
  return (
    <div className="flex flex-col">
      <img
        className="h-10 w-10"
        src="https://links.papareact.com/drq"
        alt="logo"
      />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notification" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={InboxStackIcon} title="Lists" />
      <SidebarRow Icon={UserIcon} title="Sign In" />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
}

export default Sidebar;
