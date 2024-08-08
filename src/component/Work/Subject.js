import Add from "./Subject/Add";
import Delete from "./Subject/Delete";
import Update from "./Subject/Update";
import { useEffect, useState } from "react";
import "../Responsive.css"
import axios from "axios";
import moment from "moment";
function Subject() {
    let apiUrl = process.env.REACT_APP_API_URL;
    const [listSubject, setListSubject] = useState([]);
    const [modal, setModal] = useState(false);
    const [modalEdit, setModalEdit] = useState(false);
    const [modalDelete, setModalDelete] = useState(false);
    const [currentSubject, setCurentSubject] = useState();
    const [search, setSearch] = useState();
    const [searchNUll, setSearchNull] = useState(false);
    const [offset, setOffset] = useState(0);
    const Toggle = () => {
        setModal(!modal)
    }
    const ToggleEdit = () => {
        setModalEdit(!modalEdit)
    }
    const ToggleDelete = () => {
        setModalDelete(!modalDelete)
    }
    let Today = new Date();
    let dateQuesToday = moment(Today).format('YYYY-MM-DD');
    useEffect(() => {
        async function fetchApi() {
            let res = await axios.get(`${apiUrl}/api/v1/subject?fields=xid,name,description&offset=${offset}&limit=10`)
            setListSubject(
                res.data.data
            )
        }
        fetchApi()
    }, [modal, modalEdit, modalDelete, offset])

    const createNewSubject = async (data) => {
        try {
            const res = await axios.post(`${apiUrl}/api/v1/subject`, data)
            Toggle()
        } catch (error) {
            console.log(error)
        }
    }
    const updateSubject = async (data) => {
        try {
            let copyData = { name: data.name, description: data.description };
            const res = await axios.put(`${apiUrl}/api/v1/subject/${data.xid}`, copyData)
            ToggleEdit()
        } catch (error) {
            console.log(error)
        }
    }
    const deleteASubject = async (data) => {
        try {
            let res = await axios.delete(`${apiUrl}/api/v1/subject/${data.xid}`)
            ToggleDelete()
        } catch (error) {
            console.log(error)
        }
    }
    const handleEditSubject = (data) => {
        setCurentSubject(data)
        ToggleEdit()
    }
    const handleDeleteSubject = (data) => {
        setCurentSubject(data)
        ToggleDelete()
    }
    const Search = async (event) => {
        // if (event.target.value == '') {
        //     setSearchNull(!searchNUll);
        // }
        setSearch(
            event.target.value
        )
        let res = await axios.get(`${apiUrl}/api/v1/subject?fields=name,description&limit=10&filters=(name%20lk%20%22%25${search}%25%22%20)`);
        setListSubject(
            res.data.data
        )
    }
   
    const handleReducePage = () => {
        setOffset(offset - 10)
    }
    const handleIncreasePage = () => {
        setOffset(offset + 10)
    }
    const handleStartPage = () => {
        setOffset(0)
    }
    const handleEndPage = () => {
        setOffset(listSubject.length)
    }   

    return (
        <>
            <Add
                modal={modal}
                toggle={Toggle}
                createNewSubject={createNewSubject}
            />
            {
                modalEdit &&
                <Update
                    modal={modalEdit}
                    toggle={ToggleEdit}
                    currentSubject={currentSubject}
                    updateSubject={updateSubject}
                />
            }
            {
                modalDelete &&
                <Delete
                    modal={modalDelete}
                    toggle={ToggleDelete}
                    currentSubject={currentSubject}
                    deleteASubject={deleteASubject}
                />
            }

            <div class="container text-center mt-5">
                <div class="row mb-2 ml-1 mt-2">
                    <div class="row col-5">
                        <span><input type='text' onChange={(search) => Search(search)} value={search} class="form-control seacrch_name" placeholder='Tìm kiếm' /></span>
                    </div>
                    <div class="text-right col-7 ml-4">
                        <button class="btn btn-primary text-center" onClick={() => Toggle()}>Thêm môn học</button>
                    </div>
                </div>
                <table class="table table-stripped table-hover bg-light">
                    <thead>
                        <th>Tên môn học</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </thead>
                    <tbody>
                        {listSubject && listSubject.length > 0
                            && listSubject.map((item, index) => {
                                return (
                                    <>

                                        <tr>
                                            <td>{item.name}</td>
                                            <td>{item.description}</td>
                                            <td>
                                                <button class="btn btn-success m-1" onClick={() => handleEditSubject(item)}><i class="fa fa-pencil" aria-hidden="true"></i></button>
                                                <button class="btn btn-danger" onClick={() => handleDeleteSubject(item)}><i class="fa fa-trash" aria-hidden="true"></i></button>
                                            </td>
                                        </tr >


                                    </>
                                )
                            })}
                    </tbody>
                </table>
                <button class="btn btn-secondary" disabled={offset == 0} onClick={() => handleStartPage()}>Start</button>
                <button class="ml-1 btn btn-secondary" disabled={offset == 0} onClick={() => handleReducePage()}><i class="fa fa-chevron-left" aria-hidden="true"></i></button>
                <button class="ml-1 btn btn-secondary" disabled={offset  + 10 > listSubject.length}  onClick={() => handleIncreasePage()}><i class="fa fa-chevron-right" aria-hidden="true"></i></button>
                <button class="ml-1 btn btn-secondary" disabled={offset  + 10 > listSubject.length} onClick={() => handleEndPage()}>End</button>
            </div >
        </>
    )
}
export default Subject;