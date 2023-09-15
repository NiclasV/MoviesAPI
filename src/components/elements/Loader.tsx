import { ReactNode } from "react";
import styled from "styled-components";

interface LoaderProps {
  children?: ReactNode,
}
const LoadWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 6 0px
  margin: 0 auto;
`;

const LoaderEl= styled.div<LoaderProps>`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;

  &:before , &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 8px solid ${(props) => props.theme.background[100]};
    animation: prixClipFix 1.65 s linear infinite ;
  }
  &:after{
    transform: rotate3d(90, 90, 0, 180deg );
    border-color: ${(props) => props.theme.primary[600]};
 
  @keyframes rotate {
    0%   {transform: rotate(0deg)}
    100%   {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      75%, 100%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  }
`;

export const Loader: React.FC = () => {

  return (
    <LoadWrapper>
      <LoaderEl/>
    </LoadWrapper>
  )
}