import React from "react";
import styled, { keyframes } from "styled-components";
import { Facebook, Twitter, Linkedin } from "lucide-react";
import { useTranslation } from "react-i18next"; // ⬅ import hook

// Gradient animation
const gradientAnimation = keyframes`
  0% {
    background: linear-gradient(135deg, #a7c7e7 0%, #3b7b9e 100%);
  }
  50% {
    background: linear-gradient(135deg, #70a1d7 0%, #3e8ac7 100%);
  }
  100% {
    background: linear-gradient(135deg, #a7c7e7 0%, #3b7b9e 100%);
  }
`;

const FooterContainer = styled.footer`
  animation: ${gradientAnimation} 8s ease infinite;
  padding: 30px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  justify-content: space-between;
  border-top: 1px solid #e0e0e0;
  color: white;
`;

const LogoSection = styled.div`
  flex: 1.2;
  min-width: 240px;
  margin: 20px;

  img {
    width: 200px;
    margin-bottom: 16px;
  }

  p {
    font-size: 15px;
    color: #ddd;
    max-width: 300px;
    line-height: 1.6;
  }
`;

const Column = styled.div`
  flex: 1;
  min-width: 200px;
  margin: 20px;

  h4 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #fff;
  }

  ul {
    list-style: none;
    padding: 0;

    li {
      margin-bottom: 12px;
      font-size: 18px;
      color: #ddd;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #fff;
      }
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 14px;
  margin-top: 8px;
`;

const IconWrapper = styled.a`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${({ color }) => color || "#ccc"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;

  svg {
    color: white;
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  &:hover svg {
    transform: scale(1.2);
  }
`;

const Copyright = styled.div`
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #ddd;
  border-top: 1px solid #bbb;
  padding-top: 20px;
`;

const Footer = () => {
  const { t } = useTranslation(); // ⬅ dùng hook

  return (
    <FooterContainer>
      <LogoSection>
        <img src="/logo.png" alt="Bakta Logo" />
      </LogoSection>

      <Column>
        <h4>{t("footerComponent.about_us")}</h4>
        <ul>
          <li>{t("footerComponent.introduction")}</li>
          <li>{t("footerComponent.contact")}</li>
          <li>{t("footerComponent.blog")}</li>
        </ul>
      </Column>

      <Column>
        <h4>{t("footerComponent.support")}</h4>
        <ul>
          <li>{t("footerComponent.faqs")}</li>
          <li>{t("footerComponent.privacy_policy")}</li>
          <li>{t("footerComponent.terms_of_use")}</li>
        </ul>
      </Column>

      <Column>
        <h4>{t("footerComponent.connect_with_us")}</h4>
        <SocialIcons>
          <IconWrapper href="https://facebook.com" target="_blank" rel="noopener noreferrer" color="#3b5998">
            <Facebook />
          </IconWrapper>
          <IconWrapper href="https://twitter.com" target="_blank" rel="noopener noreferrer" color="#1da1f2">
            <Twitter />
          </IconWrapper>
          <IconWrapper href="https://linkedin.com" target="_blank" rel="noopener noreferrer" color="#0077b5">
            <Linkedin />
          </IconWrapper>
        </SocialIcons>
      </Column>

      <Copyright>© 2025 {t("footerComponent.copyright")}</Copyright>
    </FooterContainer>
  );
};

export default Footer;
