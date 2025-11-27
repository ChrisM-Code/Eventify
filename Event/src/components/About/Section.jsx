import styled from "styled-components";
import Join from "./Join";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 1rem auto;
  padding: 0.5rem;
  max-width: auto;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const SectionLeft = styled.section`
  flex: 1;
  background-color: #fef9c3;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;

    span {
      color: #ff4500;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #fb923c;
      }
    }
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;

    li {
      font-size: 1rem;
      color: #555;
      line-height: 1.6;
      margin-bottom: 0.75rem;

      @media (min-width: 1024px) {
        font-size: 1.125rem;
      }

      strong {
        color: #333;
      }
    }
  }
`;

const SectionRight = styled.section`
  flex: 1;
  background-color: #e0f2fe;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 1.5rem;
    color: #333;
    margin-bottom: 1rem;
    text-align: center;

    span {
      color: #ff4500;
      cursor: pointer;
      transition: color 0.3s ease;

      &:hover {
        color: #fb923c;
      }
    }
  }

  ul {
    list-style-type: disc;
    margin-left: 1.5rem;

    li {
      font-size: 1rem;
      color: #555;
      line-height: 1.6;
      margin-bottom: 0.75rem;

      @media (min-width: 1024px) {
        font-size: 1.125rem;
      }

      strong {
        color: #333;
      }
    }
  }
`;

function Section() {
  return (
    <>
      <Container>
        <SectionLeft>
          <h1>
            What <span>We Offer</span>{" "}
          </h1>
          <ul>
            <li>
              <strong>Discover Events:</strong> Explore a wide range of events
              curated for different interests and locations. Use our smart
              filters to find events tailored to your preferences.
            </li>
            <li>
              <strong>Showcase Your Event:</strong> Are you an organizer?
              Eventfy provides an intuitive platform to list your events, reach
              a broader audience, and manage your event details with ease.
            </li>
          </ul>
        </SectionLeft>
        <SectionRight>
          <h1>
            Why Choose <span>Eventfy?</span>
          </h1>
          <ul>
            <li>
              <strong>User-Friendly Interface:</strong>Navigate through events
              effortlessly with our sleek and intuitive design.
            </li>

            <li>
              <strong>Global Reach:</strong> Discover events happening around
              the corner or on the other side of the world.
            </li>
            <li>
              <strong>Community Focused:</strong> Build meaningful connections
              by attending events that matter to you.
            </li>
          </ul>
        </SectionRight>
      </Container>

      <Join />
    </>
  );
}

export default Section;
