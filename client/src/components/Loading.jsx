import { InfinitySpin } from 'react-loader-spinner';

const Loading = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col items-center justify-center">
        <InfinitySpin color="#000" />
        <div className="-mt-3 text-lg">loading...</div>
      </div>
    </div>
  );
};

export default Loading;
