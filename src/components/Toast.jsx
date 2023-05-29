import styled from "styled-components";
import { toast, ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Toast() {
  return (
    <ToastContainer
      position={toast.POSITION.TOP_RIGHT}
      autoClose={2500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  );
}

const ToastContainer = styled(ReactToastContainer)`
  --toastify-color-progress-light: ${(props) => props.theme.main};
  font-size: 1.6rem;
`;
