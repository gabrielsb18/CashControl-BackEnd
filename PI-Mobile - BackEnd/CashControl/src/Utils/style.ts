import styled from "styled-components/native";

const fonts = {
    InterRegular: '../../assets/Fonts/InterRegular.ttf',
    InterMedium: '../../assets/Fonts/InterMedium.ttf',
    InterBold: '../../assets/Fonts/InterBold.ttf',
    InterLight: '../../assets/Fonts/InterLight.ttf',
};

export const Footer = styled.View`
    flex: 1;
    width: 100%;
    /* margin-top: 1px; */
`;

export const ContentFlat = styled.View`
    padding: 15px 45px;
    flex-direction: row;
    /* border-width: 1px;
    border-color: #D7D5D4; */
`;

export const IconTransaction = styled.Image `
    width: 55px;
    height: 55px;
`;

export const DetailsTransaction = styled.View `
    flex: auto;
    padding: 0 10px;
`;

export const DataTransaction = styled.Text `
    font-family: 'InterRegular';
    font-size: 12px;
    font-weight: 400;
`;

export const NameTransaction = styled.Text `
    font-family: 'InterRegular';
    font-size: 16px;
`;

export const SubtitleTransaction = styled.Text `
    font-family: 'InterRegular';
    font-size: 12px;
    font-weight: 400;
`;

export const AmountTransaction = styled.Text `
    font-family: 'InterBold';
    color: #75B700;
`;