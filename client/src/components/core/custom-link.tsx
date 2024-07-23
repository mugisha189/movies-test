import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AddIcon, BackIcon, SearchIcon } from "./icons";

interface CustomLinkProps {
  title: string;
  title2?: string;
  href?: string;
  search?: boolean;
  add?: boolean;
  body?: string;
  onClick?: () => void;
}

const CustomLink: React.FC<CustomLinkProps> = ({
  title,
  title2,
  href,
  search = false,
  add = false,
  body,
  onClick,
}) => {
  const [expanded, setExpanded] = useState(false);

  const handleBackIconClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="my-2 py-2 hover:bg-background px-2 rounded-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold">
          {body && title2 && onClick && (
            <button
              onClick={handleBackIconClick}
              className={`transition-all duration-200 ${
                !expanded ? "rotate-180" : "-rotate-90"
              }`}
            >
              <BackIcon />
            </button>
          )}
          {href ? <Link to={href}>{title}</Link> : <div>{title}</div>}
        </div>
        <div className="flex items-center gap-2">
          {search && <SearchIcon />}
          {add && <AddIcon />}
        </div>
      </div>
      {expanded && (
        <div className="p-2 rounded-md bg-background text-sm mt-2">
          <div>{body}</div>
          <button
            className="mt-2 px-4 w-full py-1  border text-white rounded-md font-semibold"
            onClick={onClick}
          >
            {title2}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomLink;
