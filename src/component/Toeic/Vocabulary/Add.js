import React, { useState } from 'react';
import {
    Form, Row, FormGroup, Col, Input, Button, Modal, ModalHeader, ModalBody, ModalFooter, Label
} from 'reactstrap';
import moment from 'moment';
import axios from 'axios';
function Add(props) {
    let Today = new Date();
    let date = moment(Today).format('YYYY-MM-DD')
    const [state, setState] = useState({
        imageQuestion: '',
        imageAnswer: '',
        question: '',
        answer: '',
        numberDate: '0',
        date: date,
        status: '0',
        part: 'vocabulary',
        subject: 'english'
    });
    const [imgQuestion, setImgQuestion] = useState(null);
    const [imgAnswer, setImgAnswer] = useState(null);
    const [fileQuestion, setFileQuestion] = useState(null)
    const [fileAnswer, setFileAnswer] = useState(null)
    const handleOnchangeInput = (event, item) => {
        let copyState = { ...state }
        copyState[item] = event.target.value;
        setState({
            ...copyState
        })
    }
    const checkValideInput = () => {
        let isValid = true;
        let arrInput = []
        if (imgQuestion != null && imgAnswer == null) {
            arrInput = ['answer', 'part']
        }
        else if (imgAnswer != null && imgQuestion == null) {
            arrInput = ['question', 'part']
        }
        else if (imgAnswer != null && imgQuestion != null) {
            arrInput = ['part']
        }
        else {
            arrInput = ['question', 'answer', 'part']
        }
        // let arrInput = ['question', 'answer', 'part']
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
    const handleAddNewQuestion = async () => {
        if (imgQuestion != null && imgAnswer == null) {
            try {
                const res = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileQuestion)
                console.log('check file question from BE: ', res.data.downloadURL);
                let copyState = { ...state }
                copyState["imageQuestion"] = res.data.downloadURL;
                copyState["question"] = state.question;
                let isValid = checkValideInput();
                if (isValid === true) {
                    props.createNewQuestion(copyState);
                    console.log("data modal: ", state);
                }
            } catch (error) {
                console.log(error)
            }

        }
        else if (imgAnswer != null && imgQuestion == null) {
            const res = await axios.post(`http://localhost:3000/v1/question/upload-profile-pic`, fileAnswer)
            console.log('check file name from BE: ', res.data.downloadURL);
            let copyState = { ...state }
            copyState["imageAnswer"] = res.data.downloadURL;
            copyState["answer"] = state.answer;
            let isValid = checkValideInput();
            if (isValid === true) {
                props.createNewQuestion(copyState);
                console.log("data modal: ", state);
            }
        }
        else if (imgAnswer != null && imgQuestion != null) {
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
                props.createNewQuestion(copyState);
                console.log("data modal: ", state);
            }
        } else {
            let isValid = checkValideInput();
            if (isValid === true) {
                props.createNewQuestion(state);
                console.log("data modal: ", state);
            }
        }
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
    return (
        <div>
            <Modal isOpen={props.modal} fade={false} toggle={props.toggle}>
                <ModalHeader >Add New Question</ModalHeader>
                <ModalBody>
                    <Form >
                        <FormGroup>

                            <Label for="name" class="font-weight-bold">
                                Câu hỏi
                            </Label>
                            <img src={imgQuestion} class="previewQuestion" id="previewQuestion" width={466} />
                            <Input
                                onPaste={handlePasteQuestion}
                                id="question"
                                name="question"
                                onChange={(event) => handleOnchangeInput(event, "question")}
                                value={state.question}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="mean" class="font-weight-bold">
                                Đáp án
                            </Label>
                            <img src={imgAnswer} class="previewAnswer" id="previewAnswer" width={466} />
                            <Input
                                onPaste={handlePasteAnswer}
                                id="answer"
                                name="answer"
                                onChange={(event) => handleOnchangeInput(event, "answer")}
                                value={state.answer}
                            />
                        </FormGroup>
                        <Button color="primary" onClick={() => handleAddNewQuestion()}>
                            Create
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

export default Add;