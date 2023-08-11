import './Sidebar.scss';
import { useState } from 'react';
import {
    Link
} from "react-router-dom";
function Sidebar() {
    const toggle = () => {
        var menu = document.querySelector('.sidebar')
        var menuIcon = document.querySelector('.menu')
        menu.classList.toggle("fliph");
        menuIcon.classList.toggle("fliph");
    }

    return (
        <>
            <header class="header bg-info" style={{ "position": "fixed", "top": "0", "z-index": "1", "width": "100%", "border-bottom": "1px solid #ffffff" }}>
                {/* <div class="col-1"></div> */}
                <div class="menu">
                    <button class="btn btn-info " style={{}} onClick={() => toggle()}>
                        <i class="fa fa-bars" aria-hidden="true"></i>
                    </button>
                </div>
                {/* <div class="text-white col-7 text-center h5" style={{ "margin": "auto", "padding-left": "16%" }}></div> */}
            </header>
            <div class="main bg-info border-right border-white" style={{ "z-index": "1" }}>
                <aside>
                    <div class="sidebar left ">
                        <ul class="list-sidebar bg-info">
                            <li> <Link to="/Home" activeClassName="active" exact={true}><i class="fa fa-bar-chart-o"></i> <span class="nav-label">trang chủ</span></Link></li>
                            <li> <a href="#" data-toggle="collapse" data-target="#english" class="collapsed active" > <i class="fa fa-pencil"></i> <span class="nav-label">Tiếng anh</span> <span class="fa fa-chevron-left pull-right"></span> </a>
                                <ul class="sub-menu collapse" id="english">
                                    <li class="active"><Link to="/vocabulary" activeClassName="active" exact={true}>Từ vựng</Link></li>
                                    <li class="active"><Link to="/grammar" activeClassName="active" exact={true}>Ngữ pháp</Link></li>
                                    <li class="active"><Link to="/listenning" activeClassName="active" exact={true}>Nghe</Link></li>
                                    <li class="active"><Link to="/reading" activeClassName="active" exact={true}>Đọc</Link></li>
                                    <li class="active"><Link to="/speaking" activeClassName="active" exact={true}>Nói</Link></li>
                                    <li class="active"><Link to="/writting" activeClassName="active" exact={true}>Viết</Link></li>
                                </ul>
                            </li>

                            <li> <a href="" data-toggle="collapse" data-target="#university" class="collapsed active" > <i class="fa fa-book"></i> <span class="nav-label">Đại học</span> <span class="fa fa-chevron-left pull-right"></span> </a>
                                <ul class="sub-menu collapse" id="university">
                                    <li ><Link to="/Android" activeClassName="active" exact={true}>Lập trình ứng dụng android</Link></li>
                                    <li ><Link to="/olap" activeClassName="active" exact={true}>Kho dữ liệu và olap</Link></li>
                                    <li ><Link to="/Ptdlkd" activeClassName="active" exact={true}>Phân tích dữ liệu kinh doanh</Link></li>
                                    <li ><Link to="/Sales" activeClassName="active" exact={true}>Sales</Link></li>
                                    <li ><Link to="/Pldc" activeClassName="active" exact={true}>Pháp luật đại cương</Link></li>
                                </ul>
                            </li>
                            <li> <a href="" data-toggle="collapse" data-target="#BE" class="collapsed active" > <i class="fa fa-book"></i> <span class="nav-label">Back-End</span> <span class="fa fa-chevron-left pull-right"></span> </a>
                                <ul class="sub-menu collapse" id="BE">
                                    <li ><Link to="/Github" activeClassName="active" exact={true}>Github</Link></li>
                                    <li ><Link to="/Sql" activeClassName="active" exact={true}>Sql</Link></li>
                                    <li ><Link to="/MongoDB" activeClassName="active" exact={true}>MongoDB</Link></li>
                                    <li ><Link to="/Firebase" activeClassName="active" exact={true}>FireBase</Link></li>
                                    <li ><Link to="/Nodejs" activeClassName="active" exact={true}>Nodejs</Link></li>
                                    <li ><Link to="/Php" activeClassName="active" exact={true}>Php</Link></li>
                                </ul>
                            </li>
                            <li> <a href="" data-toggle="collapse" data-target="#FE" class="collapsed active" > <i class="fa fa-book"></i> <span class="nav-label">Front-End</span> <span class="fa fa-chevron-left pull-right"></span> </a>
                                <ul class="sub-menu collapse" id="FE">
                                    <li ><Link to="/Reactjs" activeClassName="active" exact={true}>Reactjs</Link></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </>
    )
}
export default Sidebar;