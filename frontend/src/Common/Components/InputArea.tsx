import React from 'react';
import { Input } from './Input';
import  Button  from './Button';

interface InputAreaProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  showReferences: boolean;
  onShowReferences: () => void;
  className?: string;
}

const InputArea: React.FC<InputAreaProps> = ({
  inputValue,
  onInputChange,
  onSendMessage,
  showReferences,
  onShowReferences,
  className
}) => {
  return (
    <div className={`flex items-center p-4 bg-white shadow-md ${className}`}>
      {showReferences && (
        <Button
          size="small"
          variant="outline"
          onClick={onShowReferences}
          className="bg-white mr-2"
        >
          Show Resources
        </Button>
      )}
      <Input
        value={inputValue}
        onChange={onInputChange}
        placeholder="Ask FlyRight AI a question..."
        className="flex-grow"
        onKeyPress={(e) => e.key === 'Enter' && onSendMessage()}
      />
      <Button onClick={onSendMessage} className="bg-sky-600 hover:bg-sky-700 text-white">Send</Button>
    </div>
  );
};

export default InputArea;
