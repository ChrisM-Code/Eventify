import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import imgl1 from "../ui/images/L1.jpg";
import imgl2 from "../ui/images/L2.jpg";
import imgl3 from "../ui/images/L3.jpg";

// Spinner fade animation
const fade = keyframes`
  0% { opacity: 0; transform: scale(0.95); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0.95); }
`;

// Overlay that sits above your homepage but allows background visibility
const OverlayContainer = styled.div`
  position: fixed;
  inset: 0;
  backdrop-filter: blur(4px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

// Spinner container
const LogoSpinner = styled.div`
  width: clamp(80px, 10vw, 120px);
  height: clamp(80px, 10vw, 120px);
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #ff4500;
  box-shadow: 0 0 25px 5px rgba(255, 69, 0, 0.3);
  animation: ${fade} 2s ease-in-out infinite;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Image in spinner
const SpinnerImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

// Text below
const LoadingText = styled.p`
  font-weight: bold;
  color: #ff4500;
  letter-spacing: 0.5px;
  margin-top: 1rem;
  font-size: clamp(1rem, 2vw, 1.3rem);
`;

const LoadingScreen = () => {
  const images = [imgl1, imgl2, imgl3];
  const [index, setIndex] = useState(0);
  const [showApp, setShowApp] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [images.length]);

  // Simulate load duration (adjust to your needs)
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApp(true);
    }, 60000); // 1 min
    return () => clearTimeout(timer);
  }, []);

  if (!showApp) {
    return (
      <OverlayContainer>
        <LogoSpinner>
          <SpinnerImage src={images[index]} alt="Eventify Loading" />
        </LogoSpinner>
        <LoadingText>Loading Eventify, please wait...</LoadingText>
      </OverlayContainer>
    );
  }

  return null;
};

export default LoadingScreen;
