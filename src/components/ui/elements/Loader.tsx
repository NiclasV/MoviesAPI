import { ReactNode } from "react";
import styled from "styled-components";

interface LoaderProps {
  children?: ReactNode,
}
const LoadWrapper = styled.div`
  position: relative;
  width: 100px;
  height: 6 0px
  margin: 0 auto;
`;

const LoaderEl = styled.div<LoaderProps>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  animation: rotate 1s linear infinite;

  &:before, &:after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 10px solid ${props => props.theme.primary[500]};
    animation: prixClipFix 1.8s linear infinite;
  }
  &:after{
    border: 8px solid ${props => props.theme.secondary[500]};
    animation: prixClipFix 1.4s linear infinite , rotate 0.4s linear infinite reverse;
    inset: 16px;
  }

  @keyframes rotate {
    0%   {transform: rotate(0deg)}
    100%   {transform: rotate(360deg)}
  }

  @keyframes prixClipFix {
      0%   {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
      25%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
      50%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
      75%  {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
      100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
  }
`;

export const Loader: React.FC = () => {

  return (
    <LoadWrapper>
      <LoaderEl />
    </LoadWrapper>
  )
}