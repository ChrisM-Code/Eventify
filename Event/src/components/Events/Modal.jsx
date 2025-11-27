import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 15px;
  border-radius: 5px;
  min-width: 250px;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  text-align: center;
`;

const ModalEventWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    padding: 5px;
    font-size: 0.9rem;
  }
`;

const CloseButton = styled.button`
  background: #ff4d4d;
  color: white;
  border: none;
  padding: 8px 5px;
  margin-top: 5px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #cc0000;
  }
`;

const Modal = ({ children, onClose }) => (
  <ModalOverlay>
    <ModalContent>
      <ModalEventWrapper>{children}</ModalEventWrapper>
      <CloseButton onClick={onClose}>Close</CloseButton>
    </ModalContent>
  </ModalOverlay>
);

export default Modal;
