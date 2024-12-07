import * as Dialog from "@radix-ui/react-dialog";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

const scaleIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
`;

const scaleOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -48%) scale(0.95);
  }
`;

export const DialogRoot = styled(Dialog.Root)``;

export const DialogPortal = styled(Dialog.Portal)``;

export const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.45);
  position: fixed;
  inset: 0;

	animation: ${fadeIn} 200ms ease-out;

	&[data-state="closed"] {
    animation: ${fadeOut} 200ms ease-in;
  }
`;

interface DialogContentProps {
	$maxWidth: number;
}

export const DialogContent = styled(Dialog.Content) <DialogContentProps>`
	background: ${({ theme }) => theme["modal-color"]};
	border-radius: 4px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 95%;
	max-width: ${({ $maxWidth }) => `${$maxWidth}px`};

	animation: ${scaleIn} 200ms ease-out;

	&[data-state="closed"] {
		animation: ${scaleOut} 200ms ease-in;
}

  &:focus {
    outline: none;
  }

	div.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: ${({ theme }) => theme["p-4"]};
		border-bottom: 1px solid ${({ theme }) => theme["border-color"]};

		h5 {
			font-size: ${({ theme }) => theme["text-md"]};
			font-weight: 500;
		}

		button {
			svg {
				color:  ${({ theme }) => theme["danger-color"]};
				transition: color 0.15s;
			}

			&:hover {
				svg {
					color:  ${({ theme }) => theme["danger-color-hover"]};
				}
			}
		}
	}

	div.body {
		padding: ${({ theme }) => theme["p-4"]};
	}
`;