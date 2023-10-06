import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import useClickOutside from '../../../hooks/useClickoutside';
import SvgIcon from './SvgIcon';
import { useThemeContext } from '../../../context/ThemeContext';


interface ChevronProps {
    rotate: boolean;
}

const Chevron = ({rotate}: ChevronProps) => {
    return (
        <SvgIcon viewBox="0 0 24 24" strokeWidth="2px" fill="none" rotate={rotate ? "180deg" : ""} >
            <polyline points="6 9 12 15 18 9"></polyline>
        </SvgIcon>
    )
}

// Define the DropdownWrapper styled-component
const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 150px;
`;

// Define the DropdownLabel styled-component
const DropdownLabel = styled.div`
  border: 1px solid ${(props) => props.theme.background[300]};
  background-color: ${(props) => props.theme.background[100]};
  padding: 7px 10px 7px 15px;
  cursor: pointer;
  width: 100%;  
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;

  p {
    margin: 0;
    padding-right: 10px;
    border-right: 2px solid ${(props) => props.theme.background[200]};
    position: relative;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 500;
    pointer-events: none;
    color: ${(props) => props.theme.text[400]}
  }

  svg {
    margin-left: 5px;
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.background[400]};

    p {
        color: ${(props) => props.theme.text[200]}
    }
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
  color: ${(props) => props.theme.text[100]};
  background-color: ${(props) => props.theme.background[100]};
  border: 1px solid ${(props) => props.theme.background[300]};
  display: ${({ open }: { open: boolean }) => (open ? 'block' : 'none')};
  z-index: 999;
`;

// Define the DropdownItem styled-component
const DropdownItem = styled.li`
  padding: 10px;
  cursor: pointer;
  text-align: right;
  border-bottom: 1px solid ${(props) => props.theme.background[200]};
  margin: 0;
  text-transform: uppercase;
  font-size: 13px;
  font-weight: 500;
  color: ${(props) => props.theme.text[400]};

  &:hover {
    background-color: ${(props) => props.theme.background[200]};
    color: ${(props) => props.theme.text[200]};
}
`;

interface DropdownProps {
    label: string;
    items: string[];
    onItemClick?: (selectedItem: string) => void;
}

const Dropdown = ({ label, items, onItemClick }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(label);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleItemClick = (item: string) => {
        setSelectedItem(item);
        setIsOpen(false);
        if(onItemClick) {
            onItemClick(item);
        }
    };

    // Use the useClickOutside hook to handle clicks outside the dropdown
    useClickOutside(dropdownRef, () => {
        if (isOpen) {
            setIsOpen(false);
        }
    });

    return (
        <DropdownWrapper ref={dropdownRef}>
            <DropdownLabel onClick={toggleDropdown}><p>{selectedItem}</p><Chevron rotate={isOpen}/></DropdownLabel>
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