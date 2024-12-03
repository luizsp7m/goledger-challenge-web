import * as Dialog from "@radix-ui/react-dialog";
import styled from "styled-components";

export const DialogRoot = styled(Dialog.Root)``;

export const DialogPortal = styled(Dialog.Portal)``;

export const DialogOverlay = styled(Dialog.Overlay)`
  background: rgba(0, 0, 0, 0.35);
  position: fixed;
  inset: 0;
`;

export const DialogContent = styled(Dialog.Content)`
	background: ${({ theme }) => theme["modal-color"]};
	border-radius: 4px;
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 100%;
	max-width: 512px;

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