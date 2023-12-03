import styled from "styled-components"

interface baseContentProps {
    $width?: string;
    $direction?: "row" | "row-reverse" | "column" | "column-reverse";
    $justify?: "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right" | "space-between" | "space-around";
    $alignitems?: "center" | "start" | "end" | "flex-start" | "flex-end" | "left" | "right";
    $padding?: string;
    $margin?: string;
    $bgColor?: string;
}

const baseContainer = styled.div<baseContentProps>`
    display: flex;
    width: ${({ $width }) => $width};
    flex-direction: ${({ $direction }) => $direction ? $direction : "column"};
    justify-content: ${({ $justify }) => $justify ? $justify : "center"};
    align-items: ${({ $alignitems }) => $alignitems ? $alignitems : "center"};
    margin: ${({ $margin }) => $margin};
    background-color:  ${({ $bgColor }) => $bgColor};
`;

interface ContentProps {
    $variant?: 'standard' | 'wide' | 'small' | "";
}

const contentVariants = {
    wide: `
    max-width: 1620px;
  `,
    standard: `
    max-width: 1220px;
  `,
    small: `
    max-width: 1020px;
  `,
};

export const Container = styled(baseContainer) <ContentProps>`
    width: ${({ $width }) => $width || "100%"};
    padding: ${({ $padding }) => $padding ? $padding : "0 40px"};
    max-width: ${(props) => props.$width ? props.$width : "100%"};
    ${({ $variant }) => $variant ? contentVariants[$variant] : `
        max-width: 100%;
    `};

    @media (max-width: 640px) {
        padding: ${({ $padding }) => $padding ? $padding : "0 20px"};
    }
`
interface SectionProps {
    $variant?: 'mStandard' | 'mSmall' | 'pStandard' | "pSmall" | "";
    $bgColor?: string;
}

const sectionVariants = {
    mStandard: `
        margin: 80px 0;
    `,
    mSmall: `
        margin: 40px 0;
    `,
    pStandard: `
        padding: 80px 0;
    `,
    pSmall: `
        padding: 40px 0;
    `,
};

export const Section = styled(baseContainer).attrs({ as: 'section' }) <SectionProps>`
    ${({ $variant }) => $variant ? sectionVariants[$variant] : `
    `}
    background-color: ${props => props.$bgColor};
`
