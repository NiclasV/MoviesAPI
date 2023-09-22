import React, { useState } from 'react';
import styled from 'styled-components';

// Define the DropdownWrapper styled-component
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 160px;
`;

// Define the DropdownLabel styled-component
const DropdownLabel = styled.div`
  border: 1px solid ${(props) => props.theme.background[500]};
  background-color: ${(props) => props.theme.background[100]}  ;
  padding: 5px 10px;
  cursor: pointer;
  width: 100%;  

  &:hover {
    outline: 1px solid ${(props) => props.theme.background[600]};
  }
`;

interface DropdownListProps {
    open: boolean,
}

// Define the DropdownList styled-component
const DropdownList = styled.ul<DropdownListProps>`
  list-style: none;
  min-width: 100%;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 100%;
  left: 0;
  background-color: ${(props) => props.theme.background[200]};
  border: 1px solid #ccc;
  display: ${({ open }: { open: boolean }) => (open ? 'block' : 'none')};
  z-index: 999;
`;

// Define the DropdownItem styled-component
const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: right;
  border-bottom: 1px solid ${(props) => props.theme.background[400]};
  &:hover {
    background-color: ${(props) => props.theme.background[100]};
}
`;

interface DropdownProps {
    label: string;
    items: string[];
    customFunc?: (selectedItem: string) => void;
}

const Dropdown = ({ label, items, customFunc }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(label);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
        if (customFunc) {
            customFunc(selectedItem)
        }
    };

    return (
        <DropdownWrapper>
            <DropdownLabel onClick={toggleDropdown}>{selectedItem}</DropdownLabel>
            <DropdownList open={isOpen}>
                {items.map((item) => (
                    <DropdownItem key={item} onClick={() => handleItemClick(item)}>
                        {item}
                    </DropdownItem>
                ))}
            </DropdownList>
        </DropdownWrapper>
    );
};

export default Dropdown;