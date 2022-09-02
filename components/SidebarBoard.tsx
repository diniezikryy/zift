import React from "react";
import Link from "next/link";
import { useAuthHook } from "../context/AuthContext";

interface SidebarBoardProps {
  boardName: string;
  boardId: string;
}

const SidebarBoard = ({ boardName, boardId }: SidebarBoardProps) => {
  const { user } = useAuthHook();

  return (
    <Link
      href={{
        pathname: "/[user_id]/dashboard/[dashboard_id]",
        query: { user_id: user.uid, dashboard_id: boardId },
      }}
    >
      <a className="flex items-center py-4 pl-8 rounded-r-full hover:bg-grey-light-secondary group">
        <svg
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          className="mr-4 fill-grey-light-tertiary group-hover:fill-purple-primary"
        >
          <path
            d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
            className="fill-grey-light-tertiary group-hover:fill-purple-primary"
          />
        </svg>
        <span className="text-base font-semibold text-grey-light-tertiary group-hover:text-purple-primary">
          {boardName}
        </span>
      </a>
    </Link>
  );
};

export default SidebarBoard;
