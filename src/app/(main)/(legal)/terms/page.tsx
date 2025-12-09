import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "服务协议 - 公考小分队",
  description:
    "公考小分队网站服务协议，说明用户在使用本网站时的权利义务和相关约定。",
};

const TermsPage = () => {
  const updatedAt = "2025年12月9日";

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4 text-ant-grey-800">服务协议</h1>
      <p className="text-sm text-ant-grey-500 mb-6">
        更新日期：{updatedAt}
      </p>

      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        欢迎您使用“公考小分队”（以下简称“本网站”或“我们”）提供的服务。本《服务协议》（以下简称“本协议”）是您与本网站之间就使用本网站及相关服务所订立的法律协议。
      </p>
      <p className="mb-6 text-ant-grey-700 leading-relaxed">
        在使用本网站及相关服务前，请您务必仔细阅读、充分理解并同意本协议的全部内容。一旦您访问、注册、登录或使用本网站的任何服务，即视为您已阅读并同意接受本协议的全部条款约束。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        一、账号注册与使用
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 您在注册并使用本网站服务时，应当具备完全民事行为能力。若您为未成年人，请在监护人监护、指导下使用本网站。
      </p>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        2. 在注册账号时，您应当按页面提示提供真实、准确、完整和最新的信息，并确保信息的持续有效性。如信息发生变更，请及时更新。
      </p>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        3. 您有责任妥善保管账号和登录凭证，不得以任何形式转让、出借、共享或售卖账号。如您发现账号存在异常使用或安全风险，应立即通知我们。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        4. 因您保管不善或自身原因导致账号、密码泄露或被他人使用，由此产生的全部责任和损失由您自行承担。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        二、服务内容与使用规范
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 本网站为用户提供公考训练营相关的在线服务，包括但不限于模拟题训练、错题记录、学习数据统计、学习资料展示等具体功能，具体以实际提供的服务为准。
      </p>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        2. 您在使用本网站服务过程中，应遵守国家法律法规、政策规定及本协议约定，不得利用本网站从事任何违法违规或侵害他人合法权益的行为，包括但不限于：
      </p>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>发布、传播或存储任何违法、暴力、淫秽、骚扰、诽谤、恐吓、虚假或其他不当内容；</li>
        <li>破坏或试图破坏网站与服务的正常运行，包括但不限于攻击服务器、恶意刷接口、注入恶意代码等；</li>
        <li>未经授权，访问、收集或使用其他用户的信息；</li>
        <li>对本网站的代码、数据或系统进行逆向工程、反编译、抓包分析或其他类似行为；</li>
        <li>利用本网站从事任何违反法律法规、监管规定或公序良俗的活动。</li>
      </ul>
      <p className="mt-4 mb-4 text-ant-grey-700 leading-relaxed">
        3. 如您违反上述约定，我们有权视情节严重程度，采取包括但不限于警告、限制功能、暂停或终止服务、注销账号、追究法律责任等措施，并有权配合有关部门提供必要信息。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        三、服务变更、中断与终止
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 鉴于互联网服务的特殊性，我们有可能因业务调整、服务升级、政策要求或其他原因，对服务内容进行变更、中断或终止。我们会在合理范围内提前通过网站公告或其他适当方式提示您。
      </p>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        2. 如因不可抗力（包括但不限于自然灾害、战争、罢工、政府行为、通信线路故障、黑客攻击、大规模病毒爆发等）或第三方原因导致服务中断或受影响，我们将在合理范围内协助处理，但在法律允许的范围内，对由此给您造成的损失不承担责任。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        3. 如您长期不登录或不使用本网站服务，或存在严重违反本协议、影响其他用户或平台安全的行为，我们有权在提前通知或事后通知的情况下，限制、冻结或注销您的账号。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        四、用户内容与知识产权
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 您在本网站上产生的练习记录、学习数据、反馈内容等，由您依法享有合法权益。本网站在符合法律法规的前提下，有权在为您提供服务、改进产品、统计分析等合理目的范围内进行使用和处理。
      </p>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        2. 除法律另有规定或双方另有约定外，本网站提供的全部内容（包括但不限于页面设计、文字、图形、图标、界面、程序代码、数据等）的知识产权均归本网站或相关权利人所有。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        3. 未经本网站事先书面许可，您不得以任何方式擅自使用、复制、修改、传播、出租、出售、发表或以其他方式利用本网站的任何内容和资料。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        五、免责声明
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 本网站提供的练习题目、资料内容及相关数据，仅供学习与参考之用，我们会尽力保障内容的准确性与时效性，但不对其绝对准确性、完整性或适用性作出保证。
      </p>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        2. 因于您自身原因（包括但不限于网络状况、设备故障、操作不当、账号泄露等）导致的任何损失，由您自行承担。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        3. 在法律允许的范围内，本网站不对因使用或无法使用本网站服务而造成的间接损失、预期收益损失等承担责任。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        六、隐私保护
      </h2>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        我们非常重视对您的个人信息和隐私的保护。有关我们如何收集、使用、存储和保护您的个人信息的详细规则，请参见本网站单独公示的《隐私政策》。本协议中关于个人信息和隐私保护的约定，如与《隐私政策》不一致，以《隐私政策》的约定为准。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        七、协议的修改与生效
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 我们有权根据业务发展需要、法律法规或政策变化等，适时对本协议进行修改。修改后的协议将通过本页面或其他适当方式进行公布。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        2. 如您在本协议修改后继续使用本网站及相关服务，即视为您已阅读、理解并同意受修改后的协议内容约束。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        八、适用法律与争议解决
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        1. 本协议的订立、生效、履行、解释及争议解决，适用中华人民共和国法律（不包括冲突规范）。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        2. 因本协议或使用本网站服务所产生的任何争议，双方应首先友好协商解决；协商不成的，任何一方均可向本网站运营者所在地有管辖权的人民法院提起诉讼。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        九、联系我们
      </h2>
      <p className="mb-2 text-ant-grey-700 leading-relaxed">
        如您对本协议内容或本网站服务有任何疑问、意见或建议，欢迎通过以下方式与我们联系：
      </p>
      <ul className="list-disc list-inside space-y-1 text-ant-grey-700 leading-relaxed">
        <li>微信号：monster12345_mm</li>
      </ul>
      <p className="mt-4 text-ant-grey-700 leading-relaxed">
        我们将尽快为您提供反馈和支持。
      </p>
    </div>
  );
};

export default TermsPage;


