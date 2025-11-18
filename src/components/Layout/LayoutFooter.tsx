import { Layout } from "antd";

const { Footer } = Layout;
const LayoutFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Footer
      style={{ backgroundColor: "#ffffff" }}
      className="flex flex-col items-center justify-center h-16 mt-auto layout-footer gap-y-1"
    >
      <span className="text-xs text-gray-500">
        © {year} GKTeam. 保留所有权利
      </span>
    </Footer>
  );
};

export default LayoutFooter;
