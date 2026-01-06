import styled from "styled-components";

const HeaderContainer = styled.header`
  width: 100%;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1.5rem;

  background: ${(p) => p.theme.headerBg};
  color: ${(p) => p.theme.text};

  border-bottom: 1px solid ${(p) => p.theme.border};
  box-shadow: ${(p) => p.theme.shadow};

  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
`;

const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Avatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;

  background: linear-gradient(
    135deg,
    ${(p) => p.theme.border},
    ${(p) => p.theme.text}
  );

  box-shadow: ${(p) => p.theme.neon};
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: ${(p) => p.theme.text};
  line-height: 1.1;
`;

const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
`;

const Role = styled.span`
  font-size: 0.75rem;
  opacity: 0.7;
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
`;

const LogoText = styled.h1`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${(p) => p.theme.text};
  text-shadow: ${(p) => (p.theme.neon !== "none" ? p.theme.neon : "none")};
  transition: text-shadow 0.3s ease;
`;

function Header() {
  return (
    <HeaderContainer>
      <UserProfile>
        <Avatar />
        <UserInfo>
          <Name>John Doe</Name>
          <Role>Administrator</Role>
        </UserInfo>
      </UserProfile>

      <LogoArea>
        <LogoText>Eventify Dashboard</LogoText>
      </LogoArea>
    </HeaderContainer>
  );
}

export default Header;
