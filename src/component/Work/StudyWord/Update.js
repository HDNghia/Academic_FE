import { data } from "jquery";
import React, { useEffect, useState } from "react";
import Select from "react-select";
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
import axios from "axios";
import moment from "moment";
import { parse } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
function Update(props) {
  let data = props.currentWord;
  const [state, setState] = useState({
    xid: data.xid,
    subject_id: data.subject?.xid,
    question: data.question,
    imageQuestion: data.imageQuestion,
    answer: data.answer,
    imageAnswer: data.imageAnswer,
    numberDate: data.numberDate,
    date: data.date,
  });
  const [imgQuestion, setImgQuestion] = useState(data.imageQuestion != '' ? data.imageQuestion_url : null);
  const [imgAnswer, setImgAnswer] = useState(data.imageAnswer != '' ? data.imageAnswer_url : null);

  const handleOnchangeInput = (event, item) => {
    let copyState = { ...state };
    if (
      item == "subject_id" ||
      item == "date" ||
      item == "imageQuestion" ||
      item == "imageAnswer"
    ) {
      copyState[item] = event;
    } else {
      copyState[item] = event.target.value;
    }
    setState({
      ...copyState,
    });
  };
  const checkValideInput = () => {
    let isValid = true;
    let arrInput = ["subject_id", "numberDate", "date"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  const handleUpdate = async () => {
    let isValid = checkValideInput();
    if (isValid === true) {
      props.updateWord(state);
    }
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    menu: (provided) => ({
      ...provided,
      width: "300px", // Đảm bảo menu có cùng độ rộng
    }),
  };
  const handleDateChange = (date) => {
    // setSelectDate(date);
    handleOnchangeInput(moment(date).format("DD-MM-YYYY"), "date");
  };
  const customInputStyle = {
    border: "1px solid hsl(0, 0%, 70%)",
    borderRadius: "4px",
    padding: "6px",
    fontSize: "16px",
    width: "100%",
  };

  const handleImageQuestionChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      setImgQuestion(URL.createObjectURL(file));
      handleOnchangeInput(file, "imageQuestion");
    }
  };

  const handleImageAnswerChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImgAnswer(URL.createObjectURL(file));
      handleOnchangeInput(file, "imageAnswer");
    }
  };

  const handlePasteQuestion = (evt) => {
    const clipboardItems = evt.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
      return /^image\//.test(item.type);
    });
    if (items.length === 0) {
      return;
    }
    const item = items[0];
    const blob = item.getAsFile();
    setImgQuestion(URL.createObjectURL(blob));
    let file = new File(
      [blob],
      "file_name.jpg",
      { type: "image/jpeg", lastModified: new Date().getTime() },
      "utf-8"
    );
    handleOnchangeInput(file, "imageQuestion");
    // setFileQuestion(formData);
  };

  const handlePasteAnswer = (evt) => {
    const clipboardItems = evt.clipboardData.items;
    const items = [].slice.call(clipboardItems).filter(function (item) {
      // Filter the image items only
      return /^image\//.test(item.type);
    });
    if (items.length === 0) {
      return;
    }
    const item = items[0];
    const blob = item.getAsFile();
    setImgAnswer(URL.createObjectURL(blob));
    let file = new File(
      [blob],
      "file_name.jpg",
      { type: "image/jpeg", lastModified: new Date().getTime() },
      "utf-8"
    );
    handleOnchangeInput(file, "imageAnswer");
  };

  const SearchSubject = async (event) => {
    if (event.xid) {
      handleOnchangeInput(event.xid, "subject_id");
    }
  };

  const formatDate = (dateString) => {
    return parse(dateString, "dd-MM-yyyy", new Date());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <div class="modal-header">
          <h5 class="modal-title">Cập nhập từ mới</h5>
          <h5 role="button" onClick={props.toggle}>
            <i class="fa fa-times" aria-hidden="true"></i>
          </h5>
        </div>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label for="name" class="font-weight-bold">
                Chọn môn học
              </Label>
              <Select
                value={state.subject_id?.value}
                onChange={SearchSubject}
                options={props.options}
                isSearchable={true}
                styles={customStyles}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mean" class="font-weight-bold">
                Câu hỏi
              </Label>
              {imgQuestion && (
                <div>
                  <img src={imgQuestion} alt="Selected" width="466" />
                  <button
                    class="btn btn-danger mt-1 mb-1"
                    onClick={() => {
                      setImgQuestion(null);
                      handleOnchangeInput('', 'imageQuestion');
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <textarea
                value={state.question}
                onPaste={handlePasteQuestion}
                onChange={(event) => handleOnchangeInput(event, "question")}
                placeholder="Write your content here..."
                rows="4"
                cols="50"
                style={{ marginTop: "10px", width: "100%" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageQuestionChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="mean" class="font-weight-bold">
                Trả lời
              </Label>
              {imgAnswer && (
                <div>
                  <img src={imgAnswer} alt="Selected" width="466" />
                  <button
                    class="btn btn-danger mt-1 mb-1"
                    onClick={() => {
                      setImgAnswer(null);
                      handleOnchangeInput('', 'imageAnswer');
                    }}
                  >
                    Remove
                  </button>
                </div>
              )}
              <textarea
                value={state.answer}
                onPaste={handlePasteAnswer}
                onChange={(event) => handleOnchangeInput(event, "answer")}
                placeholder="Write your content here..."
                rows="4"
                cols="50"
                style={{ marginTop: "10px", width: "100%" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageAnswerChange}
              />
            </FormGroup>
            <Row>
              <Col sm="6">
                <FormGroup>
                  <Label for="numberDate">Số ngày ôn</Label>
                  <Input
                    type="number"
                    min="0"
                    placeholder="Nhập số ngày..."
                    id="numberDate"
                    name="numberDate"
                    value={state.numberDate}
                    onChange={(event) =>
                      handleOnchangeInput(event, "numberDate")
                    }
                  />
                </FormGroup>
              </Col>
              <Col sm="6">
                <FormGroup>
                  <Label for="date">Ngày</Label>
                  <DatePicker
                    selected={state.date ? formatDate(state.date) : null}
                    onChange={handleDateChange}
                    placeholderText="Nhập ngày..."
                    id="date"
                    name="date"
                    dateFormat="dd-MM-yyyy"
                    customInput={<input style={customInputStyle} />} // Áp dụng lớp CSS tùy chỉnh
                  />
                </FormGroup>
              </Col>
            </Row>
            <Button
              type="submit"
              color="primary"
              onClick={() => handleUpdate()}
            >
              Cập nhật
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

export default Update;
