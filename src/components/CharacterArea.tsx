import Image from 'next/image';

const CharacterArea = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-8">
      <div className="relative w-1/3">
        {/* publicフォルダに置いた画像を指定 */}
        <Image src="/character.png" alt="Character" width={400} height={600} />
      </div>
      <div className="relative w-2/3 ml-8">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <p className="text-gray-800 text-lg">
            こんにちは！今日は何をしますか？ToDoリストに入力してくださいね。
          </p>
        </div>
      </div>
    </div>
  );
};

export default CharacterArea;