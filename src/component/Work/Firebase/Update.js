import { data } from 'jquery';
import React, { useEffect, useState } from 'react';
import {
    Form, Row, FormGroup, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label
} from 'reactstrap';
import axios from 'axios';
import moment from 'moment';
function Update(props) {
    let data = props.currentQuestion;
    console.log('check data from child: ', data);
    const [state, setState] = useState({
        _id: data._id,
        imageQuestion: data.imageQuestion,
        imageAnswer: data.imageAnswer,
        question: data.question,
        answer: data.answer,
        numberDate: `${data.numberDate}`,
        date: moment(data.date).format('YYYY-MM-DD'),
        status: `${data.status}`,
        part: data.part,
        subject: data.subject
    });
    // let [saveImg, setSaveImg] = useState(null);
    const [fileQuestion, setFileQuestion] = useState(null)
    const [imgQuestion, setImgQuestion] = useState(null);
    const [imgAnswer, setImgAnswer] = useState(null);
    const [fileAnswer, setFileAnswer] = useState(null)

    const handleOnchangeInput = (event, item) => {
        let copyState = { ...state }
        copyState[item] = event.target.value;
        setState({
            ...copyState
        })
        console.log('check state: ', state)
    }
    const checkValideInput = () => {
        let isValid = true;
        let arrInput = ['numberDate', 'date', 'status', 'part', 'subject']
        for (let i = 0; i < arrInput.length; i++) {
            console.log('check inside loop', state[arrInput[i]], arrInput[i])
            if (!state[arrInput[i]]) {
                isValid = false;
                alert('Missing parameter: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    const handlePasteQuestion = evt => {
        const clipboardItems = evt.clipboardData.items;
        const items = [].slice.call(clipboardItems).filter(function (item) {
            return /^image\//.test(item.type);
        });
        if (items.length === 0) {
            return;
        }
        const item = items[0];
        const blob = item.getAsFile();
        setImgQuestion(URL.createObjectURL(blob))
        let file = new File([blob], "file_name.jpg", { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
        let container = new DataTransfer();
        container.items.add(file);
        const formData = new FormData();
        formData.append('profile_pic', container.files[0], container.files[0].name)
        setFileQuestion(formData)
    };
    const handlePasteAnswer = evt => {
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
        setImgAnswer(URL.createObjectURL(blob))
        let file = new File([blob], "file_name.jpg", { type: "image/jpeg", lastModified: new Date().getTime() }, 'utf-8');
        let container = new DataTransfer();
        container.items.add(file);
        const formData = new FormData();
        formData.append('profile_pic', container.files[0], container.files[0].name)
        setFileAnswer(formData)

    };
    const handleUpdate = async () => {
        if (imgQuestion != null && state.imageQuestion != '' && imgAnswer == null) {
            try {
                const res = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileQuestion)
                console.log('check file question from BE: ', res.data.downloadURL);
                let copyState = { ...state }
                copyState["imageQuestion"] = res.data.downloadURL;
                let isValid = checkValideInput();
                if (isValid === true) {
                    props.updateQuestion(copyState);
                    console.log("data modal: ", copyState);
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (imgQuestion != null && state.imageQuestion == '' && imgAnswer == null) {
            try {
                const res = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileQuestion)
                console.log('check file question from BE: ', res.data.downloadURL);
                let copyState = { ...state }
                copyState["imageQuestion"] = res.data.downloadURL;
                let isValid = checkValideInput();
                if (isValid === true) {
                    props.updateQuestion(copyState);
                    console.log("data modal: ", copyState);
                }
            } catch (error) {
                console.log(error)
            }
        }
        else if (imgAnswer != null && state.imageAnswer != '' && imgQuestion == null) {
            const res = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileAnswer)
            console.log('check file name from BE: ', res.data.downloadURL);
            let copyState = { ...state }
            copyState["imageAnswer"] = res.data.downloadURL;
            copyState["answer"] = state.answer;
            let isValid = checkValideInput();
            if (isValid === true) {
                props.updateQuestion(copyState);
                console.log("data modal: ", state);
            }
        }
        else if (imgAnswer != null && state.imageAnswer == '' && imgQuestion == null) {
            const res = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileAnswer)
            console.log('check file name from BE: ', res.data.downloadURL);
            let copyState = { ...state }
            copyState["imageAnswer"] = res.data.downloadURL;
            copyState["answer"] = state.answer;
            let isValid = checkValideInput();
            if (isValid === true) {
                props.updateQuestion(copyState);
                console.log("data modal: ", state);
            }
        }
        else if (imgAnswer != null && state.imageAnswer != '' && imgQuestion != null && state.imageQuestion != '') {
            const resQuestion = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileQuestion)
            console.log('check file name from BE: ', resQuestion.data.downloadURL);
            const resAnswer = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileAnswer)
            console.log('check file name from BE: ', resAnswer.data.downloadURL);
            let copyState = { ...state }
            copyState["imageQuestion"] = resQuestion.data.downloadURL;
            copyState["imageAnswer"] = resAnswer.data.downloadURL;
            copyState["question"] = state.question;
            copyState["answer"] = state.answer;
            let isValid = checkValideInput();
            if (isValid === true) {
                props.updateQuestion(copyState);
                console.log("data modal: ", state);
            }
        }
        else if (imgAnswer != null && state.imageAnswer == '' && imgQuestion != null && state.imageQuestion == '') {
            const resQuestion = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileQuestion)
            console.log('check file name from BE: ', resQuestion.data.downloadURL);
            const resAnswer = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileAnswer)
            console.log('check file name from BE: ', resAnswer.data.downloadURL);
            let copyState = { ...state }
            copyState["imageQuestion"] = resQuestion.data.downloadURL;
            copyState["imageAnswer"] = resAnswer.data.downloadURL;
            copyState["question"] = state.question;
            copyState["answer"] = state.answer;
            let isValid = checkValideInput();
            if (isValid === true) {
                props.updateQuestion(copyState);
                console.log("data modal: ", state);
            }
        }
        else {
            let isValid = checkValideInput();
            if (isValid === true) {
                props.updateQuestion(state);
                console.log("data modal: ", state);
            }
        }
    }

    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalHeader >Update question</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>
                            {state.imageQuestion != '' && imgQuestion == null ? <img class="imageUpdate" src={state.imageQuestion} width="466" /> : <><img src={imgQuestion} class="previewQuestion" id="previewQuestion" width={466} /></>}
                            {/* <h4>Ảnh thay thế</h4> <br /> <img src={imgQuestion} class="previewQuestion" id="previewQuestion" width={466} /> */}
                            {/* <img src={require(`../../../public/image/${state.image}`)} width="466" />
                            {imgQuestion != null ? <> <h4>Ảnh thay thế</h4> <br /> <img src={imgQuestion} class="previewQuestion" id="previewQuestion" width={466} /> </> : <><img src={require(`../../../public/image/${state.image}`)} width="466" /></>} */}
                            <br />
                            <Label for="question" class="font-weight-bold">
                                Câu hỏi
                            </Label>

                            <Input
                                id="question"
                                onPaste={handlePasteQuestion}
                                name="question"
                                onChange={(event) => handleOnchangeInput(event, "question")}
                                value={state.question}
                            // value={state.question}
                            />
                        </FormGroup>
                        <FormGroup>
                            {state.imageAnswer != '' && imgAnswer == null ? <img class="imageUpdate" src={state.imageAnswer} width="466" /> : <><img src={imgAnswer} class="previewAnswer" id="previewAnswer" width={466} /></>}
                            {/* <h4>Ảnh thay thế</h4> <br /> <img src={imgAnswer} class="previewAnswer" id="previewAnswer" width={466} /> */}
                            <Label for="answer" class="font-weight-bold">
                                Đáp án
                            </Label>
                            <Input
                                id="answer"
                                onPaste={handlePasteAnswer}
                                name="answer"
                                onChange={(event) => handleOnchangeInput(event, "answer")}
                                value={state.answer}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="numberDate" class="font-weight-bold">
                                Số ngày ôn
                            </Label>
                            <Input
                                id="numberDate"
                                name="numberDate"
                                onChange={(event) => handleOnchangeInput(event, "numberDate")}
                                value={state.numberDate}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="date" class="font-weight-bold">
                                Ngày
                            </Label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                onChange={(event) => handleOnchangeInput(event, "date")}
                                value={state.date}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="status" class="font-weight-bold">
                                Trạng thái
                            </Label>
                            <select class="form-control" onChange={(event) => handleOnchangeInput(event, "status")}>
                                {state.status == 1 ? <><option value="1">Đã học</option> <option value="0">Chưa học</option></> : <></>}
                                {state.status == 0 ? <><option value="0">Chưa học</option> <option value="1">Đã học</option></> : <></>}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="part" class="font-weight-bold">
                                Phần
                            </Label>
                            <select class="form-control" onChange={(event) => handleOnchangeInput(event, "part")}>
                                {state.part === "practice" ? <><option value="practice">Thực hành</option> <option value="theory">Lý thuyết</option></> : <>th</>}
                                {state.part === "theory" ? <><option value="theory">Lý thuyết</option> <option value="practice">Thực hành</option></> : <>lt</>}
                            </select>
                        </FormGroup>
                        <FormGroup>
                            <Label for="subject" class="font-weight-bold">
                                Môn học
                            </Label>
                            <Input
                                id="subject"
                                name="subject"
                                type="subject"
                                onChange={(event) => handleOnchangeInput(event, "subject")}
                                value={state.subject}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={() => handleUpdate()}>
                            Update
                        </Button>{' '}
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