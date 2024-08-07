import { data } from "jquery";
import React, { useEffect, useState } from "react";
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
function Update(props) {
  let data = props.currentSubject;
  const [state, setState] = useState({
    xid: data.xid,
    name: data.name,
    description: data.description,
  });

  const handleOnchangeInput = (event, item) => {
    let copyState = { ...state };
    copyState[item] = event.target.value;
    setState({
      ...copyState,
    });
  };
  
  const handleUpdate = async () => {
      props.updateSubject(state);
  };

  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <div class="modal-header">
          <h5 class="modal-title">Cập nhật môn học mới</h5>
          <h5 role="button" onClick={props.toggle}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </h5>
        </div>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="name" class="font-weight-bold">
                Tên môn học
              </Label>

              <Input
                id="name"
                name="name"
                onChange={(event) => handleOnchangeInput(event, "name")}
                value={state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description" class="font-weight-bold">
                Mô tả
              </Label>
              <Input
                id="Mô tả"
                name="description"
                onChange={(event) => handleOnchangeInput(event, "description")}
                value={state.description}
              />
            </FormGroup>
            <Button color="primary" onClick={() => handleUpdate()}>
              Update
            </Button>{" "}
            <Button color="secondary" onClick={props.toggle}>
              Cancel
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default Update;
