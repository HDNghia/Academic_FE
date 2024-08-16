import Add from "./StudyWord/Add";
import Delete from "./StudyWord/Delete";
import Revise from "./StudyWord/Revise";
import Update from "./StudyWord/Update";
import { useEffect, useState } from "react";
import "../Responsive.css";
import axios from "axios";
import Select from "react-select";
import { Media } from "reactstrap";
function StudyWord() {
  let apiUrl = process.env.REACT_APP_API_URL;
  const [loading, setLoading] = useState(false);
  const [listWord, setListWord] = useState([]);
  const [lengthWord, setLengthWord] = useState([]);
  const [listWordToday, setListWordToday] = useState([]);
  const [getListWordToday, setGetListWordToday] = useState(false);
  const [listSubject, setListSubject] = useState([]);
  const [selectSubject, setSelectSubject] = useState(null);
  const [modal, setModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [modalDelete, setModalDelete] = useState(false);
  const [modalReset, setModalReset] = useState(false);
  const [currentWord, setCurentWord] = useState();
  const [search, setSearch] = useState();
  const [offset, setOffset] = useState(0);
  const [count, setCount] = useState(0);
  const [result, setResult] = useState(false);
  const Toggle = () => {
    setModal(!modal);
  };
  const ToggleEdit = () => {
    setModalEdit(!modalEdit);
  };
  const ToggleDelete = () => {
    setModalDelete(!modalDelete);
  };

  const ToggleResetToday = () => {
    setModalReset(!modalReset);
  };

  useEffect(() => {
    async function fetchApi() {
      let res = await axios.get(
        `${apiUrl}/api/v1/revise?fields=xid,question,imageQuestion,imageQuestion_url,answer,imageAnswer,imageAnswer_url,numberDate,date,subject{xid,name,description}&subject_id=${selectSubject}&limit=10000`
      );
      setLengthWord(res.data.data);
    }
    fetchApi();
  }, [modal, modalEdit, modalDelete, modalReset, selectSubject, getListWordToday]);

  useEffect(() => {
    async function fetchApi() {
      let res = await axios.get(
        `${apiUrl}/api/v1/revise?fields=xid,question,imageQuestion,imageQuestion_url,answer,imageAnswer,imageAnswer_url,numberDate,date,subject{xid,name,description}&subject_id=${selectSubject}&offset=${offset}&limit=10`
      );
      setListWord(res.data.data);
    }
    fetchApi();
  }, [modal, modalEdit, modalDelete, modalReset, offset, selectSubject, getListWordToday]);

  useEffect(() => {
    async function fetchApi() {
      let res = await axios.get(
        `${apiUrl}/api/v1/revise?fields=xid,question,imageQuestion,imageQuestion_url,answer,imageAnswer,imageAnswer_url,numberDate,date,subject{xid,name,description}&type=today&subject_id=${selectSubject}&limit=1000`
      );
      setListWordToday(res.data.data);
    }
    fetchApi();
  }, [modal, modalEdit, modalDelete, modalReset, offset, selectSubject, getListWordToday]);

  useEffect(() => {
    async function fetchApi() {
      let res = await axios.get(
        `${apiUrl}/api/v1/subject?fields=xid,name,description&limit=1000`
      );
      setListSubject(res.data.data);
    }
    fetchApi();
  }, [modal, modalEdit, modalDelete, offset]);

  const SearchSubject = async (event) => {
    if (event.xid) {
      if (event.xid == "default") {
        setSelectSubject(event.value);
      } else {
        setSelectSubject(event.xid);
      }
    }
    let res = await axios.get(
      `${apiUrl}/api/v1/subject?fields=name,description&limit=10&filters=(name%20lk%20%22%25${event.target.value}%25%22%20)`
    );
    setListSubject(res.data.data);
  };

  const createNewWord = async (data) => {
    const formData = new FormData();
    formData.append("imageQuestion", data.imageQuestion);
    formData.append("imageAnswer", data.imageAnswer);
    formData.append("subject_id", data.subject_id);
    formData.append("question", data.question);
    formData.append("answer", data.answer);
    formData.append("date", data.date);
    formData.append("numberDate", data.numberDate);
    console.log("chekc data: ", data);
    console.log("chekc formData: ", formData);
    try {
      const res = await axios.post(`${apiUrl}/api/v1/revise`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Toggle();
    } catch (error) {
      console.log(error);
    }
  };
  const updateWord = async (data) => {
    const formDataUpdate = new FormData();
    formDataUpdate.append("xid", data.xid);
    formDataUpdate.append("imageQuestion", data.imageQuestion);
    formDataUpdate.append("imageAnswer", data.imageAnswer);
    formDataUpdate.append("subject_id", data.subject_id);
    formDataUpdate.append("question", data.question);
    formDataUpdate.append("answer", data.answer);
    formDataUpdate.append("date", data.date);
    formDataUpdate.append("numberDate", data.numberDate);
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/update-revise`,
        formDataUpdate,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      ToggleEdit();
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowResult = () => {
    setResult(!result);
  };
  const handleUpdateNumberCount = async (data, number) => {
    setLoading(true);
    setResult(false);
    try {
      const res = await axios.post(
        `${apiUrl}/api/v1/update-revise`,
        {
          xid: data.xid,
          imageQuestion: data.imageQuestion,
          imageAnswer: data.imageAnswer,
          question: data.question,
          answer: data.answer,
          numberDate: number,
          date: data.date,
          subject_id: data.subject?.xid,
          type: 'revise_word'
        }
      );
      setGetListWordToday(!getListWordToday);
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(async () => {
        setLoading(false);
      }, 800)
    }
    if (number == 0) {
      setCount(count + 1);
    }
    if (count === listWordToday.length - 1) {
      setCount(0);
    }
  };
  const deleteAWord = async (data) => {
    try {
      let res = await axios.delete(`${apiUrl}/api/v1/revise/${data.xid}`);
      ToggleDelete();
    } catch (error) {
      console.log(error);
    }
  };
  const resetWordToday = async (data) => {
    try {
      let res = await axios.post(`${apiUrl}/api/v1/reset-word`, data);
      ToggleResetToday();
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditWord = (data) => {
    setCurentWord(data);
    ToggleEdit();
  };
  const handleDeleteWord = (data) => {
    setCurentWord(data);
    ToggleDelete();
  };

  const handleResetToday = () => {
    setCurentWord({ 'subject_id': selectSubject });
    ToggleResetToday();
  };

  const handleSearch = async (event) => {
    setSearch(event.target.value);

    setTimeout(async () => {
      let res = await axios.get(
        `${apiUrl}/api/v1/revise?fields=xid,question,imageQuestion,imageQuestion_url,answer,imageAnswer,imageAnswer_url,numberDate,date,subject{xid,name,description}&limit=10&filters=(question%20lk%20%22%25${event.target.value}%25%22%20)`
      );
      setListWord(res.data.data);
    }, 300);
  };

  const handleReducePage = () => {
    setOffset(offset - 10);
  };
  const handleIncreasePage = () => {
    setOffset(offset + 10);
  };
  const handleStartPage = () => {
    setOffset(0);
  };
  const handleEndPage = () => {
    setOffset(Math.floor(lengthWord.length / 10) * 10);
  };

  const options = listSubject.map((subject) => ({
    xid: subject.xid,
    value: subject.name,
    label: subject.name,
  }));

  const defaultOption = {
    xid: "default",
    value: null,
    label: "Please select an option",
  };

  options.unshift(defaultOption);

  const customStyles = {
    container: (provided) => ({
      ...provided,
      width: "200px",
      marginLeft: "2%",
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

  return (
    <>
      <Add
        modal={modal}
        toggle={Toggle}
        createNewWord={createNewWord}
        selectSubject={selectSubject}
        onChange={SearchSubject}
        options={options}
        isSearchable={true}
      />
      {modalEdit && (
        <Update
          modal={modalEdit}
          toggle={ToggleEdit}
          currentWord={currentWord}
          updateWord={updateWord}
          value={selectSubject?.value}
          onChange={SearchSubject}
          options={options}
          isSearchable={true}
          imageQuestion={currentWord.imageQuestion_url ?? undefined}
          imageAnswer={currentWord.imageAnswer_url ?? undefined}
        />
      )}
      {modalDelete && (
        <Delete
          modal={modalDelete}
          toggle={ToggleDelete}
          currentWord={currentWord}
          deleteAWord={deleteAWord}
        />
      )}
      {modalReset && (
        <Revise
          modal={modalReset}
          toggle={ToggleResetToday}
          currentWord={currentWord}
          resetWordToday={resetWordToday}
        />
      )}

      <div class="container mt-5">
        <div class="w-100 border rounded bg-info ">
          {loading && <div class="p-5 text-center"> <div class="spinner-border" role="status" /> </div>}
          {
            !loading && listWordToday && listWordToday.length > 0
            && listWordToday.map((item, index) => {
              return (
                <>
                  {index === count ? <div class="h4 mt-3 text-center text-danger">Số câu hỏi cần ôn là: {listWordToday.length}</div> : <></>}
                  {index === count && listWordToday[count].numberDate <= 21 ? <>
                    <div class="m-5">{listWordToday[count].imageQuestion != null ? <div class='text-center'><img class="revise" src={listWordToday[count].imageQuestion_url} width="700" /> <br /> {listWordToday[count].question != null ? <h4
                      dangerouslySetInnerHTML={{
                        __html: listWordToday[count].question.replace(/\n/g, "<br/>"),
                      }}
                    ></h4> : ''} </div> : <div class="bg-white p-2 rounded" style={{ maxWidth: '500px', margin: '0 auto', }}>{listWordToday[count].question && <div dangerouslySetInnerHTML={{
                      __html: listWordToday[count].question.replace(/\n/g, "<br/>"),
                    }}
                    ></div>}</div>}</div>
                    {result ?
                      <div class='m-5'>{listWordToday[count].imageAnswer != null ? <div class='text-center'><img class="revise" src={listWordToday[count].imageAnswer_url} width="700" /> <br /> {listWordToday[count].answer != null ? <h4 dangerouslySetInnerHTML={{
                        __html: listWordToday[count].answer.replace(/\n/g, "<br/>"),
                      }}
                      ></h4> : ''}</div> : <>{listWordToday[count].answer != null ? <div class="bg-white p-2 rounded" style={{ maxWidth: '500px', margin: '0 auto', }} dangerouslySetInnerHTML={{
                        __html: listWordToday[count].answer.replace(/\n/g, "<br/>"),
                      }} /> : ''}</>}</div> : <></>}
                    {/* {!result ? <h1 class='m-5'>{listWordToday[count].question}</h1> : <h1 class='m-5'>{listWordToday[count].answer}</h1>} */}
                    <div class="text-center">
                      <button class='btn btn-danger' onClick={() => handleShowResult()}>Xem đáp án</button>
                    </div>
                    <div class="mb-5 mt-2 text-center">
                      {
                        listWordToday[count].numberDate == 0 ? <>
                          <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 0)}>Học lại </button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 1)}>1 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 3)}>3 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 7)}>7 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 14)}>14 ngày</button>
                        </> : <></>
                      }
                      {
                        listWordToday[count].numberDate == 1 ? <>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 0)}>Ôn lại </button>
                          <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 1)}>1 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 3)}>3 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 7)}>7 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 14)}>14 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 21)}>21 ngày</button>
                        </> : <></>
                      }
                      {
                        listWordToday[count].numberDate == 3 ? <>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 0)}>Ôn lại </button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 1)}>1 ngày</button>
                          <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 3)}>3 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 7)}>7 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 14)}>14 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 21)}>21 ngày</button>
                        </> : <></>
                      }
                      {
                        listWordToday[count].numberDate == 7 ? <>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 0)}>Ôn lại </button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 1)}>1 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 3)}>3 ngày</button>
                          <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 7)}>7 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 14)}>14 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 21)}>21 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 30)}>Đã thuộc</button>
                        </> : <></>
                      }
                      {
                        listWordToday[count].numberDate == 14 ? <>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 0)}>Ôn lại </button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 1)}>1 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 3)}>3 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 7)}>7 ngày</button>
                          <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 14)}>14 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 21)}>21 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 30)}>Đã thuộc</button>
                        </> : <></>
                      }
                      {
                        listWordToday[count].numberDate == 21 ? <>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 0)}>Ôn lại </button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 1)}>1 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 3)}>3 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 7)}>7 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 14)}>14 ngày</button>
                          <button class='text-center btn btn-secondary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 21)}>21 ngày</button>
                          <button class='text-center btn btn-primary m-1' onClick={() => handleUpdateNumberCount(listWordToday[count], 30)}>Đã thuộc</button>
                        </> : <></>
                      }
                    </div>
                  </> : <></>}
                </>
              )
            })
          }
        </div>
        {listWordToday.length == 0 && <h1 class="w-100 p-5 border Study text-center rounded bg-info">
          Hết rùi nha
        </h1>}
        <div className="row mb-2 ml-1 mt-2">
          <div className="row col-9">
            <span>
              <input
                optionFilterProp="label"
                type="text"
                onChange={(search) => handleSearch(search)}
                value={search}
                className="form-control search_name"
                placeholder="Tìm kiếm"
              />
            </span>
            <span>
              <Select
                value={selectSubject?.value}
                onChange={SearchSubject}
                options={options}
                isSearchable={true}
                styles={customStyles}
              />
            </span>
          </div>
          <div className="col-3 d-flex justify-content-end align-items-center flex-column flex-md-row">
            <button className="btn btn-warning mb-2 mb-md-0 mr-md-2" onClick={() => handleResetToday()}>
              Reset
            </button>
            <button className="btn btn-primary" onClick={() => Toggle()}>
              Thêm
            </button>
          </div>
        </div>
        <table class="table table-stripped table-hover bg-light">
          <thead>
            <th>Tên môn học</th>
            <th>Câu hỏi</th>
            <th>Số ngày ôn</th>
            <th>Ngày</th>
            <th>Thao tác</th>
          </thead>
          <tbody>
            {listWord &&
              listWord.length > 0 &&
              listWord.map((item, index) => {
                return (
                  <>
                    <tr>
                      <td>{item.subject?.name}</td>
                      <td>
                        <Media>
                          {item.imageQuestion ? (
                            <Media left>
                              <Media
                                object
                                src={item?.imageQuestion_url}
                                alt="image question"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </Media>
                          ) : (
                            ""
                          )}
                          <Media body>
                            {item.question != null ? <div
                              style={{
                                maxWidth: '300px',
                                display: '-webkit-box',
                                WebkitLineClamp: 5, // Giới hạn hiển thị 5 dòng
                                WebkitBoxOrient: 'vertical',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'normal'
                              }}
                              dangerouslySetInnerHTML={{
                                __html: item.question.replace(/\n/g, "<br/>"),
                              }}
                            ></div> : ''}
                          </Media>
                        </Media>
                      </td>
                      <td>{item.numberDate}</td>
                      <td>{item.date}</td>
                      <td>
                        <div class='text-center'>
                          <button
                            class="btn btn-success m-1"
                            onClick={() => handleEditWord(item)}
                          >
                            <i class="fa fa-pencil" aria-hidden="true"></i>
                          </button>
                          <button
                            class="btn btn-danger"
                            onClick={() => handleDeleteWord(item)}
                          >
                            <i class="fa fa-trash" aria-hidden="true"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
        <div class='text-center'>
          <button
            class="btn btn-secondary"
            disabled={offset == 0}
            onClick={() => handleStartPage()}
          >
            Start
          </button>
          <button
            class="ml-1 btn btn-secondary"
            disabled={offset == 0}
            onClick={() => handleReducePage()}
          >
            <i class="fa fa-chevron-left" aria-hidden="true"></i>
          </button>
          <button
            class="ml-1 btn btn-secondary"
            disabled={lengthWord.length - offset <= 10}
            onClick={() => handleIncreasePage()}
          >
            <i class="fa fa-chevron-right" aria-hidden="true"></i>
          </button>
          <button
            class="ml-1 btn btn-secondary"
            disabled={lengthWord.length - offset <= 10}
            onClick={() => handleEndPage()}
          >
            End
          </button>
        </div>
      </div>
    </>
  );
}
export default StudyWord;
