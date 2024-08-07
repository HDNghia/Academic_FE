import React from 'react';
import {
    FormGroup, Button, Modal, ModalBody, Label
} from 'reactstrap';
function Revise(props) {

    const handleResetWord = () => {
        props.resetWordToday(props.currentWord);
    }
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle} centered>
                <ModalBody>
                    <FormGroup>
                        <Label for="name" class="font-weight-bold h4">
                            Bạn có chắc là muốn reset hôm nay ?
                        </Label>
                    </FormGroup>
                    <Button color="primary m-1" onClick={() => handleResetWord()}>
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

export default Revise;