import Button from "../../components/shared/Button";

import Grid from "../../components/shared/Grid";

import Img from "@/components/shared/Img/Img";
import Link from "next/link";
import { memo } from "react";

const footerAboutLinks = [
  {
    display: "Giới Thiệu",
    path: "/about",
  },
  {
    display: "Liên Hệ",
    path: "/about",
  },
  {
    display: "Tuyển Dụng",
    path: "/about",
  },
  {
    display: "Tin Tức",
    path: "/about",
  },
  {
    display: "Hệ Thống Của Hàng",
    path: "/about",
  },
];

const footerCustomerLinks = [
  {
    display: "Chính Sách Đổi Trả",
    path: "/about",
  },
  {
    display: "Chính Sách Bảo Hành",
    path: "/about",
  },
  {
    display: "Chính Sách Hoàn Tiền",
    path: "/about",
  },
];

const DefaultFooter = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="new_footer_logo">
          <Link href="/" className="relative w-[10%] h-10 block">
            <Img
              src="/images/Logo-2.png"
              className="footer_logo object-contain"
              alt="yolo-logo"
              layout="fill"
            />
          </Link>
        </div>
        <div className="new_footer_top">
          <Grid col={4} mdCol={2} smCol={1} gap={10}>
            <div>
              <div className="f_widget company_widget wow fadeInLeft">
                <h3 className="f-title f_600 t_color f_size_18">
                  Nhận cập nhập
                </h3>
                <p>Không bỏ lỡ những sản phẩm mới của chúng tôi</p>
                {/* <form action="#" className="form-field" method="post" noValidate={true} _lpchecked="1">
                  <input type="text" className="form-field_input" placeholder=" " />
                  <label htmlFor="name" className="form-field_label">Email</label>
                </form> */}
                <Link href="/">
                  <Button
                    backgroundColor={""}
                    size={""}
                    icon={""}
                    animate={false}
                  >
                    Đăng kí
                  </Button>
                </Link>
              </div>
            </div>
            <div>
              <div className="f_widget about-widget pl_70 wow fadeInLeft">
                <h3 className="f-title f_600 t_color f_size_18">Về Yolo</h3>
                <ul className="list-unstyled f_list">
                  {footerAboutLinks.map((item, index) => (
                    <li key={index}>
                      <a href="/#">{item.display}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="f_widget about-widget pl_70 wow fadeInLeft">
                <h3 className="f-title f_600 t_color f_size_18">
                  Chăm sóc khách hàng
                </h3>
                <ul className="list-unstyled f_list">
                  {footerCustomerLinks.map((item, index) => (
                    <li key={index}>
                      <a href="/#">{item.display}</a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="f_widget social-widget pl_70 wow fadeInLeft">
                <h3 className="f-title f_600 t_color f_size_18">
                  Team Solutions
                </h3>
                <div className="f_social_icon">
                  <a href="/#">
                    <i className="bx bxl-facebook-circle"></i>
                  </a>
                  <a href="/#">
                    <i className="bx bxl-instagram-alt"></i>
                  </a>
                  <a href="/#">
                    <i className="bx bxl-twitter"></i>
                  </a>
                  <a href="/#">
                    <i className="bx bxl-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </Grid>
        </div>
      </div>
    </footer>
  );
};

export default memo(DefaultFooter);
