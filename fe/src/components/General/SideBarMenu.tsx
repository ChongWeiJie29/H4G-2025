import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FloatingButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  font-size: 2rem;
  border-radius: 50%;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const Sidebar = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100%;
  width: 250px;
  background-color: #ffffff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.2);
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
  transition: transform 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 20px;
  z-index: 1000;
`;

const Option = styled.div`
  padding: 15px 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f0f0f0;
  }

  & + & {
    margin-top: 10px;
  }
`;

const CloseButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
`;

const SidebarMenu = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (option: string) => {
    setIsOpen(false);

    switch (option) {
      case "View Transaction History":
        navigate("/transaction-history");
        break;

      case "View Voucher Request History":
        navigate("/voucher-request-history");
        break;
      case "Make a Voucher Request":
        navigate("/voucher-request");
        break;
      case "Shop":
        navigate("/shop");
        break;
      default:
        break;
    }
  };

  return (
    <>
      <FloatingButton onClick={toggleSidebar}>+</FloatingButton>
      <Sidebar isOpen={isOpen}>
        <CloseButton onClick={toggleSidebar}>&times;</CloseButton>
        <Option onClick={() => handleOptionClick("View Transaction History")}>
          View Transaction History
        </Option>
        <Option
          onClick={() => handleOptionClick("View Voucher Request History")}
        >
          View Voucher Request History
        </Option>
        <Option onClick={() => handleOptionClick("Make a Voucher Request")}>
          Make a Voucher Request
        </Option>
        <Option onClick={() => handleOptionClick("Shop")}>Shop</Option>
      </Sidebar>
    </>
  );
};

export default SidebarMenu;
