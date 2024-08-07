import React from 'react';
import {
    FormGroup, Button, Modal, ModalBody, Label
} from 'reactstrap';
function Delete(props) {

    const handleDeleteSubject = () => {
        props.deleteAWord(props.currentWord);
    }
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle} centered>
                <ModalBody>
                    <FormGroup>
                        <Label for="name" class="font-weight-bold h4">
                            Bạn có chắc là xóa kiến thức này
                        </Label>
                    </FormGroup>
                    <Button color="primary m-1" onClick={() => handleDeleteSubject()}>
                        Yes
                    </Button>
                    <Button color="secondary" onClick={props.toggle}>
                        Cancel
                    </Button>
                </ModalBody>

            </Modal>
        </div>
    );
}

export default Delete;