import React, { useState } from "react";
import {
  Form,
  Row,
  FormGroup,
  Col,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
} from "reactstrap";
import moment from "moment";
import axios from "axios";
function Add(props) {
  const [state, setState] = useState({
    name: "",
    description: "",
  });

  const handleOnchangeInput = (event, item) => {
    let copyState = { ...state }
    copyState[item] = event.target.value;
    setState({
        ...copyState
    })
}

  const handleAddNewSubject = async () => {
      props.createNewSubject(state);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({
      name: "",
      description: "",
    });
  };
  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <div class="modal-header">
          <h5 class="modal-title">Thêm môn học mới</h5>
          <h5 role="button" onClick={props.toggle}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name" class="font-weight-bold">
                Tên môn học
              </Label>
              <Input id="name" name="name" value={state.question} onChange={(event) => handleOnchangeInput(event, "name")}/>
            </FormGroup>
            <FormGroup>
              <Label for="mean" class="font-weight-bold">
                Mô tả
              </Label>

              <Input id="description" name="description" value={state.answer} onChange={(event) => handleOnchangeInput(event, "description")}/>
            </FormGroup>
            <Button
              type="submit"
              color="primary"
              onClick={() => handleAddNewSubject()}
            >
              Tạo
            </Button>{" "}
            <Button color="secondary" onClick={props.toggle}>
              Hủy bỏ
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Add;
