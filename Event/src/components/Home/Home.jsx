import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";
import About from "../About/About";
import Events from "../Events/Events";
import Directions from "../Directions/Directions";

const fadeIn = keyframes`
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-1px); }
  60% { transform: translateY(-5px); }
`;

const slideInOut = keyframes`
  0% { transform: translateX(-100%); opacity: 0; }
  50% { transform: translateX(0); opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
`;

const HomeCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: white;
  padding: 0rem;
  background-image: url("eve3.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  // @media (max-width: 768px) {
  //   height: auto;
  //   background-size: cover;
  //   background-position: center;
  //   padding: 2rem 1rem;
  // }
`;

const MainContent = styled.div`
  text-align: center;
  margin-top: 1rem;
  width: 90%;
  max-width: 600px;

  h1 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    margin-top: 0.5rem;

    animation: ${bounce} 2s infinite;

    @media (max-width: 768px) {
      font-size: 2rem;
      font-weight: bold;
    }

    span {
      color: #451a03;
    }
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    animation: ${slideInOut} 4s ease-in-out;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const DateStamp = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  font-size: 1rem;
  color: white;
  background: rgba(0, 0, 0, 0.7);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  animation: ${fadeIn} 2.5s ease-in-out;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, background 0.3s ease;

  &:hover {
    background: #fb923c;
    color: black;
    transform: scale(1);
    box-shadow: 0px 6px 8px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    bottom: 0.5rem;
    right: 0.5rem;
  }
`;

function Home() {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const updateDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setCurrentDate(formattedDate);
    };

    updateDate();
    const interval = setInterval(updateDate, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HomeCont>
        <MainContent>
          <h1>Welcome to Eventify</h1>
          <p>Your one-stop platform to discover and organize amazing events.</p>
        </MainContent>
        <DateStamp>{currentDate}</DateStamp>
      </HomeCont>
      <About />
      <Events />
      <Directions />
    </>
  );
}

export default Home;
