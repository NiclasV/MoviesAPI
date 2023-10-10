import React from "react";
import styled, { css } from "styled-components";
import { Button } from "./Button";

interface LinkProps {
    as?: 'a' | 'button'; // Define the allowed values for the `as` prop
}

export const ButtonLink = styled(Button).attrs<LinkProps>((props) => ({
    as: props.as || 'a',  }))<LinkProps>`
    ${({ as }) => as?.toLowerCase() !== 'button' &&
    css`
      text-decoration: underline;
    `}
`;
