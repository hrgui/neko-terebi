export const Loading = () => {
  return (
    <div role="status">
      <div className="@asvw:border-[12px] border-solid border-gray-700 @asvw:border-t-[12px] border-t-primary block rounded-[50%] @asvw:w-[88px] @asvw:h-[88px] animate-spin"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Loading;
