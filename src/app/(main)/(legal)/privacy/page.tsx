import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "隐私政策 - 公考小分队",
  description:
    "公考小分队网站隐私政策，说明我们如何收集、使用和保护您的个人信息。",
};

const PrivacyPage = () => {
  const updatedAt = "2025年12月9日";

  return (
    <div className="py-8">
      <h1 className="text-3xl font-bold mb-4 text-ant-grey-800">隐私政策</h1>
      <p className="text-sm text-ant-grey-500 mb-6">更新日期：{updatedAt}</p>

      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        欢迎使用“公考小分队”（以下简称“本网站”或“我们”）。我们非常重视您的个人信息和隐私保护。本隐私政策旨在向您说明我们在您使用本网站及相关服务时如何收集、使用、存储、共享和保护您的个人信息，以及您所享有的权利。
      </p>
      <p className="mb-6 text-ant-grey-700 leading-relaxed">
        请在使用本网站及相关服务前，仔细阅读并充分理解本隐私政策的全部内容。一旦您开始使用或继续使用本网站，即视为您已阅读、理解并同意本隐私政策的全部内容。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        一、我们收集的信息
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        在您使用本网站及相关服务的过程中，我们可能会根据合法、正当、必要的原则收集以下几类信息：
      </p>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>
          <span className="font-semibold">1. 账号注册及登录信息</span>
          ：当您注册或登录账号时，您可能需要提供手机号码、电子邮箱、昵称、头像等信息；我们还可能记录您的账号
          ID、注册时间、最近登录时间等。
        </li>
        <li>
          <span className="font-semibold">2. 使用服务过程中的信息</span>
          ：包括您在本网站内的操作记录（如登录时间、功能使用记录、练习记录、错题记录等）、点击行为、页面停留时长、学习进度等，用于为您提供个性化服务和数据统计。
        </li>
        <li>
          <span className="font-semibold">3. 设备及日志信息</span>
          ：包括设备型号、操作系统版本、浏览器类型、IP
          地址、网络类型、访问日期和时间、页面来源等日志信息，用于保障系统安全、排查故障和优化产品体验。
        </li>
        <li>
          <span className="font-semibold">4. 客服与反馈信息</span>
          ：当您通过客服渠道或反馈渠道与我们联系时，我们可能会收集您提供的联系方式、问题描述、相关截图等信息，用于与您沟通和问题处理。
        </li>
      </ul>

      <p className="mt-4 mb-4 text-ant-grey-700 leading-relaxed">
        我们不会收集与本服务无关的信息，也不会以欺骗、误导等方式强迫您提供个人信息。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        二、我们如何使用您的信息
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        我们可能会将收集到的信息用于以下用途：
      </p>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>为您提供账号注册、身份验证、登录等基础功能；</li>
        <li>为您提供公考训练营相关功能和服务，包括练习、记录和数据统计等；</li>
        <li>
          保障产品与服务的安全稳定运行，包括防止安全攻击、检测错误及排查故障；
        </li>
        <li>
          根据您的使用习惯和偏好，为您提供个性化的内容推荐或功能优化建议；
        </li>
        <li>用于数据分析和研究，以改善本网站的功能、体验和服务质量；</li>
        <li>
          在取得您授权或符合法律法规规定的情况下，用于向您发送与服务相关的通知或必要提醒；
        </li>
        <li>符合法律法规或监管要求的其他用途。</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        三、Cookie 与同类技术
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        为了保障本网站的正常运行、提升您的访问体验，我们可能会在您的设备上存储名为
        Cookie
        的小数据文件，或使用本地存储等同类技术。我们主要使用这些技术用于：
      </p>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>记住您的登录状态和部分偏好设置，避免频繁重复输入；</li>
        <li>统计访问量和使用情况，分析和优化网站性能与功能；</li>
        <li>保障服务安全，防止恶意访问和身份冒用。</li>
      </ul>
      <p className="mt-4 mb-4 text-ant-grey-700 leading-relaxed">
        您可以通过浏览器或设备设置管理或删除
        Cookie，但可能会影响部分功能的正常使用或体验效果。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        四、我们如何共享、转让和公开披露信息
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        我们非常重视对您个人信息的保护，原则上不会向第三方共享、转让或公开披露您的个人信息。但在以下情形中，可能会进行必要的共享或披露：
      </p>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>
          <span className="font-semibold">1. 事先取得您的明确同意或授权</span>；
        </li>
        <li>
          <span className="font-semibold">
            2. 为实现特定功能或提供服务所必需
          </span>
          ：例如使用云服务、短信服务或邮件服务提供商，仅在必要范围内共享相关信息，并要求合作方严格履行保密与安全义务；
        </li>
        <li>
          <span className="font-semibold">
            3. 基于法律法规或行政、司法机关的要求
          </span>
          ；
        </li>
        <li>
          <span className="font-semibold">
            4. 在涉及合并、收购、资产转让等重大变更时
          </span>
          ，如涉及到个人信息转让，我们会要求新的持有方继续受本隐私政策约束，否则我们将要求其重新征得您的授权同意；
        </li>
        <li>
          <span className="font-semibold">
            5. 为维护您、我们或其他用户的合法权益
          </span>
          ，在符合法律法规规定的前提下可能进行必要的信息披露。
        </li>
      </ul>

      <p className="mt-4 mb-4 text-ant-grey-700 leading-relaxed">
        在对外提供信息前，我们会对信息进行去标识化、匿名化处理（在可行的情况下），以尽量降低对您隐私的影响。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        五、信息的存储与安全
      </h2>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>
          <span className="font-semibold">1. 存储地点</span>
          ：我们会按照法律法规的要求，将收集到的您的个人信息存储在法律允许的服务器位置。
        </li>
        <li>
          <span className="font-semibold">2. 存储期限</span>
          ：我们会在实现本政策所述目的或法律法规要求的最短期限内保存您的个人信息。当超出保存期限或您主动注销账号、删除相关信息时，我们将根据适用法律法规的要求删除或匿名化处理您的个人信息。
        </li>
        <li>
          <span className="font-semibold">3. 安全措施</span>
          ：我们采用合理可行的安全防护措施来保护您的个人信息，包括但不限于访问控制、权限管理、加密存储、日志审计等，以防止信息遭到未经授权的访问、使用、披露、篡改或毁损。
        </li>
      </ul>
      <p className="mt-4 mb-4 text-ant-grey-700 leading-relaxed">
        尽管我们已经采取了合理有效的措施，并尽力避免个人信息泄露、损毁或丢失，但鉴于技术限制及可能存在的各种恶意手段，我们仍无法完全保证信息的绝对安全。如发生安全事件，我们会按照法律法规要求，及时向您告知并采取合理补救措施。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        六、未成年人保护
      </h2>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        本网站主要面向具有完全民事行为能力的成年人用户。如您为未成年人，请在监护人监护、指导下使用本网站及相关服务，并请监护人关注未成年人的上网行为。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        如我们发现未经过可验证的监护人同意而收集了未成年人的个人信息，我们会尽快采取措施删除相关信息。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        七、您的权利
      </h2>
      <p className="mb-3 text-ant-grey-700 leading-relaxed">
        在符合法律法规规定的范围内，您对自己的个人信息享有以下权利：
      </p>
      <ul className="list-disc list-inside space-y-2 text-ant-grey-700 leading-relaxed">
        <li>访问、更正或更新您的账号信息和个人资料；</li>
        <li>删除部分信息，或在符合条件时要求我们删除您的相关个人信息；</li>
        <li>
          撤回部分授权（例如营销通知等），但不影响撤回前基于您的授权已开展的处理活动；
        </li>
        <li>
          注销账号：您可以通过联系我们等方式申请注销账号。一旦账号注销，将无法恢复，请谨慎操作。
        </li>
      </ul>
      <p className="mt-4 mb-4 text-ant-grey-700 leading-relaxed">
        出于安全性考虑，我们可能需要对您的身份进行核验后，再处理您的请求。在不违反法律法规的前提下，我们会尽快作出答复。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        八、第三方服务
      </h2>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        本网站可能会包含指向第三方网站或服务的链接，或接入第三方提供的服务（例如登录、统计分析、云存储等）。请您知悉，这些第三方服务由相应第三方独立提供和运营，其适用的隐私政策由该第三方另行规定。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        在使用第三方服务前，请您仔细阅读并遵守相关第三方的服务条款及隐私政策。对于第三方根据其条款独立收集和处理的信息，我们不承担相应责任，但会在合理范围内督促其合法合规处理您的信息。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        九、本隐私政策的更新
      </h2>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        为了给您提供更好的服务或因法律法规、监管政策变化，我们可能会适时对本隐私政策进行修订。更新后的隐私政策将通过本页面进行发布，并标注最新的更新日期。
      </p>
      <p className="mb-4 text-ant-grey-700 leading-relaxed">
        如变更会导致您权利的实质性减损，我们会在合理范围内通过网站公告或其他适当方式向您提示。若您在本隐私政策变更后继续使用本网站，即视为您已阅读、理解并同意受更新后的隐私政策约束。
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-3 text-ant-grey-800">
        十、联系我们
      </h2>
      <p className="mb-2 text-ant-grey-700 leading-relaxed">
        如您对本隐私政策或您的个人信息保护事宜有任何疑问、意见或建议，欢迎通过以下方式与我们联系：
      </p>
      <ul className="list-disc list-inside space-y-1 text-ant-grey-700 leading-relaxed">
        <li>微信号：monster12345_mm</li>
      </ul>
      <p className="mt-4 text-ant-grey-700 leading-relaxed">
        我们将在核实您身份后，尽快处理您的问题和诉求。
      </p>
    </div>
  );
};

export default PrivacyPage;
