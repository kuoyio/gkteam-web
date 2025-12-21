import { Layout } from "antd";
import Link from "next/link";

const { Footer } = Layout;

const LayoutFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer className="bg-white border-t border-ant-grey-100 !py-4 !px-4 sm:!px-6">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <span className="text-sm text-ant-grey-500">
          © {year} 公考小分队版权所有
        </span>
        <Link
          href="https://beian.miit.gov.cn/#/Integrated/index"
          target="_blank"
          className="text-sm !text-ant-grey-500"
        >
          粤ICP备2020111542号-6
        </Link>
      </div>
    </Footer>
  );
};

export default LayoutFooter;
