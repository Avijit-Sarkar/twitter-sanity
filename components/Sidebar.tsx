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
import { useSession, signIn, signOut } from "next-auth/react";

function Sidebar() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col col-span-2 items-center px-4 md:items-start">
      <img className="m-3 h-10 w-10" src="/favicon.ico" alt="logo" />
      <SidebarRow Icon={HomeIcon} title="Home" />
      <SidebarRow Icon={HashtagIcon} title="Explore" />
      <SidebarRow Icon={BellIcon} title="Notification" />
      <SidebarRow Icon={EnvelopeIcon} title="Messages" />
      <SidebarRow Icon={BookmarkIcon} title="Bookmarks" />
      <SidebarRow Icon={InboxStackIcon} title="Lists" />
      <SidebarRow
        onClick={session ? signOut : signIn}
        Icon={UserIcon}
        title={session ? "Sign Out" : "Sign In"}
      />
      <SidebarRow Icon={EllipsisHorizontalCircleIcon} title="More" />
    </div>
  );
}

export default Sidebar;
