import React from 'react';
import './Footer.css';
class Footer extends React.Component {
    render() {
        return (
            <div className="row" style={{marginTop:"30px"}}>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="kv-shop">
                        <h2><span>KV</span>Store</h2>
                        <p>Cửa hàng thời trang nam nữ chuyên bán theo trend</p>
                        <p>Địa chỉ: 180 Cao Lỗ- Phường 4- Quận 8- TP.HCM</p>
                        <p>Điện thoại: +84 123456789</p>
                        <p>Email: info@kvstore.com</p>
                    </div>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="profile">
                        <h2>Về <span>KV</span>Store</h2>
                        <ul>
                            <li><a href="#">Giới thiệu</a></li>
                            <li><a href="#">Liên hệ</a></li>
                            <li><a href="#">Tuyển dụng</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="help">
                        <h2>Hỗ trợ</h2>
                        <ul>
                            <li><a href="#">Hướng dẫn mua hàng</a></li>
                            <li><a href="#">Chính sách đổi trả</a></li>
                            <li><a href="#">Chính sách vận chuyển</a></li>
                            <li><a href="#">Hướng dẫn thanh toán</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                        </ul>
                    </div>
                </div>
                <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                    <div className="links">
                        <h2>Liên kết</h2>
                        <a href="#" >FaceBook</a>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Footer;
