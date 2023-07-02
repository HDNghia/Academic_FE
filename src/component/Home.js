import { useHistory } from "react-router-dom"
import { useState, useEffect } from "react"
import { map } from "jquery";
import axios from "axios";
function Home() {
    let countVocabulary = 0;
    let countAndroid = 0;
    let countCommerce = 0;
    let countBusinessDataAnalysisTheory = 0;
    const [Vocabulary, setVocabulary] = useState();
    const [Android, setAndroid] = useState();
    const [commerce, setCommerce] = useState();
    const [businessDataAnalysisTheory, setBusinessDataAnalysisTheory] = useState();
    let history = useHistory()
    const handleRedirect = (name) => {
        if (name === "language") {
            history.replace('/Vocabulary')
        }
        else if (name === "grammar") {
            history.replace('/Vocabulary')
        }
        else if (name === "android_theory") {
            history.replace('/Android_theory')
        }
        else if (name === "android_practice") {
            history.replace('/Android_practice')
        }
        else if (name === "commerce_theory") {
            history.replace('/')
        }
        else if (name === "commerce_theory") {
            history.replace('/')
        }
        else if (name === "business_data_analysis_theory") {
            history.replace('/')
        }
        else if (name === "business_data_analysis_theory") {
            history.replace('/')
        }
    }
    useEffect(() => {
        async function fetchMyAPI() {
            let res = await axios.get(`https://vigorous-quiet-sherbet.glitch.me/v1/question?subject=english`);
            let res1 = await axios.get(`https://vigorous-quiet-sherbet.glitch.me/v1/question?subject=android`);

            setVocabulary(
                res.data ? res.data.data : []
            )
            setAndroid(
                res1.data ? res1.data.data : []
            )
            setCommerce(
                0
            )
            setBusinessDataAnalysisTheory(
                0
            )
            console.log('check vocabulary: ', res.data.data);

        }

        fetchMyAPI()
    }, [])
    Vocabulary && Vocabulary.length > 0 &&
        Vocabulary.map((item, index) => {
            return (
                <>
                    {!item.status ? <></> : countVocabulary = countVocabulary + 1}
                </>
            )
        })
    Android && Android.length > 0 &&
        Android.map((item, index) => {
            return (
                <>
                    {!item.status ? <></> : countAndroid = countAndroid + 1}
                </>
            )
        })
    return (
        <>
            <div class="container ">
                <div class="row">
                    <div class="card col-3 mt-1">
                        <div class="card-header font-weight-bold">
                            Tiếng anh
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Đã học</h5>
                            <p class="card-text">{countVocabulary}</p>
                            <div class="row">
                                <button onClick={() => handleRedirect('language')} class="btn btn-primary col mr-1">Từ vựng</button>
                                <button onClick={() => handleRedirect('grammar')} class="btn btn-primary col">Ngữ pháp</button>
                            </div>
                        </div>
                    </div>
                    <div class="card col-3 mt-1">
                        <div class="card-header font-weight-bold">
                            Android
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Đã học</h5>
                            <p class="card-text">{countAndroid}</p>
                            <div class="row">
                                <button onClick={() => handleRedirect('android_theory')} class="btn btn-primary col mr-1">Lý thuyết</button>
                                <button onClick={() => handleRedirect('android_practice')} class="btn btn-primary col">Thực hành</button>
                            </div>
                        </div>
                    </div>
                    <div class="card col-3 mt-1">
                        <div class="card-header font-weight-bold">
                            Thương mại điện tủ
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Đã học</h5>
                            <p class="card-text">{countCommerce}</p>
                            <div class="row">
                                <button onClick={() => handleRedirect('e-commerce_theory')} class="btn btn-primary col mr-1">Lý thuyết</button>
                                <button onClick={() => handleRedirect('e-commerce_practice')} class="btn btn-primary col">Thực hành</button>
                            </div>
                        </div>
                    </div>
                    <div class="card col-3 mt-1">
                        <div class="card-header font-weight-bold">
                            Phân tích dữ liệu kinh doanh
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">Đã học</h5>
                            <p class="card-text">{countBusinessDataAnalysisTheory}</p>
                            <div class="row">
                                <button onClick={() => handleRedirect('business_data_analysis_theory')} class="btn btn-primary col mr-1">Lý thuyết</button>
                                <button onClick={() => handleRedirect('business_data_analysis_practice')} class="btn btn-primary col">Thực hành</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}
export default Home