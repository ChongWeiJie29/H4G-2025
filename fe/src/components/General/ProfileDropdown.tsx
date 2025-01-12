import React, { useState } from "react";
import styled from "styled-components";

// Styled components
const ProfilePicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer; /* UI cue to indicate it's clickable */
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1); /* Slight zoom on hover */
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 60px; /* Adjust as per the ProfilePicture position */
  right: 10px;
  background: white;
  border: 1px solid #ddd;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  width: 150px;
  z-index: 1000;

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #f5f5f5;
      }
    }
  }
`;

// Define prop types
interface ProfileDropdownProps {
  profilePic: string;
  onOptionClick: (option: string) => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({
  profilePic,
  onOptionClick,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen((prevState) => !prevState);
  };

  return (
    <div style={{ position: "relative" }}>
      <ProfilePicture
        src={profilePic}
        alt="Profile"
        onClick={toggleDropdown}
      />
      {dropdownOpen && (
        <DropdownMenu>
          <ul>
            <li onClick={() => onOptionClick("View Profile")}>
              View Profile
            </li>
            <li onClick={() => onOptionClick("Settings")}>
              Settings
            </li>
            <li onClick={() => onOptionClick("Log Out")}>
              Log Out
            </li>
          </ul>
        </DropdownMenu>
      )}
    </div>
  );
};

export default ProfileDropdown;

