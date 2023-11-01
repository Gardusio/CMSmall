import { Modal } from "react-bootstrap";

// TODO: CHANGING AUTHOR BY USERNAME
function ModalContainer({ content, shown }) {

    return (
        <Modal fullscreen show={shown} >
            {content}
        </Modal>
    );
}

export default ModalContainer