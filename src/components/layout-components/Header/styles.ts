import styled from "styled-components";

export const Container = styled.div`
  background: ${({ theme }) => theme["background-color-primary"]};
  position: relative;

  header {
    height: 70px;
    width: 100%;
    max-width: 1152px;
    padding: ${({ theme }) => theme["p-3"]};
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    > a {
      text-decoration: none;
      color: ${({ theme }) => theme["text-color-primary"]};

      h1 {
        font-size: ${({ theme }) => theme["text-md"]};
        font-weight: 500;
      }
    }

    nav {
      display: flex;
      align-items: center;
      gap: ${({ theme }) => theme["gap-6"]};
      
      a {
        display: flex;
        align-items: center;
        gap: ${({ theme }) => theme["gap-2"]};

        color: ${({ theme }) => theme["text-color-secondary"]};
        font-size: ${({ theme }) => theme["text-sm"]};
        text-decoration: none;
        transition: color 0.15s;

        &.active-link {
          color: ${({ theme }) => theme["text-color-primary"]};
        }

        &:hover {
          color: ${({ theme }) => theme["text-color-primary"]};
        }
      }
    }

    button.toggle-menu {
      display: none;
    }
  }

  @media(max-width: 768px) {
    header {
      nav {
        position: fixed;
        z-index: 15;
        right: 0;
        top: 70px;
        bottom: 0;
        width: 256px;
        background: ${({ theme }) => theme["background-color-secondary"]};

        flex-direction: column;
        align-items: flex-start;
        gap: 0;

        transform: translateX(100%);
        transition: transform 0.3s ease-in-out;

        &.show {
          transform: translateX(0);
        }

        a {
          width: 100%;
          padding: ${({ theme }) => theme["p-4"]};

          &.active-link {
            background: ${({ theme }) => theme["background-color-tertiary"]};
          }

          &:hover {
            background: ${({ theme }) => theme["background-color-tertiary"]};
          }
        }
      }

      button.toggle-menu {
        display: flex;
      }
    }
  }

  @media (max-width: 320px) {
    header {
      nav {
        width: 100%;
      }
    }
  }
`;

interface OverlayProps {
  $isVisible: boolean
}

export const Overlay = styled.div<OverlayProps>`
  display: none;
  position: fixed;
  z-index: 10;
  inset: 0;
  top: 70px;

  @media(max-width: 768px) {
    display: ${({ $isVisible }) => $isVisible ? "flex" : "none"};
  }
`;