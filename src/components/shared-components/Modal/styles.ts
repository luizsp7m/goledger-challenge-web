import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DialogRoot = styled(Dialog.Root)``;

export const DialogPortal = styled(Dialog.Portal)``;

export const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.25);
  position: fixed;
  inset: 0;
`;

export const DialogContent = styled(Dialog.Content)`
	background: #323238;
	border-radius: 4px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 512px;

  &:focus {
    outline: none
  }

	div.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px;
		border-bottom: 1px solid rgba(255,255,255,0.15);

		h5 {
			font-size: 0.875rem;
			font-weight: 500;
		}

		button {
			&:hover {
				opacity: 0.75;
			}
		}
	}

	div.content {
		padding: 16px;
	}
`;