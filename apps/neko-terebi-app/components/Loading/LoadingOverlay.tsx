import Loading from "./Loading";

export const LoadingOverlay = () => {
  return (
    <div className="w-full h-full absolute flex items-center justify-center bg-black/70 z-10">
      <Loading />
    </div>
  );
};

export default LoadingOverlay;
