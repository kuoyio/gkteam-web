import { Layout } from "antd";
import Link from "next/link";

const { Footer } = Layout;
const LayoutFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer
      style={{ backgroundColor: "#ffffff" }}
      className="flex flex-col items-center justify-center h-16 mt-auto layout-footer gap-y-1"
    >
      <span className="text-xs text-gray-500">
        © {year} 公考小分队版权所有
      </span>
      <Link
        href="https://beian.miit.gov.cn/#/Integrated/index"
        passHref={true}
        target={"_blank"}
      >
        <span className="text-xs text-gray-500">{"粤ICP备2020111542号-6"}</span>
      </Link>
    </Footer>
  );
};

export default LayoutFooter;
