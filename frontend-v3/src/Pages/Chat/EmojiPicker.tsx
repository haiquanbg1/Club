import React from 'react';

// emoji_list của bạn
const emoji_list = [
  '👍',
  '❤️',
  '😂',
  '😢',
  '😡',
];

type EmojiPickerProps = {
  onSelectEmoji: (emoji: string) => void; // Hàm callback khi chọn emoji
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelectEmoji }) => {
  return (
    <div className="bg-slate-500 border rounded-2xl p-1">
      <div className="flex gap-2">
        {emoji_list.map((emoji, index) => (
          <button
            key={index}
            className="emoji-item text-xl hover:bg-slate-300 border rounded-lg focus:bg-blue-700"
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiPicker;
