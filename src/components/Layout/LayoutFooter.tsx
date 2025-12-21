import { Divider, Layout } from "antd";
import Link from "next/link";

const { Footer } = Layout;

const LayoutFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer className="bg-white border-t border-ant-grey-100 !p-0">
      <div className="flex flex-col md:flex-row justify-between items-center py-4 px-4 sm:px-6">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="text-sm text-ant-grey-500">
            © {year} 公考小分队版权所有
          </span>
          <Link
            href="https://beian.miit.gov.cn/#/Integrated/index"
            target="_blank"
          >
            <span className="text-xs text-ant-grey-400 hover:text-ant-blue-500">
              粤ICP备2020111542号-6
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <Link href="/privacy" target="_blank">
            <span className="text-sm text-ant-grey-500 hover:text-ant-blue-500">
              隐私政策
            </span>
          </Link>
          <Divider orientation="vertical" />
          <Link href="/terms" target="_blank">
            <span className="text-sm text-ant-grey-500 hover:text-ant-blue-500">
              服务协议
            </span>
          </Link>
        </div>
      </div>
    </Footer>
  );
};

export default LayoutFooter;
