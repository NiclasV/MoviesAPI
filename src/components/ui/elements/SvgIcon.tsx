import styled from 'styled-components';

// Define a custom SvgIcon styled-component
const SvgIcon = styled.svg`
  width: ${(props) => props.width || '20px'};
  height: ${(props) => props.height || '20px'};
  fill: ${(props) => props.fill || 'currentColor'};
  stroke: ${(props) => props.fill || 'currentColor'};
  stroke-width: ${(props) => props.strokeWidth || '0px'};
  stroke-linecap: round;
  stroke-linejoin: round;  
  
`;

export default SvgIcon;
