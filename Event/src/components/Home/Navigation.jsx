import styled from "styled-components";
import NavBar from "./NavBar";

const Container = styled.div`
  color: white;
  padding: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

function Navigation() {
  return (
    <Container>
      <NavBar />
    </Container>
  );
}

export default Navigation;
