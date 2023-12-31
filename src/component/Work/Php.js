import Add from "./Php/Add";
import Update from "./Php/Update";
import { useEffect, useState } from "react";
import "../Responsive.css"
import axios from "axios";
import moment from "moment";
import Revise from "./Php/Revise";
function Php() {
    const [listQuestion, setListQuestion] = useState([]);
    const [lengthQuestion, setLengthQuestion] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalRevise, setModalRevise] = useState(false);
    const [currentQuestion, setCurentQuestion] = useState();
    const [QuestionToday, setQuestionToday] = useState([]);
    const [result, setResult] = useState(false);
    const [count, setCount] = useState(0);
    const [BugLengthQuestionToday, setBugLengthQuestionToday] = useState(false);
    const [Delete, setDelete] = useState(false);
    const [search, setSearch] = useState();
    const [searchNUll, setSearchNull] = useState(false);
    const [page, setPage] = useState(1);
    const Toggle = () => {
        setModal(!modal)
    }
    const ToggleEdit = () => {
        setModalEdit(!modalEdit)
    }
    const ToggleRevise = () => {
        setModalRevise(!modalRevise)
    }
    let Today = new Date();
    let dateQuesToday = moment(Today).format('YYYY-MM-DD');
    useEffect(() => {
        async function fetchApi() {
            let res = await axios.get(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question?date=${dateQuesToday}&&part=theory&&subject=Php`)
            setQuestionToday(
                res.data.data
            )
        }
        fetchApi()
    }, [modal, modalEdit, Delete, count, BugLengthQuestionToday, modalRevise])
    useEffect(() => {
        async function fetchApi() {
            let res = await axios.get(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question?subject=Php&&part=theory&&page=${page}&&limit=9`);
            setListQuestion(
                res.data.data
            )
            console.log('check res: ', listQuestion);

        }
        fetchApi()
    }, [modal, modalEdit, Delete, count, BugLengthQuestionToday, searchNUll, page, modalRevise])
    useEffect(() => {
        async function fetchApi() {
            let res = await axios.get(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question?subject=Php&&part=theory`);
            setLengthQuestion(
                res.data.data
            )
        }
        fetchApi()
    }, [BugLengthQuestionToday])
    const createNewQuestion = async (data) => {
        try {
            console.log("check data from parent: ", data)
            const res = await axios.post(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question`, data)
            Toggle()
            console.log('check res create new question from parent: ', res)
        } catch (error) {
            console.log(error)
        }
    }
    const updateQuestion = async (data) => {
        try {
            console.log("check data: ", data);
            console.log("check data from parent in function updateQuestion: ", data)
            const res = await axios.put(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question`, data)
            ToggleEdit()
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditQuestion = (data) => {
        console.log("check current data : ", data);
        setCurentQuestion(data)
        ToggleEdit()
    }
    const handleDeleteQuestion = async (data) => {
        try {
            let res = await axios.delete(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question/${data._id}`)
            console.log("check res: ", res);
        } catch (error) {
            console.log(error)
        }
        setDelete(
            !Delete
        )
    }
    const Search = async (event) => {
        if (event.target.value == '') {
            setSearchNull(!searchNUll);
        }
        setSearch(
            event.target.value
        )
        let res = await axios.get(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question?question=${search}&&subject=Php&&part=theory&&page=${page}&&limit=9`);
        setListQuestion(
            res.data.data
        )
    }
    const handleShowResult = () => {
        setResult(!result)
    }
    const revise = () => {
        lengthQuestion && lengthQuestion.length > 0 &&
            lengthQuestion.map((item, index) => {
                return (
                    <>
                        {moment(item.date).format('YYYY-MM-DD') < moment(Today).format('YYYY-MM-DD') && item.numberDate <= 21 ? handleReviseQuestion(item) : <></>}

                    </>
                )
            })
        ToggleRevise();
    }
    const handleReviseQuestion = async (data) => {
        try {
            const res = await axios.put(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question`, {
                _id: data._id,
                imageQuestion: data.imageQuestion,
                imageAnswer: data.imageAnswer,
                question: data.question,
                answer: data.answer,
                numberDate: `${data.numberDate}`,
                date: moment(Today).format('YYYY-MM-DD'),
                status: `${data.status}`,
                part: data.part,
                subject: data.subject
            })
        } catch (error) {
            console.log(error)
        }
    }
    const handleUpdateNumberCount = async (data, number) => {
        setResult(false)
        let setCurrentDate = new Date();
        setCurrentDate.setDate(setCurrentDate.getDate() + number)
        try {
            const res = await axios.put(`https://hdnghia-academic-be-9ybl.onrender.com/v1/question`, {
                _id: data._id,
                imageQuestion: data.imageQuestion,
                imageAnswer: data.imageAnswer,
                question: data.question,
                answer: data.answer,
                numberDate: `${number}`,
                date: moment(setCurrentDate).format('YYYY-MM-DD'),
                status: `${data.status}`,
                part: data.part,
                subject: data.subject
            })
        } catch (error) {
            console.log(error)
        }
        if (number == 1 || number == 3 || number == 7 || number == 14 || number == 21 || number == 30) {
            // console.log('check length: ', QuestionToday.length)
            if (count == 0) {
                if (count === QuestionToday.length - 2) {
                    // alert('nghia')
                    setBugLengthQuestionToday(
                        !BugLengthQuestionToday
                    )
                }
                else {
                    setCount(
                        count + 1
                    )
                }
            }
            else {
                if (count === QuestionToday.length - 2) {
                    setBugLengthQuestionToday(
                        !BugLengthQuestionToday
                    )
                }
                else {
                    setCount(
                        count + 1
                    )
                }
            }
        }
        if (number == 0) {
            setCount(
                count + 1
            )
        }
        if (count === QuestionToday.length - 1) {
            setCount(
                0
            )
        }
        if (number == 30) {
            handleDeleteQuestion(data);
        }
    }
    const handleReducePage = () => {
        setPage(page - 1)
        console.log(page)
    }
    const handleIncreasePage = () => {
        setPage(page + 1)
        console.log(page)
    }
    const handleStartPage = () => {
        setPage(1)
    }
    const handleEndPage = () => {
        setPage(Math.ceil(lengthQuestion.length / 9))
    }

    return (
        <>
            <Add
                modal={modal}
                toggle={Toggle}
                createNewQuestion={createNewQuestion}
            />
            {
                modalEdit &&
                <Update
                    modal={modalEdit}
                    toggle={ToggleEdit}
                    currentQuestion={currentQuestion}
                    updateQuestion={updateQuestion}
                />
            }
            {
                modalRevise &&
                <Revise
                    modal={modalRevise}
                    toggle={ToggleRevise}
                    revise={revise}
                />
            }

            <div class="container text-center mt-5">
                <div class="w-100 border Study text-center rounded bg-info ">
                    {
                        QuestionToday && QuestionToday.length > 0
                        && QuestionToday.map((item, index) => {
                            return (
                                <>
                                    {index === count ? <div class="h4 mt-3 text-danger">Số câu hỏi cần ôn là: {QuestionToday.length}</div> : <></>}
                                    {index === count && QuestionToday[count].numberDate <= 21 && QuestionToday[count].subject === 'Php' ? <>
                                        <h4 class="m-5">{QuestionToday[count].imageQuestion != '' ? <><img class="revise" src={QuestionToday[count].imageQuestion} width="700" /> <br /> {QuestionToday[count].question} </> : <>{QuestionToday[count].question}</>}</h4>
                                        {result ?
                                            <h4 class='m-5'>{QuestionToday[count].imageAnswer != '' ? <><img class="revise" src={QuestionToday[count].imageAnswer} width="700" /> <br />{QuestionToday[count].answer}</> : <> <div class="bg-white p-2 rounded">{QuestionToday[count].answer}</div></>}</h4> : <></>}
                                        {/* {!result ? <h1 class='m-5'>{QuestionToday[count].question}</h1> : <h1 class='m-5'>{QuestionToday[count].answer}</h1>} */}
                                        <button class='btn btn-danger' onClick={() => handleShowResult()}>Xem đáp án</button>
                                        <div class="mb-5 mt-2">
                                            {
                                                QuestionToday[count].numberDate === 0 ? <>
                                                    <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 0)}>Học lại </button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 1)}>1 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 3)}>3 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 7)}>7 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 14)}>14 ngày</button>
                                                </> : <></>
                                            }
                                            {
                                                QuestionToday[count].numberDate === 1 ? <>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 0)}>Ôn lại </button>
                                                    <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 1)}>1 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 3)}>3 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 7)}>7 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 14)}>14 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 21)}>21 ngày</button>
                                                </> : <></>
                                            }
                                            {
                                                QuestionToday[count].numberDate === 3 ? <>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 0)}>Ôn lại </button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 1)}>1 ngày</button>
                                                    <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 3)}>3 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 7)}>7 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 14)}>14 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 21)}>21 ngày</button>
                                                </> : <></>
                                            }
                                            {
                                                QuestionToday[count].numberDate === 7 ? <>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 0)}>Ôn lại </button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 1)}>1 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 3)}>3 ngày</button>
                                                    <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 7)}>7 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 14)}>14 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 21)}>21 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 30)}>Đã thuộc</button>
                                                </> : <></>
                                            }
                                            {
                                                QuestionToday[count].numberDate === 14 ? <>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 0)}>Ôn lại </button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 1)}>1 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 3)}>3 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 7)}>7 ngày</button>
                                                    <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 14)}>14 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 21)}>21 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 30)}>Đã thuộc</button>
                                                </> : <></>
                                            }
                                            {
                                                QuestionToday[count].numberDate === 21 ? <>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 0)}>Ôn lại </button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 1)}>1 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 3)}>3 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 7)}>7 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 14)}>14 ngày</button>
                                                    <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 21)}>21 ngày</button>
                                                    <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(QuestionToday[count], 30)}>Đã thuộc</button>
                                                </> : <></>
                                            }
                                        </div>
                                    </> : <></>}
                                </>
                            )
                        })
                    }
                </div>
                {QuestionToday.length == 0 ? <h1 class="w-100 p-5 border Study text-center rounded bg-info ">Hết rùi nha</h1> : <></>}
                <div class="row mb-2 ml-1 mt-2">
                    <div class="row col-5">
                        <span><input type='text' onChange={(search) => Search(search)} value={search} class="form-control seacrch_name" placeholder='Tìm kiếm' /></span>
                        <span><input type="button" class="search_btn btn btn-success ml-2" value="Tìm kiếm câu hỏi" /></span>
                    </div>
                    <div class="text-right col-7 ml-4">
                        <button class="btn btn-primary text-center" onClick={() => Toggle()}>Thêm câu hỏi</button>
                    </div>
                </div>
                <table class="table table-stripped table-hover bg-light">
                    <thead>
                        <th>Câu hỏi</th>
                        <th>Đáp án</th>
                        <th>Ngày ôn</th>
                        <th>Ngày</th>

                        <th>Thao tác</th>
                    </thead>
                    <tbody>
                        {listQuestion && listQuestion.length > 0
                            && listQuestion.map((item, index) => {
                                return (
                                    <>

                                        <tr>
                                            <td width="25%">{item.imageQuestion != '' ? <> <img class="image_table" src={item.imageQuestion} width="50" /> <br />{item.question} </> : <>{item.question}</>}</td>
                                            {/* <td width="25%">{item.question}</td> */}
                                            {/* <td>{item.question}</td> */}
                                            <td width="30%">{item.imageAnswer != '' ? <> <img class="image_table" src={item.imageAnswer} width="50" /> <br />{item.answer} </> : <>{item.answer}</>}</td>
                                            {/* <td width="30%">{item.imageAnswer.substring(    item.answer.lastIndexOf(" // ") - 3, item.answer.lastIndexOf(" // ")) == "jpg" ? <><img src={require(`../../public/image/${item.answer.substring(0, item.answer.lastIndexOf(" // "))}`)} width="50" /> <br /> {item.answer.substring(item.answer.lastIndexOf(" // ") + 3, item.answer.length)} </> : <>{item.answer}</>}</td> */}
                                            {/* <td>{item.answer}</td> */}
                                            <td>{item.numberDate}</td>
                                            <td>{moment(item.date).format("DD/MM/YYYY")}</td>

                                            <td>
                                                <button class="btn btn-primary" onClick={() => ToggleRevise()}><i class="fa fa-repeat" aria-hidden="true"></i></button>
                                                <button class="btn btn-success m-1" onClick={() => handleEditQuestion(item)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                <button class="btn btn-danger" onClick={() => handleDeleteQuestion(item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr >


                                    </>
                                )
                            })}
                    </tbody>
                </table>
                <button class="btn btn-secondary" disabled={page <= 1} onClick={() => handleStartPage()}>Start</button>
                <button class="ml-1 btn btn-secondary" disabled={page <= 1} onClick={() => handleReducePage()}><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                <button class="ml-1 btn btn-secondary" disabled={page >= Math.ceil(lengthQuestion.length / 9)} onClick={() => handleIncreasePage()}><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
                <button class="ml-1 btn btn-secondary" disabled={page >= Math.ceil(lengthQuestion.length / 9)} onClick={() => handleEndPage()}>End</button>
            </div >
        </>
    )
}
export default Php;