export default function ImpressPanel() {
  return (
    <div>
      <div className={"mt-12 text-5xl flex flex-col gap-4"}>
        <div>만남에서</div>
        <div>시작되는</div>
        <div>최고의</div>
        <div className={"text-blue-600 mt-2 font-bold"}>대학 라이프</div>
      </div>

      <div
        className={
          "mt-12 text-xl font-semibold text-gray-800 border-t pt-10 border-gray-800"
        }
      >
        <div>AO의 소규모 커뮤니티가 곧 시작됩니다.</div>
        <div>늦기 전에 신청하세요!</div>
      </div>
    </div>
  );
}
