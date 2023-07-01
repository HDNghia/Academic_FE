import React, { useState } from 'react';
import {
    Form, Row, FormGroup, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
function Revise(props) {

    const handleReviseQuestion = () => {
        props.revise();
    }
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalBody>
                    <FormGroup>
                        <Label for="name" class="font-weight-bold h4">
                            Bạn có chắc là muốn ôn lại tất cả
                        </Label>
                    </FormGroup>
                    <Button color="primary m-1" onClick={() => handleReviseQuestion()}>
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