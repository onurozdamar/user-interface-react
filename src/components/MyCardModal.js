import Modal from "react-modal";
import MyForm from "./MyForm";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

function MyCardModal(props) {
  return (
    <Modal
      isOpen={props.showModal}
      onRequestClose={props.closeModal}
      style={customModalStyles}
      contentLabel="Example Modal"
    >
      <MyForm employee={props.employee} closeModal={props.closeModal} />
    </Modal>
  );
}

export default MyCardModal;
