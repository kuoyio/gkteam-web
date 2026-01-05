import Link from "next/link";

const TermsAgreement = () => {
  return (
    <div className="text-center mb-6">
      <p className="text-[12px] text-ant-grey-400">
        注册或登录即代表您同意
        <Link
          href="/site/terms"
          target="_blank"
          className="text-ant-blue-500 hover:underline mx-1"
        >
          《服务协议》
        </Link>
        和
        <Link
          href="/site/privacy"
          target="_blank"
          className="text-ant-blue-500 hover:underline mx-1"
        >
          《隐私条款》
        </Link>
      </p>
    </div>
  );
};

export default TermsAgreement;

