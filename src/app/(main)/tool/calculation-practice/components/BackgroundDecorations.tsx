export default function BackgroundDecorations() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-ant-blue-50/50 blur-[120px]" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-ant-purple-50/50 blur-[120px]" />
    </div>
  );
}
