import styled from "styled-components";
import { Link } from "react-router-dom";

const LogoN = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  color: white;

  span {
    color: #451a03;
  }

  &:hover {
    color: #451a03;

    span {
      color: white;
    }
  }
`;

function Logo() {
  return (
    <>
      <LogoN to="/">
        Event<span>ify</span>
      </LogoN>
    </>
  );
}

export default Logo;
