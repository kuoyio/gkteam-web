import Link from "next/link";
import { Button, Result } from "antd";

export default function NoteNotFound() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Result
        status="404"
        title="笔记不存在"
        subTitle="您访问的笔记不存在，请检查URL是否正确"
        extra={
          <Link href="/">
            <Button type="primary">返回首页</Button>
          </Link>
        }
      />
    </div>
  );
}

