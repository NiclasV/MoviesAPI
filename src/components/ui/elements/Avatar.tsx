import { styled } from "styled-components";

interface AvatarStyleProps {
    width: string;
}

const AvatarStyled = styled.div<AvatarStyleProps>`
    width: 100%;
    max-width: ${props => props.width} || 64px;
    padding-top: 100%;
    position: relative;
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        object-fit: cover;
        object-position: center;
    }
`;

interface AvatarProps extends AvatarStyleProps {
    imageUrl: string;
}

export const Avatar = ({ imageUrl, width }: AvatarProps) => {
    return (
        <AvatarStyled width={width}>
            <img src={imageUrl} alt="avatar" />
        </AvatarStyled>
    );
};