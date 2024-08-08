import React, { useState } from "react";
import Select from "react-select";
import {
  Form,
  Row,
  FormGroup,
  Col,
  Input,
  Button,
  Modal,
  ModalBody,
  Label,
} from "reactstrap";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parse } from "date-fns";

function Add(props) {
  let Today = new Date();
  let dateQuesToday = moment(Today).format("DD-MM-YYYY");
  // const [selectDate, setSelectDate] = useState(null);
  const [state, setState] = useState({
    subject_id: "",
    question: "",
    imageQuestion: "",
    answer: "",
    imageAnswer: "",
    numberDate: 0,
    date: dateQuesToday,
  });

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
    let arrInput = ["subject_id", "date"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!state[arrInput[i]]) {
        isValid = false;
        alert("Missing parameter: " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  const handleAddNewSubject = async () => {
    let isValid = checkValideInput();
    if (isValid === true) {
      props.createNewWord(state);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setState({
      subject_id: "",
      imageQuestion: "",
      question: "",
      answer: "",
      imageAnswer: "",
      numberDate: 0,
      date: dateQuesToday,
    });
    setImgAnswer("");
    setImgQuestion("");
  };

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "100%",
    }),
    control: (base) => ({
      ...base,
      fontSize: '16px', // Điều chỉnh kích thước font để ngăn chặn zoom
      // Các tùy chỉnh khác
    }),
    menu: (base) => ({
      ...base,
      width: 'auto', // Đặt chiều ngang tự động
      minWidth: '100%', // Đảm bảo chiều ngang ít nhất bằng với nút select
      boxSizing: 'border-box',
    }),
    menuList: (base) => ({
      ...base,
      width: '100%', // Đặt chiều ngang bằng với phần tử menu
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

  const [imgQuestion, setImgQuestion] = useState(null);
  const [imgAnswer, setImgAnswer] = useState(null);

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

  const imgStyle = {
    maxWidth: "100%",
    height: "auto",
    display: "block",
  };

  const mobileImgStyle = {
    width: "361px",
    height: "auto",
    display: "block",
  };

  return (
    <div>
      <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
        <div class="modal-header">
          <h5 class="modal-title">Thêm từ mới</h5>
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
                  <img src={imgQuestion} alt="Selected" style={window.innerWidth <= 768 ? mobileImgStyle : imgStyle} />
                  <button
                    class="btn btn-danger mt-1 mb-1"
                    onClick={() => {
                      setImgQuestion(null);
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
                style={{ marginTop: "10px", width: "100%", fontSize: "16px"  }}
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
                  <img src={imgAnswer} alt="Selected" style={window.innerWidth <= 768 ? mobileImgStyle : imgStyle} />
                  <button
                    class="btn btn-danger mt-1 mb-1"
                    onClick={() => {
                      setImgAnswer(null);
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
                style={{ marginTop: "10px", width: "100%", fontSize: "16px" }}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageAnswerChange}
              />
            </FormGroup>
            <Row>
              <Col xs="6" sm="6">
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
              <Col xs="6" sm="6">
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
