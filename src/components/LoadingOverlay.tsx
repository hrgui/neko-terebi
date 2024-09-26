import Loading from "./Loading";

const LoadingOverlay = () => {
  return (
    <div className="w-full h-full absolute flex items-center justify-center bg-black/30 z-10">
      <Loading />
    </div>
  );
};

export default LoadingOverlay;
